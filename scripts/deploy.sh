#./scripts/deploy.sh
#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🚀 Starting deployment process...${NC}\n"

# Step 1: Install dependencies (if needed)
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}📦 Installing dependencies...${NC}"
    npm install
fi

# Step 2: Build the project
echo -e "${YELLOW}🔨 Building project...${NC}"
npm run build

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Build failed!${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build successful!${NC}\n"

# Step 3: Show the changes
echo -e "${YELLOW}📋 Changes to be committed:${NC}"
git status --short

echo ""

# Step 4: Add changes to git
echo -e "${YELLOW}📝 Adding files to git...${NC}"
git add -A

# Step 5: Commit with timestamp
echo -e "${YELLOW}💾 Committing changes...${NC}"
COMMIT_MESSAGE="Deploy: $(date '+%Y-%m-%d %H:%M:%S') - Auto-deploy with cache busting"
git commit -m "$COMMIT_MESSAGE"

# Step 6: Push to GitHub
echo -e "${YELLOW}🚀 Pushing to GitHub...${NC}"
git push origin main

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Successfully pushed to GitHub!${NC}"
    echo -e "${GREEN}🌐 Vercel will automatically deploy the changes.${NC}"
    echo -e "${YELLOW}⏳ Please wait 1-2 minutes for Vercel to complete deployment.${NC}"
    echo -e "${YELLOW}🔗 Check: https://vercel.com/dashboard${NC}"
else
    echo -e "${RED}❌ Push failed!${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}🎉 Deployment process completed!${NC}"

