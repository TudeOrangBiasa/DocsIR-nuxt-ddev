<template>
  <div class="min-h-[80vh] flex flex-col justify-center">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-5xl font-bold text-white mb-4">
          🚨 Problem: Naive Search Fails
        </h1>
        <p class="text-xl text-gray-300">
          Mengapa Simple String Matching Tidak Cukup untuk Linux Documentation?
        </p>
      </div>

      <!-- Two Column Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        <!-- Left: Naive Approach -->
        <div class="bg-red-900/20 rounded-lg p-8 border border-red-500/30">
          <h3 class="text-2xl font-bold text-red-400 mb-6 flex items-center">
            ❌ Naive String Matching
          </h3>
          
          <div class="space-y-6">
            <!-- Code Example -->
            <div class="bg-gray-900 rounded-lg p-4">
              <pre class="text-sm text-gray-300 overflow-x-auto"><code>// SALAH: Simple substring search
const naiveSearch = (query, documents) => {
  return documents.filter(doc => 
    doc.content.toLowerCase()
      .includes(query.toLowerCase())
  );
};</code></pre>
            </div>
            
            <!-- Problems -->
            <div class="space-y-3">
              <h4 class="text-lg font-semibold text-red-300">Problems:</h4>
              <ul class="space-y-2 text-sm text-gray-300">
                <li class="flex items-start">
                  <span class="text-red-400 mr-2">•</span>
                  <span><strong>No ranking:</strong> "linux commands" sama 
                  penting dengan "linux"</span>
                </li>
                <li class="flex items-start">
                  <span class="text-red-400 mr-2">•</span>
                  <span><strong>Exact match only:</strong> "run" tidak 
                  match "running"</span>
                </li>
                <li class="flex items-start">
                  <span class="text-red-400 mr-2">•</span>
                  <span><strong>Common words bias:</strong> Document dengan 
                  "the, a, is" dianggap relevan</span>
                </li>
                <li class="flex items-start">
                  <span class="text-red-400 mr-2">•</span>
                  <span><strong>No context:</strong> Tidak bisa bedakan 
                  "shell script" vs "shell command"</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Right: IR Approach -->
        <div class="bg-green-900/20 rounded-lg p-8 border border-green-500/30">
          <h3 class="text-2xl font-bold text-green-400 mb-6 flex items-center">
            ✅ Information Retrieval Approach
          </h3>
          
          <div class="space-y-6">
            <!-- Code Example -->
            <div class="bg-gray-900 rounded-lg p-4">
              <pre class="text-sm text-gray-300 overflow-x-auto"><code>// BENAR: IR-based search dengan scoring
const irSearch = (query, documents) => {
  // 1. Preprocess query & documents
  // 2. Calculate TF-IDF scores  
  // 3. Measure document similarity
  // 4. Rank by relevance score
  // 5. Return top-k results
};</code></pre>
            </div>
            
            <!-- Solutions -->
            <div class="space-y-3">
              <h4 class="text-lg font-semibold text-green-300">Solutions:</h4>
              <ul class="space-y-2 text-sm text-gray-300">
                <li class="flex items-start">
                  <span class="text-green-400 mr-2">•</span>
                  <span><strong>Smart ranking:</strong> Relevance scoring 
                  dengan TF-IDF</span>
                </li>
                <li class="flex items-start">
                  <span class="text-green-400 mr-2">•</span>
                  <span><strong>Stemming:</strong> "running" → "run" untuk 
                  better matching</span>
                </li>
                <li class="flex items-start">
                  <span class="text-green-400 mr-2">•</span>
                  <span><strong>Stopword removal:</strong> Ignore common words 
                  yang tidak informatif</span>
                </li>
                <li class="flex items-start">
                  <span class="text-green-400 mr-2">•</span>
                  <span><strong>Context aware:</strong> Document similarity 
                  dengan cosine</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Example Scenario -->
      <div class="mt-12 bg-blue-900/20 rounded-lg p-8 border border-blue-500/30">
        <h3 class="text-xl font-bold text-blue-400 mb-4">🐧 Contoh: Linux Documentation Search</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div>
            <h4 class="font-semibold text-blue-300 mb-2">Query:</h4>
            <p class="text-gray-300">"bash scripting tutorial"</p>
          </div>
          <div>
            <h4 class="font-semibold text-blue-300 mb-2">Document A:</h4>
            <p class="text-gray-300">"Advanced bash scripting guide 
            with examples and tutorials for system administrators"</p>
          </div>
          <div>
            <h4 class="font-semibold text-blue-300 mb-2">Document B:</h4>
            <p class="text-gray-300">"The bash shell is the default shell 
            for most Linux distributions and tutorials"</p>
          </div>
        </div>
        <div class="mt-4 text-gray-400 text-sm">
          <p><strong>Naive search:</strong> Both documents match "bash" and 
          "tutorial" → Same relevance</p>
          <p><strong>IR search:</strong> Document A gets higher TF-IDF score 
          for "scripting" + "guide" + "examples"</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Problem slide logic
</script>
