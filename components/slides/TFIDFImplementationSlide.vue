<template>
  <div class="min-h-[80vh] flex flex-col justify-center">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-5xl font-bold text-white mb-4">
          💻 Implementasi TF-IDF dalam Code
        </h1>
        <p class="text-xl text-gray-300">
          Langkah demi Langkah Implementasi untuk Search Engine Kita
        </p>
      </div>

      <!-- Implementation Steps -->
      <div class="space-y-8">
        
        <!-- Step 1: TF Calculation -->
        <div class="bg-blue-900/20 rounded-lg p-6 border border-blue-500/30">
          <h3 class="text-xl font-bold text-blue-400 mb-4">Langkah 1: Menghitung Term Frequency</h3>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 class="font-semibold text-blue-300 mb-3">Implementasi di Project Kita:</h4>
              <div class="bg-gray-900 rounded-lg p-4">
                <pre class="text-sm text-gray-300 overflow-x-auto"><code>// server/api/search.post.ts - Line 18
const calculateTF = (
  term: string, 
  document: string[]
): number => {
  const termCount = document.filter(
    t => t === term
  ).length;
  
  return termCount / document.length;
};

// Contoh penggunaan:
const dokumen = [
  "bash", "script", "command", 
  "tutorial", "bash"
];
const tf_bash = calculateTF("bash", dokumen);
// Hasil: 2/5 = 0.4</code></pre>
              </div>
            </div>
            <div>
              <h4 class="font-semibold text-blue-300 mb-3">Contoh dari Project:</h4>
              <div class="bg-gray-800/50 rounded-lg p-4">
                <div class="text-sm text-gray-300 space-y-2">
                  <p><strong>Dokumen Asli:</strong> "Bash scripting tutorial 
                  untuk command automation"</p>
                  <p><strong>Setelah Preprocessing:</strong> ["bash", "script", 
                  "tutori", "command", "automat"]</p>
                  <div class="mt-3 space-y-1">
                    <p>TF(bash) = 1/5 = 0.2</p>
                    <p>TF(script) = 1/5 = 0.2</p>
                    <p>TF(tutori) = 1/5 = 0.2</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 2: IDF Calculation -->
        <div class="bg-green-900/20 rounded-lg p-6 border border-green-500/30">
          <h3 class="text-xl font-bold text-green-400 mb-4">Langkah 2: Menghitung Inverse Document Frequency</h3>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 class="font-semibold text-green-300 mb-3">Implementasi di Project Kita:</h4>
              <div class="bg-gray-900 rounded-lg p-4">
                <pre class="text-sm text-gray-300 overflow-x-auto"><code>// server/api/search.post.ts - Line 24
const calculateIDF = (
  term: string, 
  corpus: string[][], 
  totalDocs: number
): number => {
  const docsContainingTerm = corpus.filter(
    doc => doc.includes(term)
  ).length;
  
  if (docsContainingTerm === 0) return 0;
  
  return Math.log(totalDocs / docsContainingTerm);
};

// Contoh corpus dari database:
const corpus = [
  ["docker", "container", "tutori"],
  ["bash", "script", "command"],
  ["docker", "instal", "guid"],
  ["python", "program", "tutori"]
];

