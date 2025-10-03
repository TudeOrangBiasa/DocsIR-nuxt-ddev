<template>
  <div class="min-h-[80vh] flex flex-col justify-center">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-5xl font-bold text-white mb-4">
          💻 Implementasi Cosine Similarity
        </h1>
        <p class="text-xl text-gray-300">
          Langkah demi Langkah Implementasi Vector Similarity
        </p>
      </div>

      <!-- Implementation Steps -->
      <div class="space-y-8">
        
        <!-- Step 1: Vector Creation -->
        <div class="bg-blue-900/20 rounded-lg p-6 border border-blue-500/30">
          <h3 class="text-xl font-bold text-blue-400 mb-4">Langkah 1: Membuat TF-IDF Vectors</h3>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 class="font-semibold text-blue-300 mb-3">Bangun Vocabulary:</h4>
              <div class="bg-gray-900 rounded-lg p-4">
                <pre class="text-sm text-gray-300 overflow-x-auto"><code>// server/api/search.post.ts - Line 34
const buildVocabulary = (
  corpus: string[][]
): string[] => {
  const vocabularySet = new Set&lt;string&gt;();
  
  corpus.forEach(doc => {
    doc.forEach(term => 
      vocabularySet.add(term)
    );
  });
  
  return Array.from(vocabularySet);
};

// Contoh corpus dari database kita:
const corpus = [
  ["bash", "script", "tutori", "command"],
  ["docker", "contain", "deploy", "app"],  
  ["python", "program", "guid", "learn"]
];

const vocabulary = buildVocabulary(corpus);
// ["bash", "script", "tutori", "command", 
//  "docker", "contain", ...]</code></pre>
              </div>
            </div>
            <div>
              <h4 class="font-semibold text-blue-300 mb-3">Buat Vector Dokumen:</h4>
              <div class="bg-gray-900 rounded-lg p-4">
                <pre class="text-sm text-gray-300 overflow-x-auto"><code>// server/api/search.post.ts - Line 40
const createTFIDFVector = (
  documentTerms: string[], 
  vocabulary: string[], 
  corpus: string[][], 
  totalDocs: number
): number[] => {
  return vocabulary.map(term => {
    const tf = calculateTF(
      term, documentTerms
    );
    const idf = calculateIDF(
      term, corpus, totalDocs
    );
    return calculateTFIDF(tf, idf);
  });
};

// Query: ["bash", "script"]
const queryVector = createTFIDFVector(
  ["bash", "script"], 
  vocabulary, 
  corpus, 
  corpus.length
);
// [0.38, 0.42, 0, 0, 0, 0, ...]</code></pre>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 2: Mathematical Components -->
        <div class="bg-green-900/20 rounded-lg p-6 border border-green-500/30">
          <h3 class="text-xl font-bold text-green-400 mb-4">Langkah 2: Komponen Matematis</h3>
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div>
              <h4 class="font-semibold text-green-300 mb-3">Dot Product:</h4>
              <div class="bg-gray-900 rounded-lg p-4">
                <pre class="text-sm text-gray-300 overflow-x-auto"><code>// server/api/search.post.ts - Line 52
const dotProduct = (
  vectorA: number[], 
  vectorB: number[]
): number => {
  return vectorA.reduce((sum, a, i) => 
    sum + (a * vectorB[i]), 0
  );
};

// Contoh:
// Query = [0.38, 0.42, 0]
// Doc   = [0.2, 0.3, 0.1]  
// A·B = (0.38×0.2) + (0.42×0.3) + (0×0.1)
//     = 0.076 + 0.126 + 0 = 0.202</code></pre>
              </div>
            </div>
            
            <div>
              <h4 class="font-semibold text-green-300 mb-3">Magnitude:</h4>
              <div class="bg-gray-900 rounded-lg p-4">
                <pre class="text-sm text-gray-300 overflow-x-auto"><code>// server/api/search.post.ts - Line 57
