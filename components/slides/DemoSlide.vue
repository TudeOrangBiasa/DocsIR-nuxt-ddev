<template>
  <div class="min-h-[80vh] flex flex-col justify-center">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-5xl font-bold text-white mb-4">
          🎬 Live Demo
        </h1>
        <p class="text-xl text-gray-300">
          Linux Documentation Search Engine in Action
        </p>
      </div>

      <!-- Demo Scenarios -->
      <div class="space-y-8">
        
        <!-- Scenario 1: Basic Search -->
        <div class="bg-blue-900/20 rounded-lg p-6 border border-blue-500/30">
          <h3 class="text-2xl font-bold text-blue-400 mb-4">📝 Demo Scenario 1: Basic Linux Command Search</h3>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 class="font-semibold text-blue-300 mb-3">Search Query:</h4>
              <div class="bg-gray-900 rounded-lg p-4 mb-4">
                <div class="flex items-center space-x-3">
                  <span class="text-green-400">🔍</span>
                  <input 
                    type="text" 
                    v-model="demoQuery"
                    placeholder="Try typing: bash scripting tutorial"
                    class="bg-transparent text-white text-lg outline-none flex-1"
                  >
                </div>
              </div>
              
              <h4 class="font-semibold text-blue-300 mb-3">Expected Results:</h4>
              <div class="space-y-2 text-sm text-gray-300">
                <div class="bg-gray-800/50 rounded-lg p-3">
                  <p class="font-semibold text-green-300">1. bash_scripting_advanced.pdf</p>
                  <p class="text-xs">"Advanced bash scripting techniques for system administrators with practical examples..."</p>
                  <p class="text-xs text-blue-300">Score: 0.94 (high TF-IDF + Cosine)</p>
                </div>
                <div class="bg-gray-800/50 rounded-lg p-3">
                  <p class="font-semibold text-green-300">2. linux_shell_tutorial.pdf</p>
                  <p class="text-xs">"Complete shell scripting tutorial covering bash fundamentals..."</p>
                  <p class="text-xs text-blue-300">Score: 0.87 (good similarity)</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 class="font-semibold text-blue-300 mb-3">Algorithm Breakdown:</h4>
              <div class="space-y-3 text-sm text-gray-300">
                <div class="bg-gray-800/50 rounded-lg p-3">
                  <h5 class="font-semibold text-blue-200">Query Processing:</h5>
                  <p class="text-xs">["bash", "scripting", "tutorial"] → ["bash", "script", "tutori"] (stemmed)</p>
                </div>
                
                <div class="bg-gray-800/50 rounded-lg p-3">
                  <h5 class="font-semibold text-blue-200">TF-IDF Calculation:</h5>
                  <p class="text-xs">bash: TF=0.2, IDF=1.5 → 0.3</p>
                  <p class="text-xs">script: TF=0.3, IDF=2.1 → 0.63</p>
                  <p class="text-xs">tutori: TF=0.2, IDF=2.8 → 0.56</p>
                </div>
                
                <div class="bg-gray-800/50 rounded-lg p-3">
                  <h5 class="font-semibold text-blue-200">Cosine Similarity:</h5>
                  <p class="text-xs">Query vector · Doc vector = 0.89</p>
                  <p class="text-xs">Final score: 0.3×0.3 + 0.89×0.7 = 0.71</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Scenario 2: Length Comparison -->
        <div class="bg-green-900/20 rounded-lg p-6 border border-green-500/30">
          <h3 class="text-2xl font-bold text-green-400 mb-4">⚖️ Demo Scenario 2: Document Length Fairness</h3>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 class="font-semibold text-green-300 mb-3">Search Query: "systemctl service"</h4>
              
              <div class="space-y-3">
                <div class="bg-gray-800/50 rounded-lg p-3">
                  <h5 class="font-semibold text-yellow-300">Short Man Page (15 words):</h5>
                  <p class="text-xs text-gray-300">"systemctl start stop restart service daemon management linux"</p>
                  <div class="mt-2 text-xs">
                    <p>TF-IDF only: 0.85</p>
                    <p>With Cosine: 0.79</p>
                  </div>
                </div>
                
                <div class="bg-gray-800/50 rounded-lg p-3">
                  <h5 class="font-semibold text-yellow-300">Long Tutorial (150+ words):</h5>
                  <p class="text-xs text-gray-300">"Complete systemctl service management guide covering daemon control, service startup, shutdown procedures, troubleshooting failed services, unit file configuration..."</p>
                  <div class="mt-2 text-xs">
                    <p>TF-IDF only: 0.31</p>
                    <p>With Cosine: 0.74</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 class="font-semibold text-green-300 mb-3">Fair Comparison Results:</h4>
              <div class="space-y-3 text-sm text-gray-300">
                <div class="bg-green-900/30 rounded-lg p-3">
                  <h5 class="font-semibold text-green-200">✅ With Cosine Similarity:</h5>
                  <p class="text-xs">Short doc: 0.79 vs Long doc: 0.74</p>
                  <p class="text-xs">Fair comparison - both highly relevant!</p>
                </div>
                
                <div class="bg-red-900/30 rounded-lg p-3">
                  <h5 class="font-semibold text-red-200">❌ TF-IDF Only:</h5>
                  <p class="text-xs">Short doc: 0.85 vs Long doc: 0.31</p>
                  <p class="text-xs">Unfair bias toward shorter documents</p>
                </div>
                
                <div class="bg-blue-900/30 rounded-lg p-3">
                  <h5 class="font-semibold text-blue-200">💡 User Benefit:</h5>
                  <p class="text-xs">Gets both quick reference AND comprehensive guide in appropriate order</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Scenario 3: Fuzzy Search -->
        <div class="bg-orange-900/20 rounded-lg p-6 border border-orange-500/30">
          <h3 class="text-2xl font-bold text-orange-400 mb-4">🔍 Demo Scenario 3: Fuzzy Search (Typo Tolerance)</h3>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 class="font-semibold text-orange-300 mb-3">Query dengan Typo: "linuk tutori"</h4>
              <div class="space-y-3 text-sm text-gray-300">
                <div class="bg-red-900/30 rounded-lg p-3">
                  <h5 class="font-semibold text-red-200">❌ Tanpa Fuzzy Search:</h5>
                  <p class="text-xs">No results found - exact match required</p>
                </div>
                
                <div class="bg-green-900/30 rounded-lg p-3">
                  <h5 class="font-semibold text-green-200">✅ Dengan Fuzzy Search:</h5>
                  <div class="space-y-2">
                    <div class="bg-gray-800/50 rounded-lg p-2">
                      <p class="font-semibold text-green-300">1. linux_commands_guide.pdf</p>
                      <p class="text-xs">"Complete Linux tutorial for beginners..."</p>
                      <p class="text-xs text-green-300">Fuzzy: "linuk"→"linux" (distance:1, score:0.67)</p>
                    </div>
                    <div class="bg-gray-800/50 rounded-lg p-2">
                      <p class="font-semibold text-green-300">2. bash_scripting_tutorial.pdf</p>
                      <p class="text-xs">"Advanced tutorial for bash scripting..."</p>
                      <p class="text-xs text-green-300">Fuzzy: "tutori"→"tutorial" (distance:2, score:0.33)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 class="font-semibold text-orange-300 mb-3">Hybrid Scoring Breakdown:</h4>
              <div class="space-y-3 text-sm text-gray-300">
                <div class="bg-gray-800/50 rounded-lg p-3">
                  <h5 class="font-semibold text-orange-200">Scoring Components:</h5>
                  <p class="text-xs">• Exact TF-IDF: 0.0 (no exact match)</p>
                  <p class="text-xs">• Cosine Similarity: 0.0 (no common terms)</p>
                  <p class="text-xs">• Fuzzy Score: 0.67 (close match)</p>
                </div>
                
                <div class="bg-gray-800/50 rounded-lg p-3">
                  <h5 class="font-semibold text-orange-200">Final Calculation:</h5>
                  <p class="text-xs">Score = (0.0×0.5) + (0.0×0.3) + (0.67×0.2)</p>
                  <p class="text-xs">Final Score = 0.134</p>
                </div>
                
                <div class="bg-gray-800/50 rounded-lg p-3">
                  <h5 class="font-semibold text-orange-200">User Experience:</h5>
                  <p class="text-xs">✅ Results found despite typos</p>
                  <p class="text-xs">✅ Fuzzy matches clearly indicated</p>
                  <p class="text-xs">✅ User learns correct spelling</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Debug Information -->
        <div class="bg-purple-900/20 rounded-lg p-6 border border-purple-500/30">
          <h3 class="text-2xl font-bold text-purple-400 mb-4">🔧 Debug Information Mode</h3>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 class="font-semibold text-purple-300 mb-3">Debug Response Structure:</h4>
              <div class="bg-gray-900 rounded-lg p-4">
                <pre class="text-sm text-gray-300 overflow-x-auto"><code>{
  "results": [...],
  "queryInfo": {
    "originalQuery": "docker container management",
    "processedTerms": ["docker", "contain", "manag"],
    "totalDocuments": 245
  },
  "tfIdfDetails": {
    "docker": { "tf": 0.25, "idf": 1.8, "tfIdf": 0.45 },
    "contain": { "tf": 0.125, "idf": 2.1, "tfIdf": 0.26 },
    "manag": { "tf": 0.125, "idf": 1.9, "tfIdf": 0.24 }
  },
  "cosineSimilarity": 0.87,
  "finalScore": 0.74
}</code></pre>
              </div>
            </div>
            
            <div>
              <h4 class="font-semibold text-purple-300 mb-3">What Debug Mode Shows:</h4>
              <div class="space-y-3 text-sm text-gray-300">
                <div class="bg-gray-800/50 rounded-lg p-3">
                  <h5 class="font-semibold text-purple-200">Query Processing:</h5>
                  <p class="text-xs">Original → Tokenized → Stemmed → Processed</p>
                </div>
                
                <div class="bg-gray-800/50 rounded-lg p-3">
                  <h5 class="font-semibold text-purple-200">Term Importance:</h5>
                  <p class="text-xs">Which terms contribute most to final score</p>
                </div>
                
                <div class="bg-gray-800/50 rounded-lg p-3">
                  <h5 class="font-semibold text-purple-200">Algorithm Transparency:</h5>
                  <p class="text-xs">Exact mathematical calculations visible</p>
                </div>
                
                <div class="bg-gray-800/50 rounded-lg p-3">
                  <h5 class="font-semibold text-purple-200">Optimization Insights:</h5>
                  <p class="text-xs">Understand why certain docs rank higher</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Test Input for Debugging -->
        <div class="bg-red-900/20 rounded-lg p-6 border border-red-500/30 mb-8">
          <h3 class="text-2xl font-bold text-red-400 mb-4">🐛 Debug Test Input</h3>
          <p class="text-gray-300 mb-4">Test input untuk memastikan spasi bekerja:</p>
          <div class="bg-gray-900 rounded-lg p-4">
            <input 
              type="text" 
              v-model="testInput"
              placeholder="Type something with spaces here..."
              class="w-full bg-transparent text-white text-lg outline-none border border-gray-600 rounded px-4 py-2"
              @input="onTestInput"
              @keydown="onTestKeydown"
            >
          </div>
          <div class="mt-2 text-sm text-gray-400">
            Current value: "{{ testInput }}"
          </div>
          <div class="mt-2 text-sm text-gray-400">
            Last key pressed: {{ lastKey }}
          </div>
        </div>

        <!-- Live Demo Button -->
        <div class="text-center">
          <div class="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 border border-blue-500/50">
            <h3 class="text-2xl font-bold text-white mb-4">🚀 Ready for Live Demo!</h3>
            <p class="text-lg text-gray-200 mb-6">
              Switch ke main application untuk demonstrate search functionality
            </p>
            <NuxtLink 
              to="/" 
              class="inline-flex items-center space-x-3 bg-white text-purple-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
            >
              <span>🔍</span>
              <span>Open Search Engine</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Demo slide reactive data
const demoQuery = ref('bash scripting tutorial')
const testInput = ref('')
const lastKey = ref('')

// Debug event handlers
const onTestInput = (event) => {
  console.log('Input event:', event.target.value)
}

const onTestKeydown = (event) => {
  lastKey.value = event.key
  console.log('Keydown event:', event.key, 'Target:', event.target.tagName)
  
  // Don't prevent default for input
  if (event.key === ' ') {
    console.log('Space key detected in input')
  }
}
</script>
