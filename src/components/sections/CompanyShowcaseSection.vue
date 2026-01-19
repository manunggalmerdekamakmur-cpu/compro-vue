<template>
  <section class="company-showcase section-bg" id="why-us">
    <div class="container full-width why-choose">
      <div class="section-head">
        <h2>Mengapa Memilih Kami?</h2>
        <p class="lead">
          Sebagai pelopor inovasi agrobisnis, kami menghadirkan solusi pertanian berkelanjutan yang mengutamakan kualitas, keandalan, dan dampak positif bagi ekosistem.
        </p>
      </div>

      <div class="features-grid">
        <div v-for="(feature, index) in features" :key="index" class="feature-card">
          <div class="icon-wrap" v-html="feature.icon"></div>
          <h5 class="feature-title">{{ feature.title }}</h5>
          <p class="feature-desc">{{ feature.desc }}</p>
        </div>
      </div>
    </div>

    <div class="container full-width achievements">
      <div class="section-title">
        <h2>Pencapaian Kami di Tahun 2025</h2>
      </div>

      <div class="counters-grid">
        <div v-for="(counter, index) in counters" :key="index" class="counter-card">
          <p class="counter-label"><strong>{{ counter.key }}</strong></p>
          <div class="counter-number">
            <span :class="{ 'coming-soon': displayedCounts[index] === 'Coming Soon' }">
              {{ formatNumber(displayedCounts[index]) }}
            </span>
          </div>
          <div class="counter-unit">{{ counter.unit }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { getApprovedProducts, getTriobionikVariants } from '@/data/product.js'

export default {
  name: "CompanyShowcaseSection",
  data() {
    return {
      features: [
        {
          title: "Inovasi Berkelanjutan",
          desc: "Mengembangkan teknologi hayati terkini dengan mikroorganisme unggulan untuk produktivitas maksimal dan keberlanjutan ekosistem pertanian Indonesia.",
          icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M128 447.1V223.1c0-17.67-14.33-31.1-32-31.1H32c-17.67 0-32 14.33-32 31.1v223.1c0 17.67 14.33 31.1 32 31.1h64C113.7 479.1 128 465.6 128 447.1zM512 224.1c0-26.5-21.48-47.98-48-47.98h-146.5c22.77-37.91 34.52-80.88 34.52-96.02C352 56.52 333.5 32 302.5 32c-63.13 0-26.36 76.15-108.2 141.6L178 186.6C166.2 196.1 160.2 210 160.1 224c-.0234 .0234 0 0 0 0L160 384c0 15.1 7.113 29.33 19.2 38.39l34.14 25.59C241 468.8 274.7 480 309.3 480H368c26.52 0 48-21.47 48-47.98c0-3.635-.4805-7.143-1.246-10.55C434 415.2 448 397.4 448 376c0-9.148-2.697-17.61-7.139-24.88C463.1 347 480 327.5 480 304.1c0-12.5-4.893-23.78-12.72-32.32C492.2 270.1 512 249.5 512 224.1z"/></svg>`
        },
        {
          title: "Komitmen Mutu Prima",
          desc: "Setiap produk menjalani proses kontrol kualitas ketat dengan sertifikasi SNI dan standar organik internasional untuk hasil pertanian terbaik.",
          icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M272 0C289.7 0 304 14.33 304 32C304 49.67 289.7 64 272 64H256V98.45C293.5 104.2 327.7 120 355.7 143L377.4 121.4C389.9 108.9 410.1 108.9 422.6 121.4C435.1 133.9 435.1 154.1 422.6 166.6L398.5 190.8C419.7 223.3 432 262.2 432 304C432 418.9 338.9 512 224 512C109.1 512 16 418.9 16 304C16 200 92.32 113.8 192 98.45V64H176C158.3 64 144 49.67 144 32C144 14.33 158.3 0 176 0L272 0zM248 192C248 178.7 237.3 168 224 168C210.7 168 200 178.7 200 192V320C200 333.3 210.7 344 224 344C237.3 344 248 333.3 248 320V192z"/></svg>`
        },
        {
          title: "Solusi Lengkap Agrobisnis",
          desc: "Portofolio produk lengkap dari pupuk hayati hingga dekomposer, mendukung seluruh rantai pertanian modern dengan teknologi ramah lingkungan.",
          icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M568.2 336.3c-13.12-17.81-38.14-21.66-55.93-8.469l-119.7 88.17h-120.6c-8.748 0-15.1-7.25-15.1-15.99c0-8.75 7.25-16 15.1-16h78.25c15.1 0 30.75-10.88 33.37-26.62c3.25-20-12.12-37.38-31.62-37.38H191.1c-26.1 0-53.12 9.25-74.12 26.25l-46.5 37.74L15.1 383.1C7.251 383.1 0 391.3 0 400v95.98C0 504.8 7.251 512 15.1 512h346.1c22.03 0 43.92-7.188 61.7-20.27l135.1-99.52C577.5 379.1 581.3 354.1 568.2 336.3zM160 176h64v64C224 248.8 231.2 256 240 256h64C312.8 256 320 248.8 320 240v-64h64c8.836 0 16-7.164 16-16V96c0-8.838-7.164-16-16-16h-64v-64C320 7.162 312.8 0 304 0h-64C231.2 0 224 7.162 224 16v64H160C151.2 80 144 87.16 144 96v64C144 168.8 151.2 176 160 176z"/></svg>`
        },
        {
          title: "Layanan Profesional",
          desc: "Didukung tim ahli yang responsif dan solutif, siap memberikan pendampingan teknis untuk kesuksesan agrobisnis Anda.",
          icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M144 160c-44.2 0-80-35.8-80-80S99.8 0 144 0s80 35.8 80 80s-35.8 80-80 80zm368 0c-44.2 0-80-35.8-80-80s35.8-80 80-80s80 35.8 80 80s-35.8 80-80 80zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM416 224c0 53-43 96-96 96s-96-43-96-96s43-96 96-96s96 43 96 96zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z"/></svg>`
        }
      ],
      counters: [
        {
          key: "Pupuk Hayati Cair Manunggal Lestari",
          value: 125000,
          unit: "Liter"
        },
        {
          key: "Pupuk Hayati Cair Manunggal Lestari Dekomposer",
          value: 85000,
          unit: "Liter"
        },
        {
          key: "Pupuk Hayati Padat Triobionik",
          value: 2700,
          unit: "Kg"
        },
        {
          key: "Pupuk Organik Remah Manunggal Makmur",
          value: "Coming Soon",
          unit: ""
        },
        {
          key: "Pupuk Organik Cair PTORCA",
          value: "Coming Soon",
          unit: ""
        }
      ],
      displayedCounts: [0, 0, 0, 0, 0, 0],
      hasAnimated: false
    }
  },
  computed: {
    allProducts() {
      const mainProducts = getApprovedProducts()
      const variants = getTriobionikVariants()
      return [...mainProducts, ...variants]
    },
    displayedProducts() {
      return this.allProducts.slice(0, 6)
    }
  },
  mounted() {
    this.initCounterObserver()
  },
  methods: {
    initCounterObserver() {
      const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.hasAnimated) {
            this.hasAnimated = true
            this.startCountAnimation()
            observer.disconnect()
          }
        })
      }, observerOptions)

      const achievementsElement = document.querySelector('.achievements')
      if (achievementsElement) {
        observer.observe(achievementsElement)
      } else {
        this.startCountAnimation()
      }
    },
    startCountAnimation() {
      this.counters.forEach((counter, index) => {
        this.animateCounter(index, counter.value)
      })
    },
    animateCounter(index, targetValue) {
      if (typeof targetValue !== 'number') {
        this.displayedCounts.splice(index, 1, targetValue)
        return
      }

      const duration = 2000
      const startTime = Date.now()
      const startValue = 0

      const updateCounter = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)

        const currentValue = Math.floor(
          startValue + (targetValue - startValue) * easeOutQuart
        )

        this.displayedCounts.splice(index, 1, currentValue)

        if (progress < 1) {
          requestAnimationFrame(updateCounter)
        } else {
          this.displayedCounts.splice(index, 1, targetValue)
        }
      }

      requestAnimationFrame(updateCounter)
    },
    formatNumber(value) {
      if (typeof value !== 'number') return value
      return value.toLocaleString('id-ID')
    },
    truncateDescription(desc) {
      if (!desc) return ''
      return desc.length > 80 ? desc.substring(0, 80) + '...' : desc
    }
  }
}
</script>