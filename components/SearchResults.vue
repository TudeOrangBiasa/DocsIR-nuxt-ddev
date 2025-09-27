<template>
  <div class="w-full max-w-4xl">
    <ClientOnly>
      <GlassSurface
        width="100%"
        :height="'auto'"
        :border-radius="32"
        :background-opacity="0.3"
        :brightness="60"
        :opacity="0.8"
        :saturation="1.8"
        class="shadow-2xl"
      >
        <div class="p-6 min-h-[200px]">
          
          <!-- Loading State -->
          <div v-if="isSearching" class="text-center py-12">
            <div class="inline-flex items-center gap-3">
              <svg class="animate-spin h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span class="text-white/80">Searching documents...</span>
            </div>
            <div v-if="debugMode" class="text-xs text-blue-200 mt-2">
              Using Vector Space Model (TF-IDF + Cosine Similarity)
            </div>
          </div>

          <!-- Empty State -->
          <div v-else-if="searchQuery && !searchResults.length" class="text-center text-white/70 py-12">
            <div class="mb-4">
              <svg class="w-16 h-16 mx-auto text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-white/80 mb-2">No documents found</h3>
            <p class="text-white/60">No results found for "{{ searchQuery }}"</p>
            <div v-if="debugMode" class="text-xs text-white/40 mt-3 p-2 bg-white/5 rounded">
              Using TF-IDF + Cosine Similarity for relevance ranking
            </div>
          </div>

          <!-- Search Results -->
          <div v-else-if="searchResults.length > 0">
            <!-- Debug Mode Info Header -->
            <div v-if="debugMode && searchResults.length > 0" class="mb-4 p-4 bg-gradient-to-r from-blue-500/20 to-green-500/20 rounded-lg border border-blue-400/30 backdrop-blur-sm">
              <div class="flex items-start gap-3">
                <div class="flex-shrink-0">
                  <svg class="w-5 h-5 text-blue-300 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <div class="text-sm font-semibold text-blue-200 mb-1">
                    🚀 Debug Mode Active - Vector Space Model Analysis
                  </div>
                  <div class="text-xs text-blue-300/90 leading-relaxed">
                    Showing detailed TF-IDF calculations, cosine similarity scores, and relevance ranking breakdown for each document.
                    <br>
                    <span class="text-green-300 font-medium">Final Score = 30% TF-IDF + 70% Cosine Similarity + Filename Boost</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="space-y-4 max-h-96 overflow-y-auto">
              <div 
                v-for="result in searchResults" 
                :key="result.id" 
                class="bg-white/20 backdrop-blur-sm rounded-lg border border-white/20 p-4 hover:bg-white/30 transition-all duration-300 cursor-pointer"
                @click="$emit('openDocument', result)"
              >
                <div class="flex justify-between items-start mb-2">
                  <h3 class="font-semibold text-white text-lg flex-1">{{ result.filename }}</h3>
                  <div class="flex items-center gap-2">
                    <div v-if="result.score" class="bg-blue-500/30 backdrop-blur-sm px-2 py-1 rounded-full">
                      <span class="text-xs text-blue-200 font-mono">{{ result.score.toFixed(3) }}</span>
                    </div>
                    <button 
                      @click.stop="$emit('deleteDocument', result.id, result.filename)"
                      class="p-1 bg-red-500/20 hover:bg-red-500/40 text-red-300 rounded transition-all duration-200"
                      title="Delete document"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                
                <p class="text-white/70 text-sm mt-1 overflow-hidden" style="display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2; -webkit-box-orient: vertical;">{{ (result.content_raw || result.content).substring(0, 150) }}...</p>
                
                <!-- Debug Mode: Show processed content -->
                <div v-if="debugMode" class="mt-2 p-2 bg-black/20 rounded border border-yellow-400/30">
                  <div class="text-xs text-yellow-200 mb-1">
                    <strong>🧮 Processed Content (for search indexing):</strong>
                  </div>
                  <p class="text-yellow-300/80 text-xs font-mono overflow-hidden" style="display: -webkit-box; -webkit-line-clamp: 3; line-clamp: 3; -webkit-box-orient: vertical;">{{ result.content.substring(0, 200) }}...</p>
                </div>
                
                <!-- TF-IDF Debug Details -->
                <div v-if="debugMode && result.tfIdfDetails" class="mt-3 p-3 bg-black/20 rounded border border-blue-400/30">
                  <div class="text-xs text-blue-200 mb-3">
                    <strong>🔬 Vector Space Model Analysis:</strong>
                  </div>
                  <div class="space-y-2 text-xs">
                    <div class="text-blue-300">
                      <strong>Query Terms:</strong> {{ result.tfIdfDetails.queryTerms.join(', ') }}
                    </div>
                    
                    <!-- TF-IDF Breakdown -->
                    <div class="space-y-1 mt-2">
                      <div class="text-yellow-200 font-semibold mb-1">📊 TF-IDF Breakdown:</div>
                      <div v-for="(details, term) in result.tfIdfDetails.termScores" :key="term" class="flex justify-between text-white/80 pl-2">
                        <span class="font-mono text-yellow-300">{{ term }}:</span>
                        <span class="font-mono">
                          TF={{ details.tf.toFixed(3) }} × IDF={{ details.idf.toFixed(3) }} = {{ details.tfIdf.toFixed(3) }}
                        </span>
                      </div>
                    </div>

                    <!-- Similarity Scores -->
                    <div class="border-t border-blue-400/20 pt-2 mt-3 space-y-1">
                      <div class="text-purple-200 font-semibold mb-1">🎯 Similarity Scores:</div>
                      <div class="grid grid-cols-2 gap-2 text-white/80 pl-2">
                        <div class="flex justify-between">
                          <span>TF-IDF Score:</span>
                          <span class="font-mono text-yellow-300">{{ result.tfIdfDetails.tfIdfScore.toFixed(3) }}</span>
                        </div>
                        <div class="flex justify-between">
                          <span>Cosine Sim:</span>
                          <span class="font-mono text-green-300">{{ result.tfIdfDetails.cosineSimilarity.toFixed(3) }}</span>
                        </div>
                      </div>
                    </div>

                    <!-- Final Score -->
                    <div class="border-t border-blue-400/20 pt-2 mt-2">
                      <div class="flex justify-between text-blue-200 font-semibold">
                        <span>🏆 Final Score:</span>
                        <span class="font-mono text-lg">{{ result.tfIdfDetails.totalScore.toFixed(3) }}</span>
                      </div>
                      <div class="text-xs text-white/60 mt-1 text-center">
                        (30% TF-IDF + 70% Cosine Similarity + Filename Boost)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </GlassSurface>
      <template #fallback>
        <div class="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl p-6">
          <div v-if="isSearching" class="text-center py-12">
            <div class="text-white/80">Searching...</div>
          </div>
          <div v-else-if="searchQuery && !searchResults.length" class="text-center text-white/70 py-12">
            No results found for "{{ searchQuery }}"
          </div>
          <div v-else-if="searchResults.length > 0" class="space-y-4">
            <div v-for="result in searchResults" :key="result.id" class="bg-white/20 rounded-lg p-4">
              <h3 class="font-semibold text-white">{{ result.filename }}</h3>
              <p class="text-white/70 text-sm">{{ (result.content_raw || result.content).substring(0, 150) }}...</p>
            </div>
          </div>
        </div>
      </template>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import GlassSurface from './GlassSurface.vue'

interface Document {
  id: number
  filename: string
  content: string
  content_raw?: string
  score?: number
  tfIdfDetails?: {
    queryTerms: string[]
    termScores: { [term: string]: { tf: number; idf: number; tfIdf: number } }
    totalScore: number
    cosineSimilarity: number
    tfIdfScore: number
    combinedScore: number
  }
}

interface Props {
  searchQuery: string
  searchResults: Document[]
  isSearching: boolean
  debugMode: boolean
}

defineProps<Props>()

defineEmits<{
  'openDocument': [document: Document]
  'deleteDocument': [id: number, filename: string]
}>()
</script>
