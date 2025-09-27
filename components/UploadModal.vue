<script setup lang="ts">
import GlassSurface from './GlassSurface.vue'

interface Props {
  show: boolean
  selectedFiles: File[]
  isLoading: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  'close': []
  'upload': []
  'removeFile': [index: number]
  'update:selectedFiles': [files: File[]]
}>()

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    emit('update:selectedFiles', Array.from(target.files))
  } else {
    emit('update:selectedFiles', [])
  }
}
</script>

<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <!-- Backdrop -->
    <div 
      class="absolute inset-0 bg-black/50 backdrop-blur-sm" 
      @click="$emit('close')"
    ></div>
    
    <!-- Modal -->
    <ClientOnly>
      <GlassSurface
        width="100%"
        :height="'auto'"
        :border-radius="24"
        :background-opacity="0.15"
        :blur="16"
        class="relative max-w-xl w-full shadow-2xl"
      >
        <div class="p-8">
      <form @submit.prevent="$emit('upload')" class="space-y-6">
        <div>
          <h2 class="text-2xl font-bold text-white mb-2">Upload Documents</h2>
          <p class="text-white/80 mb-4">Select .txt or .pdf files to add to the index.</p>
          <input
            id="file-input"
            type="file"
            @change="handleFileChange"
            accept=".txt,.pdf"
            multiple
            class="block w-full text-sm text-white/90 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white/20 file:text-white hover:file:bg-white/30 transition-all"
          />
          
          <!-- Selected Files Preview -->
          <div v-if="selectedFiles.length > 0" class="mt-4">
            <h4 class="text-white/90 text-sm font-semibold mb-2">Selected Files ({{ selectedFiles.length }}):</h4>
            <div class="space-y-2 max-h-32 overflow-y-auto">
              <div 
                v-for="(file, index) in selectedFiles" 
                :key="index"
                class="flex items-center justify-between p-2 bg-white/10 rounded-lg"
              >
                <div class="flex items-center gap-2 flex-1 min-w-0">
                  <svg class="w-4 h-4 text-blue-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  <span class="text-white/80 text-xs truncate">{{ file.name }}</span>
                  <span class="text-white/60 text-xs flex-shrink-0">({{ Math.round(file.size / 1024) }}KB)</span>
                </div>
                <button 
                  @click="$emit('removeFile', index)"
                  class="p-1 text-red-300 hover:text-red-200 transition-colors flex-shrink-0"
                  type="button"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="flex gap-3">
          <ClientOnly>
            <GlassSurface
              width="100%"
              :height="48"
              :border-radius="24"
              :background-opacity="0.2"
              class="flex-1 hover:shadow-lg transition-all duration-300"
            >
              <button
                type="button"
                @click="$emit('close')"
                class="w-full h-full text-white font-medium"
              >
                Cancel
              </button>
            </GlassSurface>
            <template #fallback>
              <button
                type="button"
                @click="$emit('close')"
                class="flex-1 bg-white/20 backdrop-blur-md border border-white/30 text-white py-3 rounded-full hover:bg-white/30 transition-all duration-300"
              >
                Cancel
              </button>
            </template>
          </ClientOnly>
          
          <ClientOnly>
            <GlassSurface
              width="100%"
              :height="48"
              :border-radius="24"
              :background-opacity="0.3"
              :brightness="90"
              :class="[
                'flex-1 transition-all duration-300',
                isLoading || !selectedFiles.length 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:shadow-lg'
              ]"
            >
              <button
                type="submit"
                :disabled="isLoading || !selectedFiles.length"
                class="w-full h-full text-white font-semibold disabled:cursor-not-allowed"
              >
                {{ isLoading ? 'Uploading...' : selectedFiles.length > 1 ? `Upload ${selectedFiles.length} Files` : 'Upload' }}
              </button>
            </GlassSurface>
            <template #fallback>
              <button
                type="submit"
                :disabled="isLoading || !selectedFiles.length"
                class="flex-1 bg-blue-500/80 backdrop-blur-md border border-blue-400/30 text-white py-3 rounded-full hover:bg-blue-500/90 disabled:bg-white/10 disabled:cursor-not-allowed transition-all duration-300 font-semibold"
              >
                {{ isLoading ? 'Uploading...' : selectedFiles.length > 1 ? `Upload ${selectedFiles.length} Files` : 'Upload' }}
              </button>
            </template>
          </ClientOnly>
        </div>
      </form>
        </div>
      </GlassSurface>
      <template #fallback>
        <div class="relative bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8 max-w-md w-full shadow-2xl">
          <form @submit.prevent="$emit('upload')" class="space-y-6">
            <div>
              <h2 class="text-2xl font-bold text-white mb-2">Upload Documents</h2>
              <p class="text-white/80 mb-4">Select .txt or .pdf files to add to the index.</p>
              <input
                id="file-input"
                type="file"
                @change="handleFileChange"
                accept=".txt,.pdf"
                multiple
                class="block w-full text-sm text-white/90 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white/20 file:text-white hover:file:bg-white/30 transition-all"
              />
              <!-- Note: File preview and buttons would be duplicated here in real implementation -->
            </div>
          </form>
        </div>
      </template>
    </ClientOnly>
  </div>
</template>
