<template>
  <div class="min-h-[80vh] flex flex-col justify-center">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-5xl font-bold text-white mb-4">
          📐 Mengapa Cosine Similarity?
        </h1>
        <p class="text-xl text-gray-300">
          Mengatasi Bias Panjang Dokumen dalam Search Engine
        </p>
      </div>

      <!-- Problem Illustration -->
      <div class="mb-8">
        <div class="bg-red-900/20 rounded-lg p-6 border border-red-500/30">
          <h3 class="text-2xl font-bold text-red-400 mb-4">❌ Masalah: TF-IDF Bias terhadap Panjang Dokumen</h3>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div class="bg-gray-800/50 rounded-lg p-4">
              <h4 class="font-semibold text-red-300 mb-3">Query: "docker container management"</h4>
              <div class="space-y-3 text-sm text-gray-300">
                <div>
                  <p><strong>Dokumen Pendek (8 kata):</strong></p>
                  <p class="text-xs bg-gray-900/50 p-2 rounded">"docker run stop remove container management commands tutorial"</p>
                  <p>TF-IDF: docker(0.125×2.1) + container(0.125×1.8) + management(0.125×2.3) = 0.765</p>
                </div>
                
                <div>
                  <p><strong>Dokumen Panjang (32 kata):</strong></p>
                  <p class="text-xs bg-gray-900/50 p-2 rounded">"comprehensive docker tutorial covering container lifecycle management with run stop remove commands best practices deployment strategies monitoring logging security considerations performance optimization troubleshooting common issues advanced networking storage volumes orchestration kubernetes"</p>
                  <p>TF-IDF: docker(0.031×2.1) + container(0.031×1.8) + management(0.031×2.3) = 0.191</p>
                </div>
              </div>
              
              <div class="mt-4 p-3 bg-red-900/30 rounded">
                <p class="text-sm text-red-200">
                  <strong>Masalah:</strong> Dokumen pendek dapat skor 4x lebih tinggi padahal keduanya relevan!
                </p>
              </div>
            </div>
            
            <div class="flex items-center justify-center">
              <div class="text-6xl">😰</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Solution: Vector Space Model -->
      <div class="mb-8">
        <div class="bg-blue-900/20 rounded-lg p-6 border border-blue-500/30">
          <h3 class="text-2xl font-bold text-blue-400 mb-4">✅ Solusi: Vector Space Model</h3>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 class="font-semibold text-blue-300 mb-3">Konsep: Dokumen sebagai Vector</h4>
              <div class="bg-gray-900 rounded-lg p-4">
                <pre class="text-sm text-gray-300 overflow-x-auto"><code>// Vocabulary dari corpus project kita:
// [docker, container, management, run, stop, remove, tutorial]

Query Vector:
[0.4, 0.3, 0.3, 0, 0, 0, 0]  // docker, container, management

Dokumen Pendek Vector:  
[0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.25]

Dokumen Panjang Vector:
[0.031, 0.031, 0.031, 0.031, 0.031, 0.031, 0.031, ...]</code></pre>
              </div>
            </div>
            
            <div>
              <h4 class="font-semibold text-blue-300 mb-3">Sudut vs Magnitude</h4>
              <div class="space-y-3 text-sm text-gray-300">
                <p><strong>Euclidean Distance (Buruk):</strong></p>
                <p class="text-xs">Mengukur jarak antar titik → bias oleh ukuran vector</p>
                
                <p><strong>Cosine Similarity (Baik):</strong></p>
                <p class="text-xs">Mengukur sudut antar vector → fokus pada arah/konten</p>
                
                <div class="bg-green-900/30 rounded p-3 mt-3">
                  <p class="text-green-200"><strong>Insight Kunci:</strong> Distribusi konten yang sama = sudut yang mirip, tidak peduli panjang dokumen!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mathematical Formula -->
      <div class="mb-8">
        <div class="bg-purple-900/20 rounded-lg p-6 border border-purple-500/30">
          <h3 class="text-2xl font-bold text-purple-400 mb-6 text-center">🧮 Cosine Similarity Formula</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="text-center">
              <h4 class="font-semibold text-purple-300 mb-3">Dot Product</h4>
              <div class="bg-gray-900 rounded-lg p-4 mb-3">
                <code class="text-sm text-gray-300">A · B = Σ(Ai × Bi)</code>
              </div>
              <p class="text-sm text-gray-300">Mengukur keselarasan antar vector</p>
            </div>
            
            <div class="text-center">
              <h4 class="font-semibold text-purple-300 mb-3">Magnitude</h4>
              <div class="bg-gray-900 rounded-lg p-4 mb-3">
                <code class="text-sm text-gray-300">||A|| = √(Σ(Ai²))</code>
              </div>
              <p class="text-sm text-gray-300">Normalisasi panjang vector</p>
            </div>
            
            <div class="text-center">
              <h4 class="font-semibold text-purple-300 mb-3">Cosine</h4>
              <div class="bg-gray-900 rounded-lg p-4 mb-3">
                <code class="text-sm text-gray-300">cos(θ) = (A·B)/(||A||×||B||)</code>
              </div>
              <p class="text-sm text-gray-300">Sudut antar vector (0-1)</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Linux Documentation Benefit -->
      <div class="bg-green-900/20 rounded-lg p-6 border border-green-500/30">
        <h3 class="text-2xl font-bold text-green-400 mb-4">📚 Mengapa Cocok untuk Search Engine Kita?</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 class="font-semibold text-green-300 mb-3">Menangani Variasi Dokumen:</h4>
            <div class="space-y-3 text-sm text-gray-300">
              <div class="flex items-start space-x-3">
                <span class="text-green-400">📄</span>
                <div>
                  <p><strong>PDF singkat</strong> vs <strong>tutorial panjang</strong></p>
                  <p class="text-xs">Perbandingan adil berdasarkan kesamaan konten</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-3">
                <span class="text-green-400">🔧</span>
                <div>
                  <p><strong>Referensi command</strong> vs <strong>panduan lengkap</strong></p>
                  <p class="text-xs">Keduanya bisa di-rank dengan benar jika konten relevan</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-3">
                <span class="text-green-400">💡</span>
                <div>
                  <p><strong>Code snippet</strong> vs <strong>dokumentasi penuh</strong></p>
                  <p class="text-xs">Panjang tidak menentukan relevansi</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 class="font-semibold text-green-300 mb-3">Contoh Implementasi Nyata:</h4>
            <div class="bg-gray-800/50 rounded-lg p-4">
              <div class="text-sm text-gray-300 space-y-2">
                <p><strong>Query:</strong> "bash scripting tutorial"</p>
                <div class="space-y-2">
                  <div>
                    <p><strong>Referensi Singkat:</strong> "bash script command tutorial example"</p>
                    <p class="text-xs">TF-IDF: 0.65 | Cosine: 0.89</p>
                  </div>
                  <div>
                    <p><strong>Tutorial Lengkap:</strong> "comprehensive bash scripting tutorial covering variables loops functions error handling best practices debugging techniques advanced scripting patterns..."</p>
                    <p class="text-xs">TF-IDF: 0.23 | Cosine: 0.84</p>
                  </div>
                </div>
                <div class="bg-green-900/30 rounded p-2 mt-3">
                  <p class="text-xs text-green-200"><strong>Hasil:</strong> Keduanya mendapat skor cosine yang mirip (adil), referensi singkat sedikit lebih tinggi (lebih fokus)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Why cosine similarity slide
</script>
