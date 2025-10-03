<template>
  <div class="min-h-[80vh] flex flex-col justify-center">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-5xl font-bold text-white mb-4">
          🧮 Mengapa TF-IDF?
        </h1>
        <p class="text-xl text-gray-300">
          Mengatasi Masalah Pencarian dengan Term Frequency × Inverse Document Frequency
        </p>
      </div>

      <!-- Problem-Solution Flow -->
      <div class="space-y-8">
        
        <!-- Problem 1 -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div class="bg-red-900/20 rounded-lg p-6 border border-red-500/30">
            <h3 class="text-xl font-bold text-red-400 mb-4">❌ Problem 1: Common Words Noise</h3>
            <div class="bg-gray-900 rounded-lg p-4 mb-4">
              <pre class="text-sm text-gray-300 overflow-x-auto"><code>Linux Doc A: "The sudo command is used for administration"
Linux Doc B: "The grep command is used for searching"
Query: "sudo"

Frequency Count:
- "the" = appears in both docs
- "is", "used", "for" = appears in both docs  
- "sudo" = only in Doc A (relevant!)</code></pre>
            </div>
            <p class="text-sm text-gray-300">
              <strong>Masalah:</strong> Common words like "the", "is", "used" tidak membedakan relevance, padahal "sudo" adalah term yang penting.
            </p>
          </div>

          <div class="bg-green-900/20 rounded-lg p-6 border border-green-500/30">
            <h3 class="text-xl font-bold text-green-400 mb-4">✅ Solution: Inverse Document Frequency</h3>
            <div class="bg-gray-900 rounded-lg p-4 mb-4">
              <pre class="text-sm text-gray-300 overflow-x-auto"><code>IDF = log(total_documents / docs_containing_term)

"the": appears in 1000/1000 docs
IDF = log(1000/1000) = log(1) = 0.0

"sudo": appears in 50/1000 docs  
IDF = log(1000/50) = log(20) = 2.99</code></pre>
            </div>
            <p class="text-sm text-gray-300">
              <strong>Solusi:</strong> Rare terms seperti "sudo" mendapat weight tinggi, common words mendapat weight rendah.
            </p>
          </div>
        </div>

        <!-- Problem 2 -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div class="bg-red-900/20 rounded-lg p-6 border border-red-500/30">
            <h3 class="text-xl font-bold text-red-400 mb-4">❌ Problem 2: Document Length Bias</h3>
            <div class="bg-gray-900 rounded-lg p-4 mb-4">
              <pre class="text-sm text-gray-300 overflow-x-auto"><code>Doc A (short): "ssh login authentication" (3 words)
Doc B (long): "ssh server configuration guide with login authentication methods and security best practices" (13 words)

Query: "ssh authentication"

Raw count:
- Doc A: ssh(1) + authentication(1) = 2 matches  
- Doc B: ssh(1) + authentication(1) = 2 matches
- But Doc B seems "less relevant" per word</code></pre>
            </div>
            <p class="text-sm text-gray-300">
              <strong>Masalah:</strong> Long documents dapat unfair advantage dengan raw term counts.
            </p>
          </div>

          <div class="bg-green-900/20 rounded-lg p-6 border border-green-500/30">
            <h3 class="text-xl font-bold text-green-400 mb-4">✅ Solution: Term Frequency Normalization</h3>
            <div class="bg-gray-900 rounded-lg p-4 mb-4">
              <pre class="text-sm text-gray-300 overflow-x-auto"><code>TF = (term_count_in_doc) / (total_terms_in_doc)

Doc A: 
- TF(ssh) = 1/3 = 0.33
- TF(authentication) = 1/3 = 0.33

Doc B:
- TF(ssh) = 1/13 = 0.077  
- TF(authentication) = 1/13 = 0.077</code></pre>
            </div>
            <p class="text-sm text-gray-300">
              <strong>Solusi:</strong> Normalize berdasarkan document length untuk fair comparison.
            </p>
          </div>
        </div>

        <!-- TF-IDF Formula -->
        <div class="bg-blue-900/20 rounded-lg p-8 border border-blue-500/30">
          <h3 class="text-2xl font-bold text-blue-400 mb-6 text-center">🎯 TF-IDF: Perfect Combination</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <h4 class="text-lg font-semibold text-blue-300 mb-3">Term Frequency (TF)</h4>
              <div class="bg-gray-900 rounded-lg p-4 mb-3">
                <code class="text-sm text-gray-300">TF = count / total_terms</code>
              </div>
              <p class="text-sm text-gray-300">How important is term to THIS document?</p>
            </div>
            
            <div>
              <h4 class="text-lg font-semibold text-blue-300 mb-3">Inverse Document Frequency (IDF)</h4>
              <div class="bg-gray-900 rounded-lg p-4 mb-3">
                <code class="text-sm text-gray-300">IDF = log(N / df)</code>
              </div>
              <p class="text-sm text-gray-300">How unique is term across ALL documents?</p>
            </div>
            
            <div>
              <h4 class="text-lg font-semibold text-blue-300 mb-3">TF-IDF Score</h4>
              <div class="bg-gray-900 rounded-lg p-4 mb-3">
                <code class="text-sm text-gray-300">TF-IDF = TF × IDF</code>
              </div>
              <p class="text-sm text-gray-300">Perfect balance: local relevance + global uniqueness</p>
            </div>
          </div>
        </div>

        <!-- Linux Example -->
        <div class="bg-purple-900/20 rounded-lg p-6 border border-purple-500/30">
          <h3 class="text-xl font-bold text-purple-400 mb-4">🐧 Linux Documentation Example</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 class="font-semibold text-purple-300 mb-2">Query: "bash scripting"</h4>
              <div class="space-y-2 text-gray-300">
                <p><strong>Doc A:</strong> "Advanced bash scripting techniques for system administrators"</p>
                <p><strong>Doc B:</strong> "The bash shell is the default shell for Linux systems"</p>
              </div>
            </div>
            <div>
              <h4 class="font-semibold text-purple-300 mb-2">TF-IDF Analysis:</h4>
              <div class="space-y-2 text-gray-300">
                <p><strong>"bash":</strong> High TF in both, moderate IDF (common in Linux docs)</p>
                <p><strong>"scripting":</strong> High TF in Doc A, high IDF (specific skill)</p>
                <p><strong>Result:</strong> Doc A gets higher score for "scripting" specificity</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Why TF-IDF slide
</script>
