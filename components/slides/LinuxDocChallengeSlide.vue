<template>
  <div class="min-h-[80vh] flex flex-col justify-center">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-5xl font-bold text-white mb-4">
          🔧 Text Pre-processing: Langkah Pertama
        </h1>
        <p class="text-xl text-gray-300">
          Mempersiapkan teks untuk analisis yang lebih baik
        </p>
      </div>

      <!-- Text Pre-processing Steps -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        
        <!-- Left: Raw Text Problems -->
        <div class="bg-red-900/20 rounded-lg p-8 border border-red-500/30">
          <h3 class="text-2xl font-bold text-red-400 mb-6">
            ⚠️ Masalah dengan Raw Text
          </h3>
          
          <div class="space-y-4">
            <div class="bg-gray-800/50 rounded-lg p-4">
              <h4 class="font-semibold text-red-300 mb-2">Inconsistent Case</h4>
              <p class="text-sm text-gray-300 font-mono">
                "Machine", "MACHINE", "machine" → dianggap berbeda
              </p>
            </div>
            
            <div class="bg-gray-800/50 rounded-lg p-4">
              <h4 class="font-semibold text-red-300 mb-2">Punctuation Noise</h4>
              <p class="text-sm text-gray-300 font-mono">
                "Hello!" ≠ "Hello" → similarity terganggu
              </p>
            </div>
            
            <div class="bg-gray-800/50 rounded-lg p-4">
              <h4 class="font-semibold text-red-300 mb-2">Stop Words</h4>
              <p class="text-sm text-gray-300 font-mono">
                "the", "is", "and" → tidak bermakna tapi sering muncul
              </p>
            </div>
            
            <div class="bg-gray-800/50 rounded-lg p-4">
              <h4 class="font-semibold text-red-300 mb-2">Special Characters</h4>
              <p class="text-sm text-gray-300 font-mono">
                HTML tags, numbers, symbols → mengacaukan analisis
              </p>
            </div>
          </div>
        </div>

        <!-- Right: Pre-processing Solutions -->
        <div class="bg-green-900/20 rounded-lg p-8 border border-green-500/30">
          <h3 class="text-2xl font-bold text-green-400 mb-6">
            ✅ Solusi Pre-processing
          </h3>
          
          <div class="space-y-4">
            <div class="bg-gray-800/50 rounded-lg p-4">
              <h4 class="font-semibold text-green-300 mb-2">1. Lowercase Conversion</h4>
              <p class="text-sm text-gray-300 font-mono">
                "Machine Learning" → "machine learning"
              </p>
            </div>
            
            <div class="bg-gray-800/50 rounded-lg p-4">
              <h4 class="font-semibold text-green-300 mb-2">2. Remove Punctuation</h4>
              <p class="text-sm text-gray-300 font-mono">
                "Hello, World!" → "Hello World"
              </p>
            </div>
            
            <div class="bg-gray-800/50 rounded-lg p-4">
              <h4 class="font-semibold text-green-300 mb-2">3. Tokenization</h4>
              <p class="text-sm text-gray-300 font-mono">
                "machine learning" → ["machine", "learning"]
              </p>
            </div>
            
            <div class="bg-gray-800/50 rounded-lg p-4">
              <h4 class="font-semibold text-green-300 mb-2">4. Remove Stop Words</h4>
              <p class="text-sm text-gray-300 font-mono">
                ["the", "cat", "runs"] → ["cat", "runs"]
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Implementation in Code -->
      <div class="bg-blue-900/20 rounded-lg p-8 border border-blue-500/30">
        <h3 class="text-2xl font-bold text-blue-400 mb-6">
          💻 Implementasi dalam Project Kita
        </h3>
        
        <div class="bg-gray-900 rounded-lg p-6 font-mono text-sm">
          <pre class="text-green-400">
