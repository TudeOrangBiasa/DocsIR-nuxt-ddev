<template>
  <div class="min-h-[80vh] flex flex-col justify-center">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-5xl font-bold text-white mb-4">
          🔍 Fuzzy Search Implementation
        </h1>
        <p class="text-xl text-gray-300">
          Mengatasi Typo dan Kesalahan Ketik dengan Levenshtein Distance
        </p>
      </div>

      <!-- Problem with Exact Match -->
      <div class="mb-8">
        <div class="bg-red-900/20 rounded-lg p-6 border border-red-500/30">
          <h3 class="text-2xl font-bold text-red-400 mb-4">❌ Masalah dengan Exact Match</h3>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div class="bg-gray-800/50 rounded-lg p-4">
              <h4 class="font-semibold text-red-300 mb-3">Contoh Masalah:</h4>
              <div class="space-y-3 text-sm text-gray-300">
                <div>
                  <p><strong>User mencari:</strong> "linuk" (typo dari "linux")</p>
                  <p><strong>Dokumen berisi:</strong> "linux tutorial commands"</p>
                  <p><strong>Hasil TF-IDF:</strong> 0.0 (tidak match)</p>
                </div>
                
                <div>
                  <p><strong>User mencari:</strong> "doker" (typo dari "docker")</p>
                  <p><strong>Dokumen berisi:</strong> "docker container setup"</p>
                  <p><strong>Hasil TF-IDF:</strong> 0.0 (tidak match)</p>
                </div>
                
                <div>
                  <p><strong>User mencari:</strong> "bashh" (extra h)</p>
                  <p><strong>Dokumen berisi:</strong> "bash scripting guide"</p>
                  <p><strong>Hasil TF-IDF:</strong> 0.0 (tidak match)</p>
                </div>
              </div>
            </div>
            
            <div class="flex items-center justify-center">
              <div class="text-6xl">😞</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Solution: Fuzzy Matching -->
      <div class="mb-8">
        <div class="bg-green-900/20 rounded-lg p-6 border border-green-500/30">
          <h3 class="text-2xl font-bold text-green-400 mb-4">✅ Solusi: Fuzzy Matching dengan Levenshtein Distance</h3>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 class="font-semibold text-green-300 mb-3">Konsep Levenshtein Distance:</h4>
              <div class="bg-gray-900 rounded-lg p-4">
                <pre class="text-sm text-gray-300 overflow-x-auto"><code>// Mengukur berapa operasi edit yang dibutuhkan
// untuk mengubah satu string menjadi string lain

"linuk" → "linux"
1. linuk → linuux (insert 'u')
2. linuux → linuix (replace 'u' with 'i') 
3. linuix → linux (replace 'i' with 'x')

Levenshtein Distance = 3</code></pre>
              </div>
            </div>
            
            <div>
              <h4 class="font-semibold text-green-300 mb-3">Implementasi di Project:</h4>
              <div class="bg-gray-900 rounded-lg p-4">
                <pre class="text-sm text-gray-300 overflow-x-auto"><code>// server/api/search.post.ts - Fuzzy matching
const levenshteinDistance = (
  str1: string, 
  str2: string
): number => {
  const matrix = [];
  
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  
  return matrix[str2.length][str1.length];
};</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Fuzzy Threshold Configuration -->
      <div class="mb-8">
        <div class="bg-blue-900/20 rounded-lg p-6 border border-blue-500/30">
          <h3 class="text-2xl font-bold text-blue-400 mb-4">🎯 Fuzzy Threshold & Scoring</h3>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 class="font-semibold text-blue-300 mb-3">Threshold Strategy:</h4>
              <div class="bg-gray-800/50 rounded-lg p-4">
                <div class="text-sm text-gray-300 space-y-2">
                  <p><strong>Fuzzy Threshold = 2</strong></p>
                  <ul class="ml-4 space-y-1">
                    <li>• Distance ≤ 2: Dianggap match</li>
                    <li>• Distance > 2: Diabaikan</li>
                  </ul>
                  
                  <p class="mt-3"><strong>Contoh:</strong></p>
                  <ul class="ml-4 space-y-1">
                    <li>• "linux" vs "linuk" = 1 ✅</li>
                    <li>• "docker" vs "doker" = 1 ✅</li>
                    <li>• "bash" vs "bashh" = 1 ✅</li>
                    <li>• "python" vs "java" = 6 ❌</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div>
              <h4 class="font-semibold text-blue-300 mb-3">Fuzzy Score Calculation:</h4>
              <div class="bg-gray-900 rounded-lg p-4">
                <pre class="text-sm text-gray-300 overflow-x-auto"><code>// Fuzzy score menurun berdasarkan distance
const calculateFuzzyScore = (
  distance: number, 
  threshold: number
): number => {
  if (distance > threshold) return 0;
  
  // Perfect match = 1.0
  // Distance 1 = 0.75
  // Distance 2 = 0.5
  return 1 - (distance / (threshold + 1));
};

// Contoh:
// "linux" vs "linux" = 1.0 (exact)
// "linux" vs "linuk" = 0.67 (distance 1)
// "linux" vs "linus" = 0.33 (distance 2)</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Hybrid Scoring System -->
      <div class="bg-purple-900/20 rounded-lg p-6 border border-purple-500/30">
        <h3 class="text-2xl font-bold text-purple-400 mb-4">🔗 Hybrid TF-IDF + Cosine + Fuzzy Scoring</h3>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 class="font-semibold text-purple-300 mb-3">Final Scoring Formula:</h4>
            <div class="bg-gray-900 rounded-lg p-4">
              <pre class="text-sm text-gray-300 overflow-x-auto"><code>// Bobot kombinasi untuk search engine kita
const exactWeight = 0.5;    // 50% exact match
const cosineWeight = 0.3;   // 30% similarity
const fuzzyWeight = 0.2;    // 20% fuzzy match

const finalScore = 
  (exactTfIdf * exactWeight) + 
  (cosineSim * cosineWeight) + 
  (fuzzyScore * fuzzyWeight);

// Contoh hasil:
// Query: "linuk" → Document: "linux tutorial"
// - Exact TF-IDF: 0.0 (no match)
// - Cosine Sim: 0.0 (no common terms)
// - Fuzzy Score: 0.67 ("linuk"→"linux")
// Final: 0.0*0.5 + 0.0*0.3 + 0.67*0.2 = 0.134</code></pre>
            </div>
          </div>
          
          <div>
            <h4 class="font-semibold text-purple-300 mb-3">User Experience Benefits:</h4>
            <div class="space-y-3 text-sm text-gray-300">
              <div class="bg-gray-800/50 rounded-lg p-3">
                <p><strong>🎯 Toleransi Typo:</strong></p>
                <p class="text-xs">User tidak perlu mengetik dengan sempurna</p>
              </div>
              
              <div class="bg-gray-800/50 rounded-lg p-3">
                <p><strong>📱 Mobile Friendly:</strong></p>
                <p class="text-xs">Keyboard mobile sering menyebabkan typo</p>
              </div>
              
              <div class="bg-gray-800/50 rounded-lg p-3">
                <p><strong>🌍 Non-native Speakers:</strong></p>
                <p class="text-xs">Membantu user yang tidak familiar dengan istilah teknis</p>
              </div>
              
              <div class="bg-gray-800/50 rounded-lg p-3">
                <p><strong>🚀 Better UX:</strong></p>
                <p class="text-xs">Tetap menampilkan hasil meskipun ada kesalahan ketik</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Fuzzy search implementation slide
</script>