// IDF untuk "docker" = log(4/2) = 0.69</code></pre>
              </div>
            </div>
            <div>
              <h4 class="font-semibold text-green-300 mb-3">Analisis Term dalam Project:</h4>
              <div class="bg-gray-800/50 rounded-lg p-4">
                <div class="text-sm text-gray-300 space-y-2">
                  <p><strong>Kata Umum (IDF Rendah):</strong></p>
                  <ul class="ml-4 space-y-1">
                    <li>• "tutori": muncul di 60% dokumen → IDF = 0.51</li>
                    <li>• "command": muncul di 70% dokumen → IDF = 0.36</li>
                  </ul>
                  <p><strong>Kata Spesifik (IDF Tinggi):</strong></p>
                  <ul class="ml-4 space-y-1">
                    <li>• "docker": muncul di 15% dokumen → IDF = 1.9</li>
                    <li>• "python": muncul di 10% dokumen → IDF = 2.3</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 3: TF-IDF Combination -->
        <div class="bg-purple-900/20 rounded-lg p-6 border border-purple-500/30">
          <h3 class="text-xl font-bold text-purple-400 mb-4">Langkah 3: Menggabungkan TF-IDF Scoring</h3>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 class="font-semibold text-purple-300 mb-3">Fungsi Lengkap di Project:</h4>
              <div class="bg-gray-900 rounded-lg p-4">
                <pre class="text-sm text-gray-300 overflow-x-auto"><code>// server/api/search.post.ts - Line 30
const calculateTFIDF = (tf: number, idf: number): number => {
  return tf * idf;
};

// Fungsi scoring dokumen - Line 68
const calculateDocumentScore = (
  queryTerms, documentTerms, 
  corpus, totalDocs
) => {
  let tfIdfScore = 0;
  const termDetails = {};
  
  for (const queryTerm of queryTerms) {
    const tf = calculateTF(queryTerm, documentTerms);
    const idf = calculateIDF(queryTerm, corpus, totalDocs);
    const tfIdf = calculateTFIDF(tf, idf);
    
    termDetails[queryTerm] = { tf, idf, tfIdf };
    tfIdfScore += tfIdf;
  }
  
  return { score: tfIdfScore, details: termDetails };
};</code></pre>
              </div>
            </div>
            <div>
              <h4 class="font-semibold text-purple-300 mb-3">Contoh Query dari Project:</h4>
              <div class="bg-gray-800/50 rounded-lg p-4">
                <div class="text-sm text-gray-300 space-y-3">
                  <p><strong>Query:</strong> "bash scripting"</p>
                  <p><strong>Processed Query:</strong> ["bash", "script"]</p>
                  <p><strong>Dokumen:</strong> "bash script tutori 
                  command automat"</p>
                  
                  <div class="bg-gray-900/50 rounded p-3 mt-3">
                    <p><strong>Perhitungan:</strong></p>
                    <p>• bash: TF=0.2, IDF=1.9 → TF-IDF=0.38</p>
                    <p>• script: TF=0.2, IDF=2.1 → TF-IDF=0.42</p>
                    <p><strong>Total Score: 0.80</strong></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Real Implementation in Project -->
        <div class="bg-orange-900/20 rounded-lg p-6 border border-orange-500/30">
          <h3 class="text-xl font-bold text-orange-400 mb-4">🚀 Implementasi Lengkap di Project</h3>
          <div class="bg-gray-900 rounded-lg p-4">
            <pre class="text-sm text-gray-300 overflow-x-auto"><code>// server/api/search.post.ts - Implementasi sesungguhnya
export default defineEventHandler(async (event) => {
  const { query, debugMode = false } = 
    await readBody(event);
  
  // 1. Tokenisasi query dengan preprocessing
  const queryTerms = tokenizeQuery(query);
  
  // 2. Ambil semua dokumen dari database
  const documents = await prisma.document.findMany({
    select: { 
      id: true, 
      filename: true, 
      content: true, 
      content_raw: true 
    }
  });
  
  // 3. Bangun corpus dari konten terproses
  const corpus = documents.map(doc => 
    doc.content.split(' ')
  );
  
  // 4. Hitung skor untuk setiap dokumen
  const searchResults = [];
  corpus.forEach((docTokens, docIndex) => {
    const { score, details } = calculateDocumentScore(
      queryTerms, docTokens, 
      corpus, documents.length
    );
    
    if (score > 0) {
      searchResults.push({
        document: documents[docIndex],
        score,
        details
      });
    }
  });
  
  return searchResults
    .sort((a, b) => b.score - a.score)
    .slice(0, 20);
});</code></pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// TF-IDF implementation slide
</script>