<span class="text-gray-400">// server/api/upload.post.ts - Line 31</span>
<span class="text-blue-400">const</span> <span class="text-yellow-400">preprocessText</span> = (<span class="text-orange-400">text: string</span>) => {
  <span class="text-gray-400">// 1. Tokenize dan lowercase menggunakan Natural.js</span>
  <span class="text-blue-400">let</span> <span class="text-orange-400">tokens</span> = <span class="text-yellow-400">tokenizer</span>.<span class="text-yellow-400">tokenize</span>(<span class="text-orange-400">text</span>.<span class="text-yellow-400">toLowerCase</span>());
  
  <span class="text-blue-400">const</span> <span class="text-orange-400">preprocessedTokens</span> = <span class="text-orange-400">tokens</span>
    <span class="text-gray-400">// 2. Hapus English dan Indonesian stopwords</span>
    .<span class="text-yellow-400">filter</span>(<span class="text-orange-400">token</span> => !<span class="text-orange-400">stopwords</span>.<span class="text-yellow-400">includes</span>(<span class="text-orange-400">token</span>) && 
             !<span class="text-orange-400">indonesianStopwords</span>.<span class="text-yellow-400">includes</span>(<span class="text-orange-400">token</span>))
    <span class="text-gray-400">// 3. Hanya huruf alfabetik</span>
    .<span class="text-yellow-400">filter</span>(<span class="text-orange-400">token</span> => <span class="text-orange-400">token</span>.<span class="text-yellow-400">match</span>(<span class="text-red-400">/^[a-zA-Z]+$/</span>))
    <span class="text-gray-400">// 4. Stemming dengan Porter Stemmer</span>
    .<span class="text-yellow-400">map</span>(<span class="text-orange-400">token</span> => <span class="text-yellow-400">PorterStemmer</span>.<span class="text-yellow-400">stem</span>(<span class="text-orange-400">token</span>));
  
  <span class="text-blue-400">return</span> <span class="text-orange-400">preprocessedTokens</span>.<span class="text-yellow-400">join</span>(<span class="text-green-300">' '</span>);
};
          </pre>
        </div>
      </div>

      <!-- Before vs After Example -->
      <div class="mt-8 bg-green-900/20 rounded-lg p-6 border border-green-500/30">
        <h4 class="text-lg font-bold text-green-400 mb-4">🔬 Contoh Nyata dari Project:</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-red-900/30 rounded-lg p-4">
            <h5 class="font-semibold text-red-300 mb-3">❌ Sebelum Pre-processing</h5>
            <div class="space-y-2 text-sm text-gray-300 font-mono">
              <p><strong>Raw Text dari PDF:</strong></p>
              <p class="bg-gray-800 p-2 rounded">"Bash Scripting Tutorial: The Complete Guide to Linux Commands!"</p>
              <p><strong>Masalah:</strong></p>
              <p class="bg-gray-800 p-2 rounded text-red-300">Case mixed, punctuation, stopwords</p>
            </div>
          </div>
          <div class="bg-green-900/30 rounded-lg p-4">
            <h5 class="font-semibold text-green-300 mb-3">✅ Setelah Pre-processing</h5>
            <div class="space-y-2 text-sm text-gray-300 font-mono">
              <p><strong>Processed Content:</strong></p>
              <p class="bg-gray-800 p-2 rounded">"bash script tutori complet guid linux command"</p>
              <p><strong>Keuntungan:</strong></p>
              <p class="bg-gray-800 p-2 rounded text-green-300">Normalized, stemmed, clean</p>
            </div>
          </div>
        </div>
        
        <div class="mt-4 bg-blue-900/30 rounded-lg p-4">
          <h5 class="font-semibold text-blue-300 mb-2">🎯 Manfaat dalam Search Engine:</h5>
          <div class="text-sm text-gray-300 space-y-1">
            <p>• <strong>Konsistensi:</strong> "Tutorial" dan "tutorial" menjadi sama</p>
            <p>• <strong>Fokus:</strong> Hilangkan "the", "to", "of" yang tidak bermakna</p>
            <p>• <strong>Stemming:</strong> "tutorial" dan "tutorials" menjadi "tutori"</p>
            <p>• <strong>Akurasi:</strong> TF-IDF dan Cosine Similarity lebih presisi</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Linux documentation challenge slide
</script>
