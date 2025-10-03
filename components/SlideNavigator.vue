<template>
  <div class="slide-navigator">
    <!-- Slide Thumbnails Panel -->
    <div 
      v-if="showThumbnails"
      class="fixed left-4 top-1/2 transform -translate-y-1/2 z-40 bg-black/30 backdrop-blur-md rounded-2xl border border-white/20 p-4 max-h-[80vh] overflow-y-auto animate-slide-in-left"
    >
      <div class="space-y-2 w-48">
        <!-- Header -->
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-white font-semibold text-sm">📑 Slides</h3>
          <button 
            @click="showThumbnails = false"
            class="text-white/60 hover:text-white transition-colors"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <!-- Slide List -->
        <div class="space-y-2">
          <button
            v-for="(slide, index) in slideList"
            :key="index"
            @click="$emit('goto-slide', index); showThumbnails = false"
            :class="[
              'w-full text-left p-3 rounded-lg transition-all duration-200 group',
              index === currentSlide 
                ? 'bg-blue-500/30 border border-blue-400/50 text-blue-100' 
                : 'bg-white/10 hover:bg-white/20 text-white/80 hover:text-white'
            ]"
          >
            <div class="flex items-center space-x-3">
              <div class="flex-shrink-0">
                <span class="text-lg">{{ slide.icon }}</span>
              </div>
              <div class="flex-1 min-w-0">
                <div class="text-sm font-medium truncate">{{ slide.title }}</div>
                <div class="text-xs opacity-70 truncate">{{ slide.subtitle }}</div>
              </div>
              <div class="flex-shrink-0">
                <span class="text-xs font-mono opacity-60">{{ index + 1 }}</span>
              </div>
            </div>
            
            <!-- Progress indicator for current slide -->
            <div v-if="index === currentSlide" class="mt-2 w-full h-1 bg-white/20 rounded-full overflow-hidden">
              <div class="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></div>
            </div>
          </button>
        </div>

        <!-- Quick Actions -->
        <div class="border-t border-white/10 pt-3 mt-4 space-y-2">
          <NuxtLink 
            to="/"
            class="flex items-center space-x-2 w-full px-3 py-2 bg-gray-500/20 hover:bg-gray-500/30 rounded-lg transition-colors text-gray-200 hover:text-gray-100"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            <span class="text-sm">Back to App</span>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Toggle Button -->
    <button 
      v-if="!showThumbnails"
      @click="showThumbnails = true"
      class="fixed left-4 top-1/2 transform -translate-y-1/2 z-40 w-12 h-12 bg-black/30 backdrop-blur-md hover:bg-black/50 rounded-r-xl border-r border-t border-b border-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all duration-300"
      title="Show slide thumbnails (S)"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
      </svg>
    </button>

    <!-- Presentation Controls (Bottom) -->
    <div class="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40 bg-black/30 backdrop-blur-md rounded-full border border-white/20 px-6 py-3">
      <div class="flex items-center space-x-4">
        <!-- Previous Button -->
        <button 
          @click="$emit('prev-slide')"
          :disabled="currentSlide === 0"
          class="p-2 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title="Previous slide (←)"
        >
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>

        <!-- Slide Counter -->
        <div class="flex items-center space-x-2 text-white/80">
          <span class="text-sm font-mono">{{ currentSlide + 1 }}</span>
          <span class="text-xs">/</span>
          <span class="text-sm font-mono">{{ totalSlides }}</span>
        </div>

        <!-- Play/Pause Auto-advance -->
        <button 
          @click="toggleAutoPlay"
          class="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          :title="isAutoPlaying ? 'Pause auto-advance' : 'Start auto-advance'"
        >
          <svg v-if="!isAutoPlaying" class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
          </svg>
          <svg v-else class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </button>

        <!-- Next Button -->
        <button 
          @click="$emit('next-slide')"
          :disabled="currentSlide === totalSlides - 1"
          class="p-2 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title="Next slide (→)"
        >
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>

        <!-- Fullscreen Toggle -->
        <button 
          @click="toggleFullscreen"
          class="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          title="Toggle fullscreen (F)"
        >
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- Auto-play Timer -->
    <div 
      v-if="isAutoPlaying"
      class="fixed top-4 left-1/2 transform -translate-x-1/2 z-40 bg-green-500/20 backdrop-blur-sm rounded-full px-4 py-2 border border-green-400/30"
    >
      <div class="flex items-center space-x-2 text-green-200">
        <svg class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
        </svg>
        <span class="text-sm font-medium">Auto-advancing...</span>
        <span class="text-xs font-mono">{{ autoPlayCountdown }}s</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'

