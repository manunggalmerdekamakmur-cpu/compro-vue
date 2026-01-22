<template>
  <section id="media" class="section-bg">
    <div class="section-bg-inner">
      <div class="container">
        <h2 class="section-title">Launching Triobionik</h2>

        <div class="video-grid">
          <article
            v-for="video in videos"
            :key="video.id"
            class="video-card"
          >
            <button
              class="thumb-btn"
              @click="openPlayer(video)"
              :aria-label="`Putar video: ${video.title}`"
            >
              <img
                :src="video.thumbnail"
                :alt="video.title"
                loading="lazy"
              />
              <span class="play-overlay">▶</span>
            </button>

            <h3 class="video-title">{{ video.title }}</h3>
          </article>
        </div>
      </div>
    </div>

    <div v-if="activeVideo" class="modal-overlay" @click.self="closePlayer">
      <div class="modal-content">
        <button class="modal-close" @click="closePlayer">✕</button>

        <div class="iframe-wrapper">
          <iframe
            :src="youtubeEmbedUrl(activeVideo.id)"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>

        <p class="modal-title">{{ activeVideo.title }}</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'VideoSection',
  data() {
    return {
      videos: [
        {
          id: 'bcWJ0Z-dFXI',
          title: 'Video Kegiatan Perusahaan',
          thumbnail: 'https://img.youtube.com/vi/bcWJ0Z-dFXI/hqdefault.jpg'
        }
      ],
      activeVideo: null
    }
  },
  methods: {
    openPlayer(video) {
      this.activeVideo = video
      document.body.style.overflow = 'hidden'
    },
    closePlayer() {
      this.activeVideo = null
      document.body.style.overflow = ''
    },
    youtubeEmbedUrl(id) {
      return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`
    }
  },
  beforeUnmount() {
    document.body.style.overflow = ''
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
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
}

.video-card {
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0,0,0,.08);
  background: rgba(255, 255, 255, 0.95);
}

.thumb-btn {
  position: relative;
  border: none;
  background: none;
  padding: 0;
  width: 100%;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.thumb-btn:hover {
  transform: scale(1.02);
}

.thumb-btn img {
  width: 100%;
  display: block;
  height: 180px;
  object-fit: cover;
}

.play-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  color: #fff;
  background: rgba(0, 0, 0, 0.3);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.thumb-btn:hover .play-overlay {
  opacity: 1;
}

.video-title {
  padding: 1rem;
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
  margin: 0;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-content {
  width: 90%;
  max-width: 900px;
  border-radius: 14px;
  padding: 1rem;
  background: white;
  position: relative;
}

.modal-close {
  position: absolute;
  top: 10px;
  right: 14px;
  font-size: 1.3rem;
  border: none;
  background: none;
  cursor: pointer;
  z-index: 10;
  color: #333;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-close:hover {
  background: rgba(0,0,0,0.1);
}

.iframe-wrapper {
  position: relative;
  padding-top: 56.25%;
}

.iframe-wrapper iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border-radius: 8px;
}

.modal-title {
  text-align: center;
  margin-top: .75rem;
  font-weight: 600;
  padding: 0 1rem;
}

@media (max-width: 768px) {
  .container {
    padding: 2rem 15px;
  }

  .section-title {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .video-grid {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }

  .thumb-btn img {
    height: 150px;
  }

  .video-title {
    font-size: .95rem;
    padding: .75rem;
  }

  .play-overlay {
    font-size: 2.5rem;
  }

  .modal-content {
    width: 95%;
    padding: .75rem;
  }

  .modal-title {
    font-size: .95rem;
  }
}
</style>