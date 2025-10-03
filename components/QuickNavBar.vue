<template>
  <div class="quick-nav-bar">
    <!-- Compact Navigation Bar -->
    <div class="flex items-center justify-center space-x-2 bg-black/20 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
      <!-- Home/Search -->
      <NuxtLink 
        to="/"
        class="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white/80 hover:text-white group"
        title="Back to Search Engine"
      >
        <svg class="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
        <span class="text-xs font-medium hidden sm:inline">Search</span>
      </NuxtLink>

      <!-- Divider -->
      <div class="w-px h-6 bg-white/20"></div>

      <!-- Presentation -->
      <NuxtLink 
        to="/presentation"
        class="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-blue-500/20 hover:bg-blue-500/30 transition-colors text-blue-200 hover:text-blue-100 group"
        title="View Presentation"
      >
        <svg class="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
        </svg>
        <span class="text-xs font-medium hidden sm:inline">Present</span>
      </NuxtLink>

      <!-- Quick Demo Link -->
      <button 
        @click="goToDemo"
        class="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-green-500/20 hover:bg-green-500/30 transition-colors text-green-200 hover:text-green-100 group"
        title="Jump to Live Demo"
      >
        <span class="text-sm">🚀</span>
        <span class="text-xs font-medium hidden sm:inline">Demo</span>
      </button>

      <!-- Documentation -->
      <a 
        href="/Presentation.md" 
        target="_blank"
        class="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-gray-500/20 hover:bg-gray-500/30 transition-colors text-gray-200 hover:text-gray-100 group"
        title="View Markdown Documentation"
      >
        <svg class="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
        <span class="text-xs font-medium hidden sm:inline">Docs</span>
      </a>
    </div>
  </div>
</template>

<script setup>
// Props for customization
const props = defineProps({
  currentPage: {
    type: String,
    default: 'search' // 'search' | 'presentation'
  }
})

// Navigation helper
const goToDemo = () => {
  // Store the target slide for demo
  sessionStorage.setItem('presentationStartSlide', '10')
  // Navigate to presentation
  navigateTo('/presentation')
}
</script>

<style scoped>
/* Hover effects */
.quick-nav-bar a:hover,
.quick-nav-bar button:hover {
  transform: translateY(-1px);
}

/* Active state styling */
.router-link-active {
  background-color: rgba(59, 130, 246, 0.3) !important;
  color: rgb(147, 197, 253) !important;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .quick-nav-bar {
    transform: scale(0.9);
  }
}
</style>
