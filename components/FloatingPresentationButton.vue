<template>
  <div class="floating-presentation-btn">
    <!-- Main FAB -->
    <div 
      v-if="!showMenu"
      @click="showMenu = true"
      class="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-full shadow-2xl flex items-center justify-center text-white cursor-pointer transition-all duration-300 hover:scale-110 group"
      :class="{ 'animate-bounce': shouldAnimate }"
    >
      <!-- Icon -->
      <svg class="w-7 h-7 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
      </svg>
      
      <!-- Pulse rings -->
      <div class="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 animate-ping opacity-20"></div>
      <div class="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse opacity-10"></div>
      
      <!-- Notification badge -->
      <div v-if="showNotification" class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
        <span class="text-xs text-white font-bold">!</span>
      </div>
    </div>

    <!-- Expanded Menu -->
    <div 
      v-if="showMenu"
      class="fixed bottom-6 right-6 z-50 animate-scale-up"
    >
      <!-- Background Overlay -->
      <div 
        @click="showMenu = false"
        class="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
      ></div>

      <!-- Menu Container -->
      <div class="bg-black/30 backdrop-blur-md rounded-2xl border border-white/20 p-6 min-w-[280px] shadow-2xl">
        <!-- Header -->
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-white font-bold text-lg flex items-center gap-2">
            🎬 <span>Presentation</span>
          </h3>
          <button 
            @click="showMenu = false"
            class="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <!-- Quick Actions -->
        <div class="space-y-3">
          <!-- Start Presentation -->
          <NuxtLink 
            to="/presentation"
            @click="showMenu = false"
            class="flex items-center space-x-3 w-full px-4 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 rounded-lg transition-all duration-200 text-white hover:text-white group"
          >
            <div class="w-10 h-10 bg-blue-500/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
              </svg>
            </div>
            <div class="flex-1">
              <div class="font-semibold">Start Presentation</div>
              <div class="text-sm text-white/70">Interactive slide show</div>
            </div>
            <svg class="w-5 h-5 text-white/50 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </NuxtLink>

          <!-- Quick Jump Options -->
          <div class="border-t border-white/10 pt-3">
            <p class="text-white/60 text-sm mb-2 font-medium">Quick Jump:</p>
            
            <div class="grid grid-cols-2 gap-2">
              <NuxtLink 
                to="/presentation"
                @click="goToSlide(10); showMenu = false"
                class="flex items-center space-x-2 px-3 py-2 bg-green-500/20 hover:bg-green-500/30 rounded-lg transition-colors text-green-200 hover:text-green-100 group"
              >
                <span class="text-lg">🚀</span>
                <span class="text-sm font-medium">Demo</span>
              </NuxtLink>
              
              <NuxtLink 
                to="/presentation"
                @click="goToSlide(8); showMenu = false"
                class="flex items-center space-x-2 px-3 py-2 bg-purple-500/20 hover:bg-purple-500/30 rounded-lg transition-colors text-purple-200 hover:text-purple-100 group"
              >
                <span class="text-lg">🏗️</span>
                <span class="text-sm font-medium">Arch</span>
              </NuxtLink>
              
              <NuxtLink 
                to="/presentation"
                @click="goToSlide(4); showMenu = false"
                class="flex items-center space-x-2 px-3 py-2 bg-orange-500/20 hover:bg-orange-500/30 rounded-lg transition-colors text-orange-200 hover:text-orange-100 group"
              >
                <span class="text-lg">💻</span>
                <span class="text-sm font-medium">Code</span>
              </NuxtLink>
              
              <NuxtLink 
                to="/presentation"
                @click="goToSlide(12); showMenu = false"
                class="flex items-center space-x-2 px-3 py-2 bg-pink-500/20 hover:bg-pink-500/30 rounded-lg transition-colors text-pink-200 hover:text-pink-100 group"
              >
                <span class="text-lg">🎯</span>
                <span class="text-sm font-medium">End</span>
              </NuxtLink>
            </div>
          </div>

          <!-- Additional Options -->
          <div class="border-t border-white/10 pt-3 space-y-2">
            <a 
              href="/Presentation.md" 
              target="_blank"
              @click="showMenu = false"
              class="flex items-center space-x-3 w-full px-3 py-2 bg-gray-500/20 hover:bg-gray-500/30 rounded-lg transition-colors text-gray-200 hover:text-gray-100 group"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <span class="text-sm font-medium">View Notes (MD)</span>
              <svg class="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
            </a>
          </div>
        </div>

        <!-- Keyboard Shortcuts Hint -->
        <div class="mt-4 pt-3 border-t border-white/10">
          <p class="text-white/50 text-xs text-center">
            Press <kbd class="bg-white/20 px-1 rounded text-white/70">P</kbd> anywhere to open this menu
          </p>
        </div>
      </div>
    </div>

    <!-- Keyboard shortcut hint -->
    <div 
      v-if="showKeyboardHint && !showMenu"
      class="fixed bottom-20 right-6 z-40 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2 text-white/80 text-xs animate-fade-in-out"
    >
      Press <kbd class="bg-white/20 px-1 rounded">P</kbd> for presentation
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Props
const props = defineProps({
  autoShow: {
    type: Boolean,
    default: false
  },
  position: {
    type: String,
    default: 'bottom-right'
  }
})