// Props
const props = defineProps({
  currentSlide: {
    type: Number,
    required: true
  },
  totalSlides: {
    type: Number,
    required: true
  }
})

// Emits
const emit = defineEmits(['prev-slide', 'next-slide', 'goto-slide'])

// Reactive state
const showThumbnails = ref(false)
const isAutoPlaying = ref(false)
const autoPlayCountdown = ref(10)
let autoPlayTimer = null
let countdownTimer = null

// Slide definitions with metadata
const slideList = [
  { icon: '🎬', title: 'Title Slide', subtitle: 'Project Introduction' },
  { icon: '🤔', title: 'Problem Statement', subtitle: 'Naive vs IR Approach' },
  { icon: '🐧', title: 'Linux Challenge', subtitle: 'Documentation Complexity' },
  { icon: '📊', title: 'Why TF-IDF?', subtitle: 'Term Importance Analysis' },
  { icon: '💻', title: 'TF-IDF Code', subtitle: 'Implementation Details' },
  { icon: '🎯', title: 'Why Cosine?', subtitle: 'Document Length Problem' },
  { icon: '⚡', title: 'Cosine Code', subtitle: 'Similarity Implementation' },
  { icon: '🔧', title: 'Linux Use Case', subtitle: 'Practical Benefits' },
  { icon: '🏗️', title: 'Architecture', subtitle: 'System Design' },
  { icon: '🗄️', title: 'Database', subtitle: 'Storage Strategy' },
  { icon: '🚀', title: 'Live Demo', subtitle: 'Working Examples' },
  { icon: '🔮', title: 'Next Steps', subtitle: 'Future Development' },
  { icon: '🎯', title: 'Conclusion', subtitle: 'Key Takeaways' }
]

// Auto-play functionality
const startAutoPlay = () => {
  if (autoPlayTimer) clearInterval(autoPlayTimer)
  if (countdownTimer) clearInterval(countdownTimer)
  
  autoPlayCountdown.value = 10
  
  countdownTimer = setInterval(() => {
    autoPlayCountdown.value--
    if (autoPlayCountdown.value <= 0) {
      autoPlayCountdown.value = 10
      if (props.currentSlide < props.totalSlides - 1) {
        emit('next-slide')
      } else {
        stopAutoPlay()
      }
    }
  }, 1000)
}

const stopAutoPlay = () => {
  isAutoPlaying.value = false
  if (autoPlayTimer) clearInterval(autoPlayTimer)
  if (countdownTimer) clearInterval(countdownTimer)
}

const toggleAutoPlay = () => {
  if (isAutoPlaying.value) {
    stopAutoPlay()
  } else {
    isAutoPlaying.value = true
    startAutoPlay()
  }
}

// Fullscreen functionality
const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}

// Keyboard shortcuts
const handleKeydown = (event) => {
  switch (event.key.toLowerCase()) {
    case 's':
      if (!['INPUT', 'TEXTAREA'].includes(event.target.tagName)) {
        event.preventDefault()
        showThumbnails.value = !showThumbnails.value
      }
      break
    case 'f':
      if (!['INPUT', 'TEXTAREA'].includes(event.target.tagName)) {
        event.preventDefault()
        toggleFullscreen()
      }
      break
    case ' ':
    case 'p':
      if (!['INPUT', 'TEXTAREA'].includes(event.target.tagName)) {
        event.preventDefault()
        toggleAutoPlay()
      }
      break
    case 'escape':
      if (showThumbnails.value) {
        showThumbnails.value = false
      } else if (document.fullscreenElement) {
        document.exitFullscreen()
      }
      break
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  stopAutoPlay()
})

// Watch for auto-play restart when slide changes
const restartAutoPlay = () => {
  if (isAutoPlaying.value) {
    startAutoPlay()
  }
}

// Restart auto-play timer when current slide changes
watch(() => props.currentSlide, restartAutoPlay)
</script>

<style scoped>
@keyframes slide-in-left {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-slide-in-left {
  animation: slide-in-left 0.3s ease-out;
}

/* Custom scrollbar for slide list */
.slide-navigator::-webkit-scrollbar {
  width: 4px;
}

.slide-navigator::-webkit-scrollbar-track {
  background: transparent;
}

.slide-navigator::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
}

.slide-navigator::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* Hover effects */
.slide-navigator button:hover {
  transform: scale(1.05);
}

.slide-navigator button:active {
  transform: scale(0.95);
}
</style>