const magnitude = (vector: number[]): number => {
  return Math.sqrt(
    vector.reduce((sum, val) => 
      sum + (val * val), 0
    )
  );
};

// Contoh:
// Query = [0.38, 0.42, 0]
// ||Query|| = √(0.38² + 0.42² + 0²)
//           = √(0.144 + 0.176 + 0)
//           = √0.32 = 0.566</code></pre>
              </div>
            </div>
            
            <div>
              <h4 class="font-semibold text-green-300 mb-3">Cosine Similarity:</h4>
              <div class="bg-gray-900 rounded-lg p-4">
                <pre class="text-sm text-gray-300 overflow-x-auto"><code>// server/api/search.post.ts - Line 62
const cosineSimilarity = (
  vectorA: number[], 
  vectorB: number[]
): number => {
  const dot = dotProduct(vectorA, vectorB);
  const magA = magnitude(vectorA);
  const magB = magnitude(vectorB);
  
  if (magA === 0 || magB === 0) return 0;
  return dot / (magA * magB);
};

// cos(θ) = 0.202 / (0.566 × 0.447)
//        = 0.202 / 0.253 = 0.798
// Sangat mirip!</code></pre>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 3: Hybrid Scoring -->
        <div class="bg-purple-900/20 rounded-lg p-6 border border-purple-500/30">
          <h3 class="text-xl font-bold text-purple-400 mb-4">Langkah 3: Hybrid TF-IDF + Cosine Scoring</h3>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 class="font-semibold text-purple-300 mb-3">Mengapa Gabungkan Keduanya?</h4>
              <div class="space-y-3 text-sm text-gray-300">
                <div class="bg-gray-800/50 rounded-lg p-3">
                  <p><strong>Kekuatan TF-IDF:</strong></p>
                  <p class="text-xs">Bagus untuk exact term matching dan pentingnya term</p>
                </div>
                <div class="bg-gray-800/50 rounded-lg p-3">
                  <p><strong>Kekuatan Cosine:</strong></p>
                  <p class="text-xs">Bagus untuk similarity dokumen dan normalisasi panjang</p>
                </div>
                <div class="bg-gray-800/50 rounded-lg p-3">
                  <p><strong>Digabung:</strong></p>
                  <p class="text-xs">Yang terbaik dari dua dunia - relevansi + similarity</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 class="font-semibold text-purple-300 mb-3">Implementasi di Project:</h4>
              <div class="bg-gray-900 rounded-lg p-4">
                <pre class="text-sm text-gray-300 overflow-x-auto"><code>// server/api/search.post.ts - Line 70-95
