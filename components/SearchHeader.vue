<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import GlassSurface from './GlassSurface.vue'

const glitchContainer = ref<HTMLElement>()
const glitchText = ref<HTMLElement>()
const docsSpan = ref<HTMLElement>()
const irSpan = ref<HTMLElement>()

let glitchInterval: NodeJS.Timeout | null = null

// Glitch characters for random effect
const glitchChars = ['#', '@', '$', '%', '&', '*', '!', '?', '0', '1']

// Random delay between 2-4 seconds
const getRandomDelay = () => Math.random() * 2000 + 2000

// Random glitch duration between 0.5-1 second
const getGlitchDuration = () => Math.random() * 500 + 500

const applyGlitch = (element: HTMLElement, originalText: string, duration: number) => {
  const chars = originalText.split('')
  let glitchFrames = 0
  const maxFrames = Math.floor(duration / 50) // 50ms per frame

  element.classList.add('glitching')
  
  const glitchFrame = () => {
    if (glitchFrames >= maxFrames) {
      element.textContent = originalText
      element.classList.remove('glitching')
      return
    }

    // Randomly glitch some characters
    const glitchedText = chars.map(char => {
      return Math.random() < 0.3 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char
    }).join('')
    
    element.textContent = glitchedText
    glitchFrames++
    
    setTimeout(glitchFrame, 50)
  }
  
  glitchFrame()
}

const triggerRandomGlitch = () => {
  const targets = [
    { element: docsSpan.value, text: 'Docs' },
    { element: irSpan.value, text: 'IR' },
    { element: glitchText.value, text: 'DocsIR' }
  ].filter(target => target.element !== null && target.element !== undefined)
  
  if (targets.length > 0) {
    // Randomly select target
    const targetIndex = Math.floor(Math.random() * targets.length)
    const target = targets[targetIndex]
    
    if (target && target.element) {
      const duration = getGlitchDuration()
      applyGlitch(target.element, target.text, duration)
    }
  }
  
  // Schedule next glitch
  const nextDelay = getRandomDelay()
  glitchInterval = setTimeout(triggerRandomGlitch, nextDelay)
}

onMounted(() => {
  // Start glitch system after initial delay
  const initialDelay = getRandomDelay()
  glitchInterval = setTimeout(triggerRandomGlitch, initialDelay)
})

onUnmounted(() => {
  if (glitchInterval) {
    clearTimeout(glitchInterval)
  }
})
</script>

<template>
  <header class="text-center mb-12">
    <h1 class="retro-title mb-6 flex items-center justify-center">
      <div class="glass-icon-container">
        <ClientOnly>
          <GlassSurface 
            :width="100" 
            :height="100" 
            :border-radius="12"
            :opacity="0.15"
            :blur="8"
            :brightness="80"
            class-name="glass-document-icon"
          >
            <svg width="60" height="60" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="document-svg">
              <!-- Document background -->
              <rect x="4" y="2" width="13" height="18" rx="1" fill="#e0e0e0" opacity="0.9"/>
              <!-- Document lines -->
              <line x1="7" y1="6" x2="14" y2="6" stroke="#666666" stroke-width="0.8" opacity="0.8"/>
              <line x1="7" y1="8" x2="14" y2="8" stroke="#666666" stroke-width="0.8" opacity="0.8"/>
              <line x1="7" y1="10" x2="12" y2="10" stroke="#666666" stroke-width="0.8" opacity="0.8"/>
              <line x1="7" y1="12" x2="14" y2="12" stroke="#666666" stroke-width="0.8" opacity="0.8"/>
              <line x1="7" y1="14" x2="11" y2="14" stroke="#666666" stroke-width="0.8" opacity="0.8"/>
            </svg>
          </GlassSurface>
          <template #fallback>
            <div class="w-[100px] h-[100px] bg-white/20 rounded-xl border border-white/30 flex items-center justify-center">
              <svg width="60" height="60" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="document-svg">
                <!-- Document background -->
                <rect x="4" y="2" width="13" height="18" rx="1" fill="#e0e0e0" opacity="0.9"/>
                <!-- Document lines -->
                <line x1="7" y1="6" x2="14" y2="6" stroke="#666666" stroke-width="0.8" opacity="0.8"/>
                <line x1="7" y1="8" x2="14" y2="8" stroke="#666666" stroke-width="0.8" opacity="0.8"/>
                <line x1="7" y1="10" x2="12" y2="10" stroke="#666666" stroke-width="0.8" opacity="0.8"/>
                <line x1="7" y1="12" x2="14" y2="12" stroke="#666666" stroke-width="0.8" opacity="0.8"/>
                <line x1="7" y1="14" x2="11" y2="14" stroke="#666666" stroke-width="0.8" opacity="0.8"/>
              </svg>
            </div>
          </template>
        </ClientOnly>
      </div>
      <div class="crt-container" ref="glitchContainer">
        <span class="crt-text" ref="glitchText">
          <span ref="docsSpan">Docs</span><span ref="irSpan">IR</span>
        </span>
      </div>
    </h1>
    <p class="retro-subtitle text-lg sm:text-xl">
      [INITIALIZING INFORMATION RETRIEVAL SYSTEM<span class="loading-dots"><span class="dot1">.</span><span class="dot2">.</span><span class="dot3">.</span></span>]
    </p>
  </header>
