<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import GlassSurface from './GlassSurface.vue'
import TitleSlide from './slides/TitleSlide.vue'
import ProblemSlide from './slides/ProblemSlide.vue'
import LinuxDocChallengeSlide from './slides/LinuxDocChallengeSlide.vue'
import WhyTFIDFSlide from './slides/WhyTFIDFSlide.vue'
import TFIDFImplementationSlide from './slides/TFIDFImplementationSlide.vue'
import WhyCosineSlide from './slides/WhyCosineSlide.vue'
import CosineImplementationSlide from './slides/CosineImplementationSlide.vue'
import FuzzySearchSlide from './slides/FuzzySearchSlide.vue'
import LinuxUseCase from './slides/LinuxUseCase.vue'
import SystemArchitectureSlide from './slides/SystemArchitectureSlide.vue'
import DatabaseStrategySlide from './slides/DatabaseStrategySlide.vue'
import DemoSlide from './slides/DemoSlide.vue'
import NextStepsSlide from './slides/NextStepsSlide.vue'
import ConclusionSlide from './slides/ConclusionSlide.vue'

interface Props {
  show: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  'close': []
}>()

// Slide state
const currentSlide = ref(0)

// Slide definitions using imported components
const slides = [
  TitleSlide,
  ProblemSlide, 
  LinuxDocChallengeSlide,
  WhyTFIDFSlide,
  TFIDFImplementationSlide,
  WhyCosineSlide,
  CosineImplementationSlide,
  FuzzySearchSlide,
  LinuxUseCase,
  SystemArchitectureSlide,
  DatabaseStrategySlide,
  DemoSlide,
  NextStepsSlide,
  ConclusionSlide
]

// Current slide component
const currentSlideComponent = computed(() => slides[currentSlide.value])

// Navigation methods
const nextSlide = () => {
  if (currentSlide.value < slides.length - 1) {
    currentSlide.value++
  }
}

const prevSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--
  }
}

const goToSlide = (index: number) => {
  if (index >= 0 && index < slides.length) {
    currentSlide.value = index
  }
}

