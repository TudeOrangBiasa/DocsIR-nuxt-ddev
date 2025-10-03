<template>
  <div class="min-h-[80vh] flex flex-col justify-center">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-5xl font-bold text-white mb-4">
          🏗️ System Architecture
        </h1>
        <p class="text-xl text-gray-300">
          End-to-End IR System untuk Linux Documentation
        </p>
      </div>

      <!-- Architecture Overview -->
      <div class="mb-8">
        <div class="bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-lg p-8 border border-purple-500/30">
          <h3 class="text-2xl font-bold text-purple-400 mb-6 text-center">🔄 Two-Phase Architecture</h3>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Phase 1: Upload -->
            <div class="bg-green-900/20 rounded-lg p-6 border border-green-500/30">
              <h4 class="text-xl font-bold text-green-400 mb-4">📥 Phase 1: Upload & Processing</h4>
              <div class="space-y-3">
                <div class="flex items-center space-x-3">
                  <span class="text-2xl">📄</span>
                  <div>
                    <p class="font-semibold text-green-300">PDF/TXT Upload</p>
                    <p class="text-sm text-gray-300">Linux man pages, tutorials, configs</p>
                  </div>
                </div>
                
                <div class="text-center text-gray-400">↓</div>
                
                <div class="flex items-center space-x-3">
                  <span class="text-2xl">🔍</span>
                  <div>
                    <p class="font-semibold text-green-300">Text Preprocessing</p>
                    <p class="text-sm text-gray-300">Tokenize, stopwords, stemming</p>
                  </div>
                </div>
                
                <div class="text-center text-gray-400">↓</div>
                
                <div class="flex items-center space-x-3">
                  <span class="text-2xl">💾</span>
                  <div>
                    <p class="font-semibold text-green-300">Database Storage</p>
                    <p class="text-sm text-gray-300">Raw + processed content</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Phase 2: Search -->
            <div class="bg-blue-900/20 rounded-lg p-6 border border-blue-500/30">
              <h4 class="text-xl font-bold text-blue-400 mb-4">🔍 Phase 2: Search & Ranking</h4>
              <div class="space-y-3">
                <div class="flex items-center space-x-3">
                  <span class="text-2xl">❓</span>
                  <div>
                    <p class="font-semibold text-blue-300">Query Processing</p>
                    <p class="text-sm text-gray-300">Same preprocessing pipeline</p>
                  </div>
                </div>
                
                <div class="text-center text-gray-400">↓</div>
                
                <div class="flex items-center space-x-3">
                  <span class="text-2xl">🧮</span>
                  <div>
                    <p class="font-semibold text-blue-300">TF-IDF + Cosine</p>
                    <p class="text-sm text-gray-300">Vector similarity calculation</p>
                  </div>
                </div>
                
                <div class="text-center text-gray-400">↓</div>
                
                <div class="flex items-center space-x-3">
                  <span class="text-2xl">📊</span>
                  <div>
                    <p class="font-semibold text-blue-300">Ranked Results</p>
                    <p class="text-sm text-gray-300">Top-20 most relevant docs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tech Stack -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        
        <!-- Frontend -->
        <div class="bg-orange-900/20 rounded-lg p-6 border border-orange-500/30">
          <h3 class="text-xl font-bold text-orange-400 mb-4">🎨 Frontend Architecture</h3>
          
          <div class="space-y-4">
            <div class="flex items-start space-x-3">
              <span class="text-orange-400 text-xl">⚡</span>
              <div>
                <h4 class="font-semibold text-orange-300">Nuxt 4 + Vue 3</h4>
                <p class="text-sm text-gray-300">SSR, TypeScript, Composition API</p>
              </div>
            </div>
            
            <div class="flex items-start space-x-3">
              <span class="text-orange-400 text-xl">🎨</span>
              <div>
                <h4 class="font-semibold text-orange-300">TailwindCSS</h4>
                <p class="text-sm text-gray-300">Utility-first styling, glassmorphism UI</p>
              </div>
            </div>
            
            <div class="flex items-start space-x-3">
              <span class="text-orange-400 text-xl">🔄</span>
              <div>
                <h4 class="font-semibold text-orange-300">Composables</h4>
                <p class="text-sm text-gray-300">useSearch, useAlert state management</p>
              </div>
            </div>
            
            <div class="bg-gray-800/50 rounded-lg p-3 mt-4">
              <p class="text-sm text-gray-300"><strong>Why:</strong> Fast development, type safety, modern UX for Linux documentation search</p>
            </div>
          </div>
        </div>

        <!-- Backend -->
        <div class="bg-teal-900/20 rounded-lg p-6 border border-teal-500/30">
          <h3 class="text-xl font-bold text-teal-400 mb-4">⚙️ Backend Architecture</h3>
          
          <div class="space-y-4">
            <div class="flex items-start space-x-3">
              <span class="text-teal-400 text-xl">🐘</span>
              <div>
                <h4 class="font-semibold text-teal-300">PostgreSQL + Prisma</h4>
                <p class="text-sm text-gray-300">Type-safe ORM, dual content storage</p>
              </div>
            </div>
            
            <div class="flex items-start space-x-3">
              <span class="text-teal-400 text-xl">🔧</span>
              <div>
                <h4 class="font-semibold text-teal-300">Natural.js</h4>
                <p class="text-sm text-gray-300">Text preprocessing, stemming</p>
              </div>
            </div>
            
            <div class="flex items-start space-x-3">
              <span class="text-teal-400 text-xl">📄</span>
              <div>
                <h4 class="font-semibold text-teal-300">PDF-Parse</h4>
                <p class="text-sm text-gray-300">Extract text from Linux documentation PDFs</p>
              </div>
            </div>
            
            <div class="bg-gray-800/50 rounded-lg p-3 mt-4">
              <p class="text-sm text-gray-300"><strong>Why:</strong> Optimized for IR operations, handles Linux docs efficiently</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Database Strategy -->
      <div class="bg-purple-900/20 rounded-lg p-6 border border-purple-500/30 mb-8">
        <h3 class="text-2xl font-bold text-purple-400 mb-4">💾 Database Strategy</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 class="font-semibold text-purple-300 mb-3">Dual Storage Approach:</h4>
            <div class="bg-gray-900 rounded-lg p-4">
              <pre class="text-sm text-gray-300 overflow-x-auto"><code>model Document {
  id          Int      @id @default(autoincrement())
  filename    String   // "bash_scripting_guide.pdf"
  content_raw String   // Original: "The bash shell..."
  content     String   // Processed: "bash shell script..."
  createdAt   DateTime @default(now())
}</code></pre>
            </div>
          </div>
          
          <div>
            <h4 class="font-semibold text-purple-300 mb-3">Why This Works:</h4>
            <div class="space-y-2 text-sm text-gray-300">
              <div class="flex items-start space-x-2">
                <span class="text-green-400">✓</span>
                <span><strong>Performance:</strong> Preprocessing once, search many times</span>
              </div>
              <div class="flex items-start space-x-2">
                <span class="text-green-400">✓</span>
                <span><strong>Display:</strong> Raw content untuk user-friendly results</span>
              </div>
              <div class="flex items-start space-x-2">
                <span class="text-green-400">✓</span>
                <span><strong>Consistency:</strong> Same preprocessing untuk semua docs</span>
              </div>
              <div class="flex items-start space-x-2">
                <span class="text-green-400">✓</span>
                <span><strong>Debug:</strong> Can compare original vs processed</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Performance Optimizations -->
      <div class="bg-gray-700/20 rounded-lg p-6 border border-gray-500/30">
        <h3 class="text-2xl font-bold text-gray-300 mb-4">🚀 Performance Optimizations</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="text-center">
            <div class="text-4xl mb-3">⚡</div>
            <h4 class="font-semibold text-blue-300 mb-2">Upload Time</h4>
            <div class="text-sm text-gray-300 space-y-1">
              <p>• Streaming file upload</p>
              <p>• Single preprocessing</p>
              <p>• Async processing</p>
            </div>
          </div>
          
          <div class="text-center">
            <div class="text-4xl mb-3">🔍</div>
            <h4 class="font-semibold text-green-300 mb-2">Search Time</h4>
            <div class="text-sm text-gray-300 space-y-1">
              <p>• Pre-computed vocabulary</p>
              <p>• Efficient vector operations</p>
              <p>• Result limiting (top-20)</p>
            </div>
          </div>
          
          <div class="text-center">
            <div class="text-4xl mb-3">💾</div>
            <h4 class="font-semibold text-purple-300 mb-2">Database</h4>
            <div class="text-sm text-gray-300 space-y-1">
              <p>• Selective queries</p>
              <p>• Connection pooling</p>
              <p>• Indexed searches</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// System architecture slide
</script>
