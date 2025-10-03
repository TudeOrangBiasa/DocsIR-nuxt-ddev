<template>
  <div class="presentation-navigator">
    <!-- Floating Navigation Panel -->
    <div 
      v-if="showPanel"
      class="fixed bottom-6 right-6 z-50 bg-black/20 backdrop-blur-md rounded-2xl border border-white/20 p-4 shadow-2xl animate-slide-up"
    >
      <div class="flex flex-col space-y-3 min-w-[200px]">
        <!-- Header -->
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-white font-semibold text-sm">🎬 Presentation</h3>
          <button 
            @click="showPanel = false"
            class="text-white/60 hover:text-white transition-colors"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <!-- Navigation Buttons -->
        <div class="space-y-2">
          <NuxtLink 
            to="/presentation"
            class="flex items-center space-x-3 w-full px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg transition-colors text-blue-200 hover:text-blue-100"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
            </svg>
            <span class="text-sm font-medium">Start Presentation</span>
          </NuxtLink>

          <!-- Quick Jump to Specific Slides -->
          <div class="border-t border-white/10 pt-2">
            <p class="text-white/60 text-xs mb-2">Quick Jump:</p>
            
            <NuxtLink 
              to="/presentation#demo"
              class="flex items-center space-x-2 w-full px-3 py-1.5 bg-green-500/20 hover:bg-green-500/30 rounded transition-colors text-green-200 hover:text-green-100"
            >
              <span class="text-xs">🚀</span>
              <span class="text-xs">Live Demo</span>
            </NuxtLink>
            
            <NuxtLink 
              to="/presentation#architecture"
              class="flex items-center space-x-2 w-full px-3 py-1.5 bg-purple-500/20 hover:bg-purple-500/30 rounded transition-colors text-purple-200 hover:text-purple-100 mt-1"
            >
              <span class="text-xs">🏗️</span>
              <span class="text-xs">Architecture</span>
            </NuxtLink>
            
            <NuxtLink 
              to="/presentation#implementation"
              class="flex items-center space-x-2 w-full px-3 py-1.5 bg-orange-500/20 hover:bg-orange-500/30 rounded transition-colors text-orange-200 hover:text-orange-100 mt-1"
            >
              <span class="text-xs">💻</span>
              <span class="text-xs">Code Implementation</span>
            </NuxtLink>
          </div>
        </div>

        <!-- Additional Options -->
        <div class="border-t border-white/10 pt-2">
          <a 
            href="/Presentation.md" 
            target="_blank"
            class="flex items-center space-x-3 w-full px-3 py-2 bg-gray-500/20 hover:bg-gray-500/30 rounded-lg transition-colors text-gray-200 hover:text-gray-100"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <span class="text-sm">Markdown Notes</span>
          </a>
        </div>
      </div>
    </div>

    <!-- Floating Toggle Button -->
    <button 
      v-if="!showPanel"
      @click="showPanel = true"
      class="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-full shadow-2xl flex items-center justify-center text-white transition-all duration-300 hover:scale-110 animate-pulse-slow"
      title="Open Presentation Navigator"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
      </svg>
      
      <!-- Notification Badge -->
      <div class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
        <span class="text-xs text-white font-bold">!</span>
      </div>
    </button>

    <!-- Keyboard Shortcut Hint -->
    <div 
      v-if="showKeyboardHint"
      class="fixed bottom-20 right-6 z-40 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2 text-white/80 text-xs animate-fade-in"
    >
      Press <kbd class="bg-white/20 px-1 rounded">P</kbd> to open presentation
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Component props
const props = defineProps({
  position: {
    type: String,
    default: 'bottom-right' // bottom-right, bottom-left, top-right, top-left
  },
  showKeyboardHint: {
    type: Boolean,
    default: true
  }
})

// Reactive state
const showPanel = ref(false)
const showKeyboardHint = ref(props.showKeyboardHint)

// Keyboard shortcuts
const handleKeydown = (event) => {
  // Press 'P' to toggle presentation panel
  if (event.key.toLowerCase() === 'p' && !event.ctrlKey && !event.metaKey && !event.altKey) {
    // Only if not in an input field
    if (!['INPUT', 'TEXTAREA'].includes(event.target.tagName)) {
      event.preventDefault()
      showPanel.value = !showPanel.value
      if (showKeyboardHint.value) {
        showKeyboardHint.value = false
      }
    }
  }
  
  // Press 'Escape' to close panel
  if (event.key === 'Escape' && showPanel.value) {
    showPanel.value = false
  }
}

// Hide keyboard hint after some time
const hideKeyboardHintTimer = ref(null)

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  
  // Auto-hide keyboard hint after 5 seconds
  if (showKeyboardHint.value) {
    hideKeyboardHintTimer.value = setTimeout(() => {
      showKeyboardHint.value = false
    }, 5000)
  }
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  if (hideKeyboardHintTimer.value) {
    clearTimeout(hideKeyboardHintTimer.value)
  }
})

// Close panel when clicking outside (if needed)
const closePanel = () => {
  showPanel.value = false
}
</script>

<style scoped>
@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes pulse-slow {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

.animate-slide-up {
  animation: slide-up 0.3s ease-out;
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}

.animate-pulse-slow {
  animation: pulse-slow 3s ease-in-out infinite;
}

kbd {
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace;
  font-size: 0.75rem;
  font-weight: 600;
}

/* Hover effects for links */
.presentation-navigator a {
  text-decoration: none;
}

.presentation-navigator a:hover {
  transform: translateX(2px);
}

/* Custom scrollbar for panel if needed */
.presentation-navigator::-webkit-scrollbar {
  width: 4px;
}

.presentation-navigator::-webkit-scrollbar-track {
  background: transparent;
}

.presentation-navigator::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
}

.presentation-navigator::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}
</style>
