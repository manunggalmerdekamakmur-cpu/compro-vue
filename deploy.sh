#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Configuration
VPS_USER="manunggal"
VPS_IP="103.103.23.24"
VPS_PATH="~/compro-vue"
PROJECT_NAME="manunggal-app"
LOCAL_BUILD_DIR="dist"
ARCHIVE_NAME="dist.tar.gz"

# Function to print colored messages
print_step() {
    echo -e "\n${CYAN}════════════════════════════════════════${NC}"
    echo -e "${YELLOW}🚀 $1${NC}"
    echo -e "${CYAN}════════════════════════════════════════${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Function to check command success
check_success() {
    if [ $? -eq 0 ]; then
        print_success "$1"
    else
        print_error "$1 failed!"
        exit 1
    fi
}

echo -e "${PURPLE}========================================${NC}"
echo -e "${YELLOW}🚀 MANUNGGAL - FULL DEPLOYMENT SCRIPT${NC}"
echo -e "${PURPLE}========================================${NC}\n"

# Step 1: Check if we're in the right directory
print_step "Checking project directory"
if [ ! -f "package.json" ] || [ ! -f "vite.config.js" ]; then
    print_error "Not in project root directory!"
    echo "Please run this script from the project root directory."
    exit 1
fi
check_success "Directory check passed"

# Step 2: Check git status and confirm
print_step "Checking git status"
git status --short
echo ""
read -p "$(echo -e ${YELLOW}"Do you want to continue with full deployment? (y/N): "${NC})" -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    print_info "Deployment cancelled"
    exit 0
fi

# Step 3: Pull latest changes
print_step "Pulling latest changes from GitHub"
git pull origin main
check_success "Git pull completed"

# Step 4: Run Prettier to format code
print_step "Formatting code with Prettier"
if command -v npx &> /dev/null; then
    npx prettier --write .
    check_success "Code formatted with Prettier"
else
    print_info "npx not found, skipping Prettier"
fi

# Step 5: Clean project (if clean script exists)
print_step "Cleaning project"
if [ -f "package.json" ]; then
    if [ -f "bun.lockb" ] || [ -f "bun.lock" ]; then
        # Check if clean script exists in package.json for bun
        if bun run --silent --list | grep -q "clean"; then
            bun run clean
            check_success "Project cleaned with bun"
        else
            print_info "No clean script found for bun, skipping"
        fi
    else
        # Check if clean script exists in package.json for npm
        if npm run --silent 2>/dev/null | grep -q "clean"; then
            npm run clean
            check_success "Project cleaned with npm"
        else
            print_info "No clean script found for npm, skipping"
        fi
    fi
fi

# Step 6: Install/update dependencies
print_step "Installing/updating dependencies"
if [ -f "bun.lockb" ] || [ -f "bun.lock" ]; then
    bun install
    check_success "Dependencies installed/updated with bun"
else
    npm install
    check_success "Dependencies installed/updated with npm"
fi

# Step 7: Build the project
print_step "Building project"
if [ -f "bun.lockb" ] || [ -f "bun.lock" ]; then
    bun run build
    check_success "Build completed with bun"
else
    npm run build
    check_success "Build completed with npm"
fi

# Step 8: Verify build output
print_step "Verifying build output"
if [ ! -d "$LOCAL_BUILD_DIR" ]; then
    print_error "Build directory '$LOCAL_BUILD_DIR' not found!"
    exit 1
fi

echo "Build output structure:"
ls -la "$LOCAL_BUILD_DIR/"
echo -e "\nBuild size: $(du -sh "$LOCAL_BUILD_DIR" | cut -f1)"
check_success "Build verified"

# Step 8.5: Generate and include SEO files
print_step "Generating SEO files (sitemap.xml, robots.txt)"
if [ -f "generate-sitemap.js" ]; then
    node generate-sitemap.js
    check_success "SEO files generated"
else
    print_info "generate-sitemap.js not found, skipping"
fi

# Step 9: Git commit and push
print_step "Committing and pushing to GitHub"

# Get git status
CHANGES=$(git status --porcelain)
if [ -z "$CHANGES" ]; then
    print_info "No changes to commit"
else
    echo "Changes to be committed:"
    git status --short
    
    # Add all changes
    git add -A
    check_success "Files added to git"
    
    # Create commit message
    COMMIT_TIME=$(date '+%Y-%m-%d %H:%M:%S')
    COMMIT_MESSAGE="Deploy: $COMMIT_TIME - Auto deployment"
    
    git commit -m "$COMMIT_MESSAGE"
    check_success "Changes committed"
    
    # Push to GitHub
    git push origin main
    check_success "Pushed to GitHub"
fi

# Step 10: Create archive for VPS
print_step "Creating archive for VPS"
tar -czf "$ARCHIVE_NAME" "$LOCAL_BUILD_DIR/"
check_success "Archive created: $ARCHIVE_NAME"
echo "Archive size: $(du -h "$ARCHIVE_NAME" | cut -f1)"

# Step 11: Copy to VPS
print_step "Copying to VPS"
echo "Copying $ARCHIVE_NAME to $VPS_USER@$VPS_IP:$VPS_PATH/"
scp "$ARCHIVE_NAME" "$VPS_USER@$VPS_IP:$VPS_PATH/"
check_success "File copied to VPS"

# Step 12: Deploy on VPS
print_step "Deploying on VPS"
ssh "$VPS_USER@$VPS_IP" "
    echo '📁 Switching to project directory...'
    cd $VPS_PATH || { echo '❌ Failed to change directory'; exit 1; }
    
    echo '💾 Creating backup of current build...'
    if [ -d \"dist\" ]; then
        BACKUP_NAME=\"dist-backup-\$(date +%Y%m%d-%H%M%S).tar.gz\"
        tar -czf \"\$BACKUP_NAME\" dist/
        echo \"Backup created: \$BACKUP_NAME\"
    fi
    
    echo '📦 Extracting new build...'
    tar -xzf $ARCHIVE_NAME
    
    echo '🐳 Rebuilding Docker container...'
    docker-compose down
    docker-compose up --build -d
    
    echo '🔍 Checking container status...'
    docker-compose ps
    
    echo '📊 Checking container logs (last 10 lines)...'
    docker-compose logs --tail=10
    
    echo '🧹 Cleaning up...'
    rm -f $ARCHIVE_NAME
    echo '✅ Deployment on VPS completed!'
"
check_success "VPS deployment completed"

# Step 13: Clean up local
print_step "Cleaning up local files"
rm -f "$ARCHIVE_NAME"
check_success "Local cleanup completed"

# Step 14: Test deployment
print_step "Testing deployment"
echo "Testing website accessibility..."
sleep 15 # Wait for container to fully start

# Test with multiple attempts
MAX_ATTEMPTS=5
ATTEMPT=1
while [ $ATTEMPT -le $MAX_ATTEMPTS ]; do
    echo "Attempt $ATTEMPT/$MAX_ATTEMPTS..."
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://manunggalmerdekamakmur.com --max-time 10)
    
    if [ "$HTTP_CODE" = "200" ]; then
        print_success "Website is accessible! (HTTP $HTTP_CODE)"
        break
    elif [ "$HTTP_CODE" = "000" ]; then
        echo "Connection failed, retrying in 5 seconds..."
        sleep 5
    else
        echo "Received HTTP $HTTP_CODE, retrying in 5 seconds..."
        sleep 5
    fi
    
    ATTEMPT=$((ATTEMPT + 1))
done

if [ $ATTEMPT -gt $MAX_ATTEMPTS ]; then
    print_info "Website might still be starting up..."
    echo "Please check manually: http://manunggalmerdekamakmur.com"
fi

# Step 15: Show deployment summary
print_step "Deployment Summary"
echo -e "${GREEN}========================================${NC}"
echo -e "${YELLOW}🎉 FULL DEPLOYMENT COMPLETED!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${CYAN}📊 Deployment Timeline:${NC}"
echo "  • Code formatting: ✓"
echo "  • Project cleaning: ✓"
echo "  • Dependencies: ✓"
echo "  • Build: ✓"
echo "  • Git commit & push: ✓"
echo "  • VPS deployment: ✓"
echo "  • Backup created: ✓"
echo "  • Container restarted: ✓"
echo ""
echo -e "${CYAN}🌐 Website URLs:${NC}"
echo "  HTTP:  http://manunggalmerdekamakmur.com"
echo "  HTTPS: https://manunggalmerdekamakmur.com (via Cloudflare)"
echo ""
echo -e "${CYAN}🔧 VPS Management Commands:${NC}"
echo "  Check logs:   ssh $VPS_USER@$VPS_IP 'cd $VPS_PATH && docker-compose logs -f'"
echo "  Check status: ssh $VPS_USER@$VPS_IP 'cd $VPS_PATH && docker-compose ps'"
echo "  Restart app:  ssh $VPS_USER@$VPS_IP 'cd $VPS_PATH && docker-compose restart'"
echo "  View backups: ssh $VPS_USER@$VPS_IP 'cd $VPS_PATH && ls -la *.tar.gz'"
echo ""
echo -e "${CYAN}📈 Post-Deployment Checks:${NC}"
echo "  1. Open browser and test website"
echo "  2. Check all pages are loading correctly"
echo "  3. Verify mobile responsiveness"
echo "  4. Test any forms or interactive elements"
echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${YELLOW}⏰ Deployment completed at: $(date)${NC}"
echo -e "${GREEN}========================================${NC}"