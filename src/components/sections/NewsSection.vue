<template>
  <section id="news" class="section-bg">
    <div class="section-bg-inner">
      <div class="container">
        <h2 class="section-title">Berita Terbaru</h2>

        <div class="news-grid">
          <article
            v-for="article in articles"
            :key="article.id"
            class="news-card"
          >
            <div class="news-thumbnail">
              <img
                :src="article.thumbnail"
                :alt="article.title"
                loading="lazy"
              />
              <span class="news-category">{{ article.category }}</span>
            </div>

            <div class="news-content">
              <h3 class="news-title">{{ article.title }}</h3>
              
              <div class="news-meta">
                <span class="news-date">
                  <i class="far fa-calendar"></i> {{ article.date }}
                </span>
                <span class="news-source">
                  <i class="far fa-newspaper"></i> {{ article.source }}
                </span>
              </div>

              <p class="news-excerpt">{{ article.excerpt }}</p>

              <div class="news-highlights">
                <span 
                  v-for="highlight in article.highlights" 
                  :key="highlight"
                  class="highlight-tag"
                >
                  <i class="fas fa-check-circle"></i> {{ highlight }}
                </span>
              </div>

              <a 
                :href="article.url" 
                target="_blank" 
                rel="noopener noreferrer"
                class="news-link"
              >
                <i class="fas fa-external-link-alt"></i> Baca Selengkapnya
              </a>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'NewsSection',
  data() {
    return {
      articles: [
        {
          id: 1,
          title: 'PT Manunggal Merdeka Makmur Meluncurkan Produk Pupuk Terbaru',
          date: '17 Februari 2025',
          source: 'Harian Forum',
          category: 'Produk',
          thumbnail: 'https://res.cloudinary.com/dz1zcobkz/image/upload/v1768788752/Screenshot-2026-01-17-165137_jzl390.webp',
          excerpt: 'PT Manunggal Merdeka Makmur dengan bangga mengumumkan peluncuran produk pupuk terbaru yang inovatif. Acara peluncuran berlangsung meriah dengan dihadiri oleh berbagai stakeholder industri pertanian.',
          url: 'https://harianforum.com/pt-manunggal-merdeka-makmur-meluncurkan-produk-pupuk-terbaru-acara-berlangsung-meriah/',
          highlights: [
            'Produk ramah lingkungan',
            'Efektivitas terbukti',
            'Meningkatkan produktivitas 40%'
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>
.section-bg {
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
}

.section-bg-inner {
  width: 100%;
  position: relative;
  z-index: 2;
}

.container {
  padding: 3rem 15px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.section-title {
  text-align: center;
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: var(--primary, #2c5aa0);
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.news-card {
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0,0,0,.08);
  background: rgba(255, 255, 255, 0.95);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.news-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0,0,0,.12);
}

.news-thumbnail {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.news-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.news-card:hover .news-thumbnail img {
  transform: scale(1.05);
}

.news-category {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: var(--secondary, #28a745);
  color: white;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.news-content {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.news-title {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: var(--primary, #2c5aa0);
  line-height: 1.4;
}

.news-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.85rem;
  color: #666;
}

.news-meta i {
  margin-right: 0.3rem;
  color: var(--primary, #2c5aa0);
}

.news-excerpt {
  color: #555;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex: 1;
  font-size: 0.95rem;
}

.news-highlights {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.highlight-tag {
  background: rgba(40, 167, 69, 0.1);
  color: var(--secondary, #28a745);
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
}

.highlight-tag i {
  font-size: 0.7rem;
}

.news-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: var(--primary, #2c5aa0);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  width: 100%;
  text-align: center;
}

.news-link:hover {
  background: #1a4a8a;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(44, 90, 160, 0.2);
}

@media (max-width: 768px) {
  .container {
    padding: 2rem 15px;
  }

  .section-title {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .news-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .news-thumbnail {
    height: 180px;
  }

  .news-content {
    padding: 1.25rem;
  }

  .news-title {
    font-size: 1.1rem;
  }

  .news-meta {
    flex-direction: column;
    gap: 0.5rem;
  }

  .news-highlights {
    gap: 0.4rem;
  }

  .highlight-tag {
    font-size: 0.75rem;
    padding: 0.3rem 0.7rem;
  }

  .news-link {
    padding: 0.7rem 1.25rem;
    font-size: 0.85rem;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .news-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (prefers-color-scheme: dark) {
  .news-card {
    background: rgba(30, 30, 30, 0.95);
  }
  
  .news-title {
    color: var(--primary-light, #4a8fff);
  }
  
  .news-excerpt {
    color: #ccc;
  }
  
  .news-meta {
    color: #aaa;
  }
}
</style>