<template>
  <div class="w-full max-w-2xl mb-8">
    <!-- Search Input with Glass Effect and Upload Button -->
    <div class="relative flex items-center gap-4">
      <!-- Upload Button (Left side) -->
      <ClientOnly>
        <GlassSurface
          :width="50"
          :height="50"
          :border-radius="25"
          :background-opacity="0.25"
          :brightness="60"
          :opacity="0.8"
          class="hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <button
            @click="$emit('open-upload')"
            class="w-full h-full flex items-center justify-center text-white"
            title="Upload Document"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
            </svg>
          </button>
        </GlassSurface>
        <template #fallback>
          <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
            </svg>
          </div>
        </template>
      </ClientOnly>
      
      <!-- Document Library Button (Next to Upload) -->
      <ClientOnly>
        <GlassSurface
          :width="50"
          :height="50"
          :border-radius="25"
          :background-opacity="0.25"
          :brightness="60"
          :opacity="0.8"
          class="hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <button
            @click="$emit('open-document-manager')"
            class="w-full h-full flex items-center justify-center text-white"
            title="Document Library"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
            </svg>
          </button>
        </GlassSurface>
        <template #fallback>
          <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
            </svg>
          </div>
        </template>
      </ClientOnly>
      
      <!-- Search Input -->
      <div class="flex-1">
        <ClientOnly>
          <GlassSurface
            width="100%"
            :height="60"
            :border-radius="30"
            :background-opacity="0.3"
            :brightness="60"
            :opacity="0.8"
            :saturation="1.8"
            class="shadow-2xl"
          >
            <div class="relative flex items-center w-full h-full px-6">
              <svg class="absolute left-6 w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              <input
                type="text"
                :value="searchQuery"
                @input="$emit('update:searchQuery', ($event.target as HTMLInputElement).value)"
                placeholder="Search documents..."
                class="w-full py-4 pl-12 pr-4 bg-transparent text-white placeholder-white/70 text-lg outline-none"
              />
            </div>
          </GlassSurface>
          <template #fallback>
            <div class="relative bg-white/20 rounded-full border border-white/30 shadow-2xl">
              <div class="relative flex items-center">
                <svg class="absolute left-4 w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                <input
                  type="text"
                  :value="searchQuery"
                  @input="$emit('update:searchQuery', ($event.target as HTMLInputElement).value)"
                  placeholder="Search documents..."
                  class="w-full py-4 pl-12 pr-4 bg-transparent text-white placeholder-white/70 text-lg outline-none"
                />
              </div>
            </div>
          </template>
        </ClientOnly>
      </div>

      <!-- Enhanced Debug Toggle Switch (Right side) -->
      <div class="flex-shrink-0">
        <ClientOnly>
          <GlassSurface
            :width="140"
            :height="50"
            :border-radius="25"
            :background-opacity="0.25"
            :brightness="60"
            :opacity="0.8"
            class="hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <button
              @click="$emit('update:debugMode', !debugMode)"
              class="w-full h-full flex items-center justify-center gap-3 px-4 py-2 text-white transition-all duration-300 active:scale-95"
              :title="debugMode ? 'Disable TF-IDF Debug Mode - Hide detailed analysis' : 'Enable TF-IDF Debug Mode - Show Vector Space Model details'"
            >
              <!-- Debug Icon -->
              <div class="relative">
                <svg 
                  class="w-5 h-5 text-white/70"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <!-- Active indicator dot -->
                <div 
                  v-if="debugMode" 
                  class="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"
                ></div>
              </div>
              
              <!-- Debug Text -->
              <div class="flex flex-col items-start">
                <span class="text-xs font-medium text-white/80 leading-tight">
                  Debug
                </span>
                <span 
                  class="text-xs transition-colors duration-300 leading-tight"
                  :class="debugMode ? 'text-green-400' : 'text-white/60'"
                >
                  {{ debugMode ? 'ON' : 'OFF' }}
                </span>
              </div>
            </button>
          </GlassSurface>
          <template #fallback>
            <div class="bg-white/20 rounded-full border border-white/30 p-3">
              <button
                @click="$emit('update:debugMode', !debugMode)"
                class="flex items-center gap-2 text-white"
                :title="debugMode ? 'Disable TF-IDF Debug Mode' : 'Enable TF-IDF Debug Mode'"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <span class="text-sm">{{ debugMode ? 'ON' : 'OFF' }}</span>
              </button>
            </div>
          </template>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import GlassSurface from './GlassSurface.vue'

interface Props {
  searchQuery: string
  debugMode: boolean
}

defineProps<Props>()

defineEmits<{
  'update:searchQuery': [value: string]
  'update:debugMode': [value: boolean]
  'open-upload': []
  'open-document-manager': []
}>()
</script>