</template>

<style scoped>
/* Pixelated Retro Title Styles */
.retro-title {
  font-family: 'Press Start 2P', monospace;
  font-size: clamp(2rem, 8vw, 4rem);
  letter-spacing: 0.2em;
  animation: fadeInScale 1.5s ease-out;
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
  transform-origin: center;
}

/* CRT Container */
.crt-container {
  position: relative;
  display: inline-block;
}

/* CRT scanlines effect - REMOVED */

/* Simple CRT Text - Only Character Glitch */
.crt-text {
  position: relative;
  color: #e0e0e0;
  font-family: 'Press Start 2P', monospace;
}

/* All visual glitch effects removed - only character glitch remains */

/* All CSS animations removed - only JavaScript character glitch remains */

/* Simple Scanlines Animation - REMOVED */

/* Icon Scanlines Animation - REMOVED */

@keyframes fadeInScale {
  0% {
    opacity: 0;
    transform: scale(0.5) translateY(30px);
    filter: blur(3px);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05) translateY(-5px);
    filter: blur(1px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
    filter: blur(0px);
  }
}

.retro-subtitle {
  font-family: 'Courier New', monospace;
  color: #00cc88;
  text-shadow: 
    0 0 3px #00cc88,
    1px 1px 0px #004433;
  animation: fadeInUp 2s ease-out 0.5s both;
  letter-spacing: 0.1em;
}

/* Loading dots animation */
.loading-dots {
  display: inline-block;
}

.dot1, .dot2, .dot3 {
  opacity: 0;
  animation: dotFade 1.5s infinite;
}

.dot1 {
  animation-delay: 0s;
}

.dot2 {
  animation-delay: 0.5s;
}

.dot3 {
  animation-delay: 1s;
}

@keyframes dotFade {
  0%, 20% {
    opacity: 0;
    text-shadow: none;
  }
  25%, 75% {
    opacity: 1;
    text-shadow: 
      0 0 3px #00cc88,
      0 0 6px #00cc88,
      1px 1px 0px #004433;
  }
  80%, 100% {
    opacity: 0;
    text-shadow: none;
  }
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.glass-icon-container {
  display: inline-block;
  margin-right: 0.5em;
  position: relative;
  animation: iconFloat 3s ease-in-out infinite,
             fadeInRotate 1.8s ease-out;
}

/* CRT scanlines for glass icon - REMOVED */

@keyframes iconFloat {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-8px) rotate(2deg);
  }
}

@keyframes fadeInRotate {
  0% {
    opacity: 0;
    transform: scale(0.3) rotate(-180deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .retro-title {
    font-size: clamp(1.5rem, 6vw, 2.5rem);
    letter-spacing: 0.1em;
  }
}
</style>