// Reactive state
const showMenu = ref(false)
const showNotification = ref(true)
const showKeyboardHint = ref(true)
const shouldAnimate = ref(false)

// Auto-hide notification after user interaction
let notificationTimer = null
let keyboardHintTimer = null
let animationTimer = null

// Navigation helper
const goToSlide = (slideIndex) => {
  // Store the target slide in session storage so presentation page can jump to it
  sessionStorage.setItem('presentationStartSlide', slideIndex.toString())
}

// Keyboard shortcuts
const handleKeydown = (event) => {
  // Press 'P' to toggle menu
  if (event.key.toLowerCase() === 'p' && !event.ctrlKey && !event.metaKey && !event.altKey) {
    // Only if not in an input field
    if (!['INPUT', 'TEXTAREA'].includes(event.target.tagName)) {
      event.preventDefault()
      showMenu.value = !showMenu.value
      hideNotification()
      hideKeyboardHint()
    }
  }
  
  // Press 'Escape' to close menu
  if (event.key === 'Escape' && showMenu.value) {
    showMenu.value = false
  }
}

// Hide notification after interaction
const hideNotification = () => {
  showNotification.value = false
  if (notificationTimer) clearTimeout(notificationTimer)
}

// Hide keyboard hint
const hideKeyboardHint = () => {
  showKeyboardHint.value = false
  if (keyboardHintTimer) clearTimeout(keyboardHintTimer)
}

// Start subtle animation to grab attention
const startAnimation = () => {
  animationTimer = setInterval(() => {
    shouldAnimate.value = true
    setTimeout(() => {
      shouldAnimate.value = false
    }, 1000)
  }, 10000) // Every 10 seconds
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  
  // Auto-hide notification after 8 seconds
  notificationTimer = setTimeout(() => {
    showNotification.value = false
  }, 8000)
  
  // Auto-hide keyboard hint after 12 seconds
  keyboardHintTimer = setTimeout(() => {
    showKeyboardHint.value = false
  }, 12000)
  
  // Start subtle animation after 5 seconds
  setTimeout(() => {
    startAnimation()
  }, 5000)
  
  // Auto-show menu if prop is set
  if (props.autoShow) {
    setTimeout(() => {
      showMenu.value = true
    }, 1000)
  }
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  if (notificationTimer) clearTimeout(notificationTimer)
  if (keyboardHintTimer) clearTimeout(keyboardHintTimer)
  if (animationTimer) clearInterval(animationTimer)
})

// Close menu when clicking outside
const handleClickOutside = () => {
  showMenu.value = false
}
</script>

<style scoped>
@keyframes scale-up {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes fade-in-out {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  10%, 90% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-10px);
  }
}

.animate-scale-up {
  animation: scale-up 0.2s ease-out;
}

.animate-fade-in-out {
  animation: fade-in-out 4s ease-in-out;
}

kbd {
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace;
  font-size: 0.7rem;
  font-weight: 600;
}

/* Hover effects */
.floating-presentation-btn a:hover {
  transform: translateX(2px);
}

/* Custom pulse animation */
@keyframes gentle-bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}

.animate-bounce {
  animation: gentle-bounce 2s ease-in-out infinite;
}
</style>