const calculateDocumentScore = (
  queryTerms, 
  documentTerms, 
  corpus, 
  totalDocs, 
  vocabulary, 
  queryVector
) => {
  let tfIdfScore = 0;
  const termDetails = {};
  
  // Hitung TF-IDF tradisional
  for (const queryTerm of queryTerms) {
    const tf = calculateTF(
      queryTerm, documentTerms
    );
    const idf = calculateIDF(
      queryTerm, corpus, totalDocs
    );
    const tfIdf = calculateTFIDF(tf, idf);
    
    termDetails[queryTerm] = { 
      tf, idf, tfIdf 
    };
    tfIdfScore += tfIdf;
  }
  
  // Buat vector dokumen dan hitung cosine
  const documentVector = createTFIDFVector(
    documentTerms, vocabulary, 
    corpus, totalDocs
  );
  const cosineSim = cosineSimilarity(
    queryVector, documentVector
  );
  
  // Bobot untuk search engine kita
  const cosineWeight = 0.7; // 70% similarity
  const tfIdfWeight = 0.3;  // 30% term importance
  
  const combinedScore = 
    (tfIdfScore * tfIdfWeight) + 
    (cosineSim * cosineWeight);
  
  return { 
    score: combinedScore, 
    details: termDetails, 
    cosineSim, 
    tfIdfScore
  };
};</code></pre>
              </div>
            </div>
          </div>
        </div>

        <!-- Linux Use Case Example -->
        <div class="bg-orange-900/20 rounded-lg p-6 border border-orange-500/30">
          <h3 class="text-xl font-bold text-orange-400 mb-4">🐧 Linux Documentation Example</h3>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 class="font-semibold text-orange-300 mb-3">Query: "nginx server configuration"</h4>
              <div class="space-y-3 text-sm text-gray-300">
                <div class="bg-gray-800/50 rounded-lg p-3">
                  <p><strong>Document A (Short):</strong></p>
                  <p class="text-xs">"nginx config server setup"</p>
                  <div class="text-xs mt-2 space-y-1">
                    <p>TF-IDF: 0.85 (high term density)</p>
                    <p>Cosine: 0.92 (very similar content)</p>
                    <p><strong>Hybrid: 0.9</strong></p>
                  </div>
                </div>
                
                <div class="bg-gray-800/50 rounded-lg p-3">
                  <p><strong>Document B (Long):</strong></p>
                  <p class="text-xs">"comprehensive nginx web server configuration guide with setup instructions SSL certificates load balancing and performance optimization..."</p>
                  <div class="text-xs mt-2 space-y-1">
                    <p>TF-IDF: 0.45 (lower term density)</p>
                    <p>Cosine: 0.88 (still very similar)</p>
                    <p><strong>Hybrid: 0.75</strong></p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 class="font-semibold text-orange-300 mb-3">Analysis & Benefits:</h4>
              <div class="space-y-3 text-sm text-gray-300">
                <div class="bg-green-900/30 rounded-lg p-3">
                  <p><strong>✅ Fair Comparison:</strong></p>
                  <p class="text-xs">Both documents get appropriate scores based on content relevance, not just length</p>
                </div>
                
                <div class="bg-blue-900/30 rounded-lg p-3">
                  <p><strong>🎯 Contextual Ranking:</strong></p>
                  <p class="text-xs">Short reference ranks slightly higher (more focused), but long guide still very relevant</p>
                </div>
                
                <div class="bg-purple-900/30 rounded-lg p-3">
                  <p><strong>🔍 User Benefit:</strong></p>
                  <p class="text-xs">User mendapat quick reference DAN 
                  comprehensive guide dalam urutan yang tepat</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Production Implementation -->
        <div class="bg-gray-700/20 rounded-lg p-6 border border-gray-500/30">
          <h3 class="text-xl font-bold text-gray-300 mb-4">🚀 Production Implementation</h3>
          <div class="bg-gray-900 rounded-lg p-4">
            <pre class="text-sm text-gray-300 overflow-x-auto"><code>// Implementasi lengkap di search API kita
const calculateDocumentScore = (
  queryTerms, documentTerms, corpus, 
  totalDocs, vocabulary, queryVector
) => {
  let tfIdfScore = 0;
  const termDetails = {};
  
  // Hitung TF-IDF tradisional
  for (const queryTerm of queryTerms) {
    const tf = calculateTF(queryTerm, documentTerms);
    const idf = calculateIDF(queryTerm, corpus, totalDocs);
    const tfIdf = calculateTFIDF(tf, idf);
    
    termDetails[queryTerm] = { tf, idf, tfIdf };
    tfIdfScore += tfIdf;
  }
  
  // Buat vector dokumen dan hitung cosine
  const documentVector = createTFIDFVector(
    documentTerms, vocabulary, corpus, totalDocs
  );
  const cosineSim = cosineSimilarity(
    queryVector, documentVector
  );
  
  // Hybrid scoring optimal untuk search engine
  const cosineWeight = 0.7; // Tekankan similarity
  const tfIdfWeight = 0.3;  // Tapi tetap term importance
  
  const combinedScore = (tfIdfScore * tfIdfWeight) + 
                       (cosineSim * cosineWeight);
  
  return { 
    score: combinedScore, 
    details: termDetails,
    cosineSim,
    tfIdfScore
  };
};</code></pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Cosine similarity implementation slide
</script>
