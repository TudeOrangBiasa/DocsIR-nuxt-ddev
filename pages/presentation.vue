<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 text-white">
    <!-- Navigation Bar -->
    <nav class="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div class="container mx-auto px-6 py-4 flex justify-between items-center">
        <div class="flex items-center space-x-4">
          <!-- Back to Main App Button -->
          <NuxtLink 
            to="/"
            class="flex items-center space-x-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white/90 hover:text-white"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            <span class="text-sm font-medium">Back to Search</span>
          </NuxtLink>
          
          <h1 class="text-xl font-bold">Linux Document IR System</h1>
        </div>
        
        <div class="flex items-center space-x-4">
          <!-- Quick Jump Buttons -->
          <div class="hidden md:flex items-center space-x-2">
            <button 
              @click="currentSlide = 0"
              class="px-2 py-1 bg-white/10 hover:bg-white/20 rounded text-xs transition-colors"
              :class="currentSlide === 0 ? 'bg-blue-500/30' : ''"
              title="Go to start"
            >
              🏠
            </button>
            <button 
              @click="currentSlide = 10"
              class="px-2 py-1 bg-white/10 hover:bg-white/20 rounded text-xs transition-colors"
              :class="currentSlide === 10 ? 'bg-green-500/30' : ''"
              title="Go to demo"
            >
              🚀
            </button>
            <button 
              @click="currentSlide = slides.length - 1"
              class="px-2 py-1 bg-white/10 hover:bg-white/20 rounded text-xs transition-colors"
              :class="currentSlide === slides.length - 1 ? 'bg-purple-500/30' : ''"
              title="Go to end"
            >
              🎯
            </button>
          </div>

          <span class="text-sm opacity-75">{{ currentSlide + 1 }} / {{ slides.length }}</span>
          <div class="flex space-x-2">
            <button 
              @click="prevSlide" 
              :disabled="currentSlide === 0"
              class="px-3 py-1 bg-white/10 rounded disabled:opacity-50 hover:bg-white/20 transition-colors"
            >
              ←
            </button>
            <button 
              @click="nextSlide" 
              :disabled="currentSlide === slides.length - 1"
              class="px-3 py-1 bg-white/10 rounded disabled:opacity-50 hover:bg-white/20 transition-colors"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Slide Container -->
    <div class="pt-20 pb-8">
      <div class="container mx-auto px-6">
        <transition name="slide" mode="out-in">
          <component :is="currentSlideComponent" :key="currentSlide" />
        </transition>
      </div>
    </div>

    <!-- Progress Bar -->
    <div class="fixed bottom-0 left-0 right-0 h-1 bg-white/10">
      <div 
        class="h-full bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300"
        :style="{ width: `${((currentSlide + 1) / slides.length) * 100}%` }"
      ></div>
    </div>

    <!-- Slide Navigation Dots -->
    <div class="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
      <button
        v-for="(slide, index) in slides"
        :key="index"
        @click="currentSlide = index"
        class="w-3 h-3 rounded-full transition-all duration-200"
        :class="index === currentSlide ? 'bg-white' : 'bg-white/30 hover:bg-white/50'"
      ></button>
    </div>

    <!-- Advanced Slide Navigator -->
    <SlideNavigator 
      :current-slide="currentSlide"
      :total-slides="slides.length"
      @prev-slide="prevSlide"
      @next-slide="nextSlide"
      @goto-slide="currentSlide = $event"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useHead } from 'nuxt/app'
import SlideNavigator from '../components/SlideNavigator.vue';
import TitleSlide from '../components/slides/TitleSlide.vue';
import ProblemSlide from '../components/slides/ProblemSlide.vue';
import LinuxDocChallengeSlide from '../components/slides/LinuxDocChallengeSlide.vue';
import WhyTFIDFSlide from '../components/slides/WhyTFIDFSlide.vue';
import TFIDFImplementationSlide from '../components/slides/TFIDFImplementationSlide.vue';
import WhyCosineSlide from '../components/slides/WhyCosineSlide.vue';
import CosineImplementationSlide from '../components/slides/CosineImplementationSlide.vue';
import LinuxUseCase from '../components/slides/LinuxUseCase.vue';
import SystemArchitectureSlide from '../components/slides/SystemArchitectureSlide.vue';
import DatabaseStrategySlide from '../components/slides/DatabaseStrategySlide.vue';
import DemoSlide from '../components/slides/DemoSlide.vue';
import NextStepsSlide from '../components/slides/NextStepsSlide.vue';
import ConclusionSlide from '../components/slides/ConclusionSlide.vue';

definePageMeta({
  layout: 'blank'
})

// Slide state
const currentSlide = ref(0)

// Slide definitions
const slides = [
  TitleSlide,
  ProblemSlide,
  LinuxDocChallengeSlide, 
  WhyTFIDFSlide,
  TFIDFImplementationSlide,
  WhyCosineSlide,
  CosineImplementationSlide,
  LinuxUseCase,
  SystemArchitectureSlide,
  DatabaseStrategySlide,
  DemoSlide,
  NextStepsSlide,
  ConclusionSlide
]

// Current slide component
const currentSlideComponent = computed(() => {
  return slides[currentSlide.value]
})

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

// Keyboard navigation
const handleKeydown = (event) => {
  console.log('Global keydown event:', event.key, 'Target:', event.target.tagName)
  
  // Don't handle keyboard shortcuts if user is typing in an input field
  if (event.target && (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA')) {
    console.log('Ignoring keydown because user is typing in input field')
    return
  }
  
  if (event.key === 'ArrowRight' || event.key === ' ') {
    console.log('Handling navigation key:', event.key)
    event.preventDefault()
    nextSlide()
  } else if (event.key === 'ArrowLeft') {
    console.log('Handling navigation key:', event.key)
    event.preventDefault()
    prevSlide()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  
  // Check if there's a target slide from session storage
  const targetSlide = sessionStorage.getItem('presentationStartSlide')
  if (targetSlide) {
    const slideIndex = parseInt(targetSlide)
    if (slideIndex >= 0 && slideIndex < slides.length) {
      currentSlide.value = slideIndex
    }
    // Clear the session storage
    sessionStorage.removeItem('presentationStartSlide')
  }
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})

// Set page title
useHead({
  title: 'Linux Document IR System - Presentation'
})
</script>

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
