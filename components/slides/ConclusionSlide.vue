<template>
  <div class="min-h-[80vh] flex flex-col justify-center">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-5xl font-bold text-white mb-4">
          🎯 Key Takeaways
        </h1>
        <p class="text-xl text-gray-300">
          Coding Information Retrieval from Scratch untuk Linux Documentation
        </p>
      </div>

      <!-- Main Achievements -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        
        <!-- What We Built -->
        <div class="bg-green-900/20 rounded-lg p-6 border border-green-500/30">
          <h3 class="text-2xl font-bold text-green-400 mb-4">✅ What We Accomplished</h3>
          
          <div class="space-y-4">
            <div class="flex items-start space-x-3">
              <span class="text-green-400 text-xl">🧮</span>
              <div>
                <h4 class="font-semibold text-green-300">TF-IDF from Scratch</h4>
                <p class="text-sm text-gray-300">Mathematical implementation solving term weighting problems</p>
              </div>
            </div>
            
            <div class="flex items-start space-x-3">
              <span class="text-green-400 text-xl">📐</span>
              <div>
                <h4 class="font-semibold text-green-300">Cosine Similarity</h4>
                <p class="text-sm text-gray-300">Vector space model solving document length bias</p>
              </div>
            </div>
            
            <div class="flex items-start space-x-3">
              <span class="text-green-400 text-xl">�</span>
              <div>
                <h4 class="font-semibold text-green-300">Fuzzy Search</h4>
                <p class="text-sm text-gray-300">Levenshtein distance handling typos and errors</p>
              </div>
            </div>
            
            <div class="flex items-start space-x-3">
              <span class="text-green-400 text-xl">�🔧</span>
              <div>
                <h4 class="font-semibold text-green-300">Complete Pipeline</h4>
                <p class="text-sm text-gray-300">Preprocessing → TF-IDF → Cosine → Fuzzy → Ranking</p>
              </div>
            </div>
            
            <div class="flex items-start space-x-3">
              <span class="text-green-400 text-xl">🐧</span>
              <div>
                <h4 class="font-semibold text-green-300">Linux-Optimized</h4>
                <p class="text-sm text-gray-300">Perfect for command docs, tutorials, man pages</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Why This Approach -->
        <div class="bg-blue-900/20 rounded-lg p-6 border border-blue-500/30">
          <h3 class="text-2xl font-bold text-blue-400 mb-4">🧠 Why This Approach Matters</h3>
          
          <div class="space-y-4">
            <div class="flex items-start space-x-3">
              <span class="text-blue-400 text-xl">💡</span>
              <div>
                <h4 class="font-semibold text-blue-300">Deep Understanding</h4>
                <p class="text-sm text-gray-300">Know exactly how each algorithm component works</p>
              </div>
            </div>
            
            <div class="flex items-start space-x-3">
              <span class="text-blue-400 text-xl">🎛️</span>
              <div>
                <h4 class="font-semibold text-blue-300">Full Control</h4>
                <p class="text-sm text-gray-300">Can optimize untuk specific Linux documentation needs</p>
              </div>
            </div>
            
            <div class="flex items-start space-x-3">
              <span class="text-blue-400 text-xl">🔍</span>
              <div>
                <h4 class="font-semibold text-blue-300">Debuggable</h4>
                <p class="text-sm text-gray-300">Understand why documents get certain relevance scores</p>
              </div>
            </div>
            
            <div class="flex items-start space-x-3">
              <span class="text-blue-400 text-xl">📈</span>
              <div>
                <h4 class="font-semibold text-blue-300">Extensible</h4>
                <p class="text-sm text-gray-300">Foundation untuk advanced IR techniques</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Algorithm Decision Summary -->
      <div class="bg-purple-900/20 rounded-lg p-6 border border-purple-500/30 mb-8">
        <h3 class="text-2xl font-bold text-purple-400 mb-4">🎯 Algorithm Decision Summary</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 class="font-semibold text-purple-300 mb-3">Why TF-IDF?</h4>
            <div class="space-y-2 text-sm text-gray-300">
              <div class="bg-gray-800/50 rounded-lg p-3">
                <p><strong>Problem:</strong> Common words dominated results</p>
                <p><strong>Solution:</strong> IDF weights rare terms higher</p>
              </div>
              <div class="bg-gray-800/50 rounded-lg p-3">
                <p><strong>Problem:</strong> Long docs unfairly advantaged</p>
                <p><strong>Solution:</strong> TF normalizes by length</p>
              </div>
            </div>
          </div>
          
          <div>
            <h4 class="font-semibold text-purple-300 mb-3">Why Cosine Similarity?</h4>
            <div class="space-y-2 text-sm text-gray-300">
              <div class="bg-gray-800/50 rounded-lg p-3">
                <p><strong>Problem:</strong> TF-IDF still length biased</p>
                <p><strong>Solution:</strong> Cosine measures angle</p>
              </div>
              <div class="bg-gray-800/50 rounded-lg p-3">
                <p><strong>Problem:</strong> Need semantic similarity</p>
                <p><strong>Solution:</strong> Vector space model</p>
              </div>
            </div>
          </div>
          
          <div>
            <h4 class="font-semibold text-purple-300 mb-3">Why Fuzzy Search?</h4>
            <div class="space-y-2 text-sm text-gray-300">
              <div class="bg-gray-800/50 rounded-lg p-3">
                <p><strong>Problem:</strong> Typos give 0 results</p>
                <p><strong>Solution:</strong> Levenshtein distance tolerance</p>
              </div>
              <div class="bg-gray-800/50 rounded-lg p-3">
                <p><strong>Problem:</strong> User frustration with errors</p>
                <p><strong>Solution:</strong> Fuzzy matching improves UX</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Linux Documentation Benefits -->
      <div class="bg-orange-900/20 rounded-lg p-6 border border-orange-500/30 mb-8">
        <h3 class="text-2xl font-bold text-orange-400 mb-4">🐧 Perfect Match: Linux Documentation</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="text-center">
            <div class="text-4xl mb-3">📏</div>
            <h4 class="font-semibold text-orange-300 mb-2">Length Variance</h4>
            <p class="text-sm text-gray-300">Short man pages vs long tutorials get fair comparison</p>
          </div>
          
          <div class="text-center">
            <div class="text-4xl mb-3">🔄</div>
            <h4 class="font-semibold text-orange-300 mb-2">Command Variations</h4>
            <p class="text-sm text-gray-300">"ls -la" vs "ls --all" treated as similar concepts</p>
          </div>
          
          <div class="text-center">
            <div class="text-4xl mb-3">🎯</div>
            <h4 class="font-semibold text-orange-300 mb-2">Context Awareness</h4>
            <p class="text-sm text-gray-300">Security vs administration contexts properly distinguished</p>
          </div>
          
          <div class="text-center">
            <div class="text-4xl mb-3">🔍</div>
            <h4 class="font-semibold text-orange-300 mb-2">Typo Tolerance</h4>
            <p class="text-sm text-gray-300">"linuk" finds "linux", "doker" finds "docker"</p>
          </div>
        </div>
      </div>

      <!-- Next Level -->
      <div class="bg-gradient-to-r from-pink-900/20 to-purple-900/20 rounded-lg p-8 border border-pink-500/30">
        <h3 class="text-2xl font-bold text-pink-400 mb-6 text-center">🚀 Next Level: Advanced IR</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div class="text-center">
            <div class="text-3xl mb-2">📊</div>
            <h4 class="font-semibold text-pink-300 mb-1">BM25</h4>
            <p class="text-xs text-gray-300">More sophisticated than TF-IDF</p>
          </div>
          
          <div class="text-center">
            <div class="text-3xl mb-2">🧠</div>
            <h4 class="font-semibold text-pink-300 mb-1">Word Embeddings</h4>
            <p class="text-xs text-gray-300">Semantic similarity with vectors</p>
          </div>
          
          <div class="text-center">
            <div class="text-3xl mb-2">📈</div>
            <h4 class="font-semibold text-pink-300 mb-1">Learning to Rank</h4>
            <p class="text-xs text-gray-300">ML-based ranking optimization</p>
          </div>
          
          <div class="text-center">
            <div class="text-3xl mb-2">⚡</div>
            <h4 class="font-semibold text-pink-300 mb-1">Elasticsearch</h4>
            <p class="text-xs text-gray-300">Production-scale search</p>
          </div>
        </div>
        
        <div class="text-center">
          <p class="text-lg text-pink-200">
            <strong>Foundation built!</strong> Ready untuk implement advanced IR techniques
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Conclusion slide
</script>
