<template>
  <div class="min-h-[80vh] flex flex-col justify-center">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-5xl font-bold text-white mb-4">
          💾 Database Strategy for IR
        </h1>
        <p class="text-xl text-gray-300">
          Optimized Storage untuk Linux Documentation Search
        </p>
      </div>

      <!-- Schema Comparison -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        
        <!-- Bad Schema -->
        <div class="bg-red-900/20 rounded-lg p-6 border border-red-500/30">
          <h3 class="text-xl font-bold text-red-400 mb-4">❌ Naive Database Schema</h3>
          
          <div class="bg-gray-900 rounded-lg p-4 mb-4">
            <pre class="text-sm text-gray-300 overflow-x-auto"><code>-- Bad approach
CREATE TABLE documents (
    id INT PRIMARY KEY,
    filename VARCHAR(255),
    content TEXT  -- Only raw content
);

-- Problems during search:
SELECT * FROM documents 
WHERE content ILIKE '%bash scripting%';</code></pre>
          </div>
          
          <div class="space-y-2 text-sm text-gray-300">
            <div class="flex items-start space-x-2">
              <span class="text-red-400">×</span>
              <span>Must preprocess on every search (slow)</span>
            </div>
            <div class="flex items-start space-x-2">
              <span class="text-red-400">×</span>
              <span>No TF-IDF calculation possible</span>
            </div>
            <div class="flex items-start space-x-2">
              <span class="text-red-400">×</span>
              <span>Simple pattern matching only</span>
            </div>
            <div class="flex items-start space-x-2">
              <span class="text-red-400">×</span>
              <span>No optimization for IR operations</span>
            </div>
          </div>
        </div>

        <!-- Good Schema -->
        <div class="bg-green-900/20 rounded-lg p-6 border border-green-500/30">
          <h3 class="text-xl font-bold text-green-400 mb-4">✅ IR-Optimized Schema</h3>
          
          <div class="bg-gray-900 rounded-lg p-4 mb-4">
            <pre class="text-sm text-gray-300 overflow-x-auto"><code>-- Optimized for IR
model Document {
  id          Int      @id @default(autoincrement())
  filename    String   @db.VarChar(255)
  content_raw String   @db.Text     // For display
  content     String   @db.Text     // For search
  createdAt   DateTime @default(now())
  
  @@index([createdAt])
}</code></pre>
          </div>
          
          <div class="space-y-2 text-sm text-gray-300">
            <div class="flex items-start space-x-2">
              <span class="text-green-400">✓</span>
              <span>Preprocessing done once at upload</span>
            </div>
            <div class="flex items-start space-x-2">
              <span class="text-green-400">✓</span>
              <span>Fast TF-IDF calculation</span>
            </div>
            <div class="flex items-start space-x-2">
              <span class="text-green-400">✓</span>
              <span>Raw content preserved for display</span>
            </div>
            <div class="flex items-start space-x-2">
              <span class="text-green-400">✓</span>
              <span>Indexed for performance</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Data Flow -->
      <div class="bg-blue-900/20 rounded-lg p-6 border border-blue-500/30 mb-8">
        <h3 class="text-2xl font-bold text-blue-400 mb-4">🔄 Data Flow Strategy</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 class="font-semibold text-blue-300 mb-3">Upload Flow:</h4>
            <div class="space-y-3">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-sm font-bold">1</div>
                <span class="text-sm text-gray-300">Upload Linux documentation (PDF/TXT)</span>
              </div>
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <span class="text-sm text-gray-300">Parse content (pdf-parse for PDFs)</span>
              </div>
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-sm font-bold">3</div>
                <span class="text-sm text-gray-300">Apply preprocessing pipeline</span>
              </div>
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-sm font-bold">4</div>
                <span class="text-sm text-gray-300">Store both raw & processed</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 class="font-semibold text-blue-300 mb-3">Search Flow:</h4>
            <div class="space-y-3">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-sm font-bold">1</div>
                <span class="text-sm text-gray-300">Query preprocessing (same pipeline)</span>
              </div>
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <span class="text-sm text-gray-300">Fetch processed content from DB</span>
              </div>
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-sm font-bold">3</div>
                <span class="text-sm text-gray-300">Calculate TF-IDF + Cosine scores</span>
              </div>
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-sm font-bold">4</div>
                <span class="text-sm text-gray-300">Return ranked results with raw content</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Performance Optimizations -->
      <div class="bg-purple-900/20 rounded-lg p-6 border border-purple-500/30 mb-8">
        <h3 class="text-2xl font-bold text-purple-400 mb-4">🚀 Database Performance Optimizations</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 class="font-semibold text-purple-300 mb-3">Query Optimization:</h4>
            <div class="bg-gray-900 rounded-lg p-4">
              <pre class="text-sm text-gray-300 overflow-x-auto"><code>// Efficient query for search
const documents = await prisma.document.findMany({
  select: {
    id: true,
    filename: true,
    content: true,        // Processed for TF-IDF
    content_raw: true,    // Original for display
  },
  orderBy: { createdAt: 'desc' },
  take: 1000  // Limit for performance
});</code></pre>
            </div>
          </div>
          
          <div>
            <h4 class="font-semibold text-purple-300 mb-3">Memory Efficiency:</h4>
            <div class="space-y-2 text-sm text-gray-300">
              <div class="flex items-start space-x-2">
                <span class="text-purple-400">•</span>
                <span>Selective field fetching (tidak ambil semua columns)</span>
              </div>
              <div class="flex items-start space-x-2">
                <span class="text-purple-400">•</span>
                <span>Batch processing untuk large datasets</span>
              </div>
              <div class="flex items-start space-x-2">
                <span class="text-purple-400">•</span>
                <span>Connection pooling dengan Prisma</span>
              </div>
              <div class="flex items-start space-x-2">
                <span class="text-purple-400">•</span>
                <span>Result limiting (top-20 documents)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- PostgreSQL Advanced Features -->
      <div class="bg-orange-900/20 rounded-lg p-6 border border-orange-500/30">
        <h3 class="text-2xl font-bold text-orange-400 mb-4">🐘 PostgreSQL Advanced Features</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 class="font-semibold text-orange-300 mb-3">Future Enhancements:</h4>
            <div class="bg-gray-900 rounded-lg p-4">
              <pre class="text-sm text-gray-300 overflow-x-auto"><code>-- Full-text search indexing
CREATE INDEX idx_content_gin 
ON documents 
USING gin(to_tsvector('english', content));

-- Full-text search query
SELECT * FROM documents 
WHERE to_tsvector('english', content) 
@@ to_tsquery('english', 'bash & scripting');</code></pre>
            </div>
          </div>
          
          <div>
            <h4 class="font-semibold text-orange-300 mb-3">Benefits:</h4>
            <div class="space-y-2 text-sm text-gray-300">
              <div class="flex items-start space-x-2">
                <span class="text-orange-400">•</span>
                <span><strong>Built-in text search:</strong> PostgreSQL native capabilities</span>
              </div>
              <div class="flex items-start space-x-2">
                <span class="text-orange-400">•</span>
                <span><strong>GIN indexing:</strong> Fast text search operations</span>
              </div>
              <div class="flex items-start space-x-2">
                <span class="text-orange-400">•</span>
                <span><strong>Language support:</strong> English stemming built-in</span>
              </div>
              <div class="flex items-start space-x-2">
                <span class="text-orange-400">•</span>
                <span><strong>Hybrid approach:</strong> Can combine dengan custom TF-IDF</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Database strategy slide
</script>