// Keyboard navigation
const handleKeydown = (event: KeyboardEvent) => {
  // Don't handle keyboard shortcuts if user is typing in an input field
  const target = event.target as HTMLElement
  if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
    return
  }
  
  if (event.key === 'ArrowRight' || event.key === ' ') {
    event.preventDefault()
    nextSlide()
  } else if (event.key === 'ArrowLeft') {
    event.preventDefault()
    prevSlide()
  } else if (event.key === 'Escape') {
    event.preventDefault()
    emit('close')
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div v-if="show" class="fixed inset-0 z-[100] flex items-center justify-center">
    <!-- Backdrop -->
    <div 
      class="absolute inset-0 bg-black/95 backdrop-blur-sm" 
      @click="$emit('close')"
    ></div>
    
    <!-- Modal -->
    <ClientOnly>
      <GlassSurface
        width="95vw"
        height="95vh"
        :border-radius="24"
        :background-opacity="0.1"
        :blur-amount="20"
        class="relative shadow-2xl flex flex-col"
      >
        <div @click.stop class="w-full h-full flex flex-col">
          <!-- Header -->
          <div class="flex justify-between items-center p-6 bg-black/50 backdrop-blur-md border-b border-white/10 flex-shrink-0">
            <h1 class="text-2xl font-bold text-white flex items-center space-x-3">
              <svg class="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
              <span>Linux Document IR System - Presentation</span>
            </h1>
            
            <!-- Navigation Controls -->
            <div class="flex items-center space-x-4">
              <div class="flex items-center space-x-2">
                <button 
                  @click="goToSlide(0)"
                  class="px-2 py-1 bg-white/10 hover:bg-white/20 rounded text-xs transition-colors"
                  :class="currentSlide === 0 ? 'bg-blue-500/30' : ''"
                  title="Go to start"
                >
                  🏠
                </button>
                <button 
                  @click="goToSlide(10)"
                  class="px-2 py-1 bg-white/10 hover:bg-white/20 rounded text-xs transition-colors"
                  :class="currentSlide === 10 ? 'bg-green-500/30' : ''"
                  title="Go to demo"
                >
                  🚀
                </button>
                <button 
                  @click="goToSlide(slides.length - 1)"
                  class="px-2 py-1 bg-white/10 hover:bg-white/20 rounded text-xs transition-colors"
                  :class="currentSlide === slides.length - 1 ? 'bg-purple-500/30' : ''"
                  title="Go to end"
                >
                  🎯
                </button>
              </div>

              <span class="text-sm opacity-75 text-white">{{ currentSlide + 1 }} / {{ slides.length }}</span>
              
              <div class="flex space-x-2">
                <button 
                  @click="prevSlide" 
                  :disabled="currentSlide === 0"
                  class="px-3 py-1 bg-white/10 rounded disabled:opacity-50 hover:bg-white/20 transition-colors text-white"
                >
                  ←
                </button>
                <button 
                  @click="nextSlide" 
                  :disabled="currentSlide === slides.length - 1"
                  class="px-3 py-1 bg-white/10 rounded disabled:opacity-50 hover:bg-white/20 transition-colors text-white"
                >
                  →
                </button>
              </div>
              
              <button 
                @click="$emit('close')"
                class="flex items-center space-x-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-400/30 rounded-lg transition-colors text-red-200 hover:text-red-100"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                <span class="font-medium">Close</span>
              </button>
            </div>
          </div>

          <!-- Slide Content -->
          <div class="flex-1 overflow-y-auto overflow-x-hidden p-6">
            <div class="w-full min-h-full flex items-start justify-center">
              <div class="w-full max-w-full">
                <transition name="slide" mode="out-in">
                  <component :is="currentSlideComponent" :key="currentSlide" />
                </transition>
              </div>
            </div>
          </div>

          <!-- Footer with Progress Bar and Navigation -->
          <div class="p-4 bg-black/50 backdrop-blur-md border-t border-white/10 flex-shrink-0">
            <!-- Progress Bar -->
            <div class="mb-3">
              <div class="w-full h-1 bg-white/10 rounded-full">
                <div 
                  class="h-full bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 rounded-full"
                  :style="{ width: `${((currentSlide + 1) / slides.length) * 100}%` }"
                ></div>
              </div>
            </div>
            
            <!-- Navigation Dots -->
            <div class="flex justify-center space-x-2">
              <button
                v-for="(slide, index) in slides"
                :key="index"
                @click="goToSlide(index)"
                class="w-3 h-3 rounded-full transition-all duration-200"
                :class="index === currentSlide ? 'bg-white' : 'bg-white/30 hover:bg-white/50'"
              ></button>
            </div>
            
            <div class="text-center mt-3">
              <p class="text-white/70 text-sm">
                Use arrow keys (← →) or click buttons to navigate between slides
              </p>
            </div>
          </div>
        </div>
      </GlassSurface>

      <!-- Fallback for SSR -->
      <template #fallback>
        <div class="relative bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 w-[95vw] h-[95vh] shadow-2xl flex flex-col"
             @click.stop>
          <!-- Fallback header -->
          <div class="flex items-center justify-between p-6 border-b border-white/10 flex-shrink-0">
            <h2 class="text-xl font-bold text-white">Presentation</h2>
            <button @click="$emit('close')" 
                    class="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          <!-- Fallback content -->
          <div class="flex-1 p-6 overflow-hidden">
            <div class="w-full h-full flex items-center justify-center">
              <component :is="currentSlideComponent" :key="currentSlide" />
            </div>
          </div>
        </div>
      </template>
    </ClientOnly>
  </div>
</template>

<style scoped>
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from {
  opacity: 0;
  transform: translateX(50px);
}
.slide-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}
</style>
