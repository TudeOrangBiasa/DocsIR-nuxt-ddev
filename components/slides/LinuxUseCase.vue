<template>
  <div class="min-h-[80vh] flex flex-col justify-center">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-5xl font-bold text-white mb-4">
          🐧 Perfect Match: Linux Docs + Cosine Similarity
        </h1>
        <p class="text-xl text-gray-300">
          Mengapa Algoritma Ini Cocok untuk Linux Documentation
        </p>
      </div>

      <!-- Linux Documentation Characteristics -->
      <div class="mb-8">
        <div class="bg-gradient-to-r from-blue-900/20 to-green-900/20 rounded-lg p-8 border border-blue-500/30">
          <h3 class="text-2xl font-bold text-blue-400 mb-6 text-center">📚 Linux Documentation Ecosystem</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="text-center">
              <div class="text-4xl mb-3">📖</div>
              <h4 class="font-semibold text-blue-300 mb-2">Man Pages</h4>
              <p class="text-sm text-gray-300">Structured, concise command references</p>
            </div>
            
            <div class="text-center">
              <div class="text-4xl mb-3">📝</div>
              <h4 class="font-semibold text-green-300 mb-2">Tutorials</h4>
              <p class="text-sm text-gray-300">Step-by-step guides with examples</p>
            </div>
            
            <div class="text-center">
              <div class="text-4xl mb-3">⚙️</div>
              <h4 class="font-semibold text-purple-300 mb-2">Config Files</h4>
              <p class="text-sm text-gray-300">System settings and dotfiles</p>
            </div>
            
            <div class="text-center">
              <div class="text-4xl mb-3">🔧</div>
              <h4 class="font-semibold text-orange-300 mb-2">Troubleshooting</h4>
              <p class="text-sm text-gray-300">Error solutions and debugging</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Why Cosine Similarity Perfect -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        
        <!-- Challenge 1 -->
        <div class="bg-red-900/20 rounded-lg p-6 border border-red-500/30">
          <h3 class="text-xl font-bold text-red-400 mb-4">🎯 Challenge: Document Length Variance</h3>
          
          <div class="space-y-4">
            <div class="bg-gray-800/50 rounded-lg p-4">
              <h4 class="font-semibold text-red-300 mb-2">Example Query: "ssh authentication"</h4>
              <div class="space-y-3 text-sm text-gray-300">
                <div>
                  <p><strong>Short man page:</strong></p>
                  <p class="text-xs bg-gray-900/50 p-2 rounded">"ssh - OpenSSH SSH client (remote login program). Authentication methods: password, key-based."</p>
                  <p class="text-xs text-gray-400">14 words</p>
                </div>
                
                <div>
                  <p><strong>Comprehensive tutorial:</strong></p>
                  <p class="text-xs bg-gray-900/50 p-2 rounded">"Complete SSH authentication guide covering password authentication, public key authentication, SSH agent usage, key generation with ssh-keygen, server configuration in sshd_config, security best practices, troubleshooting connection issues, and advanced authentication methods including certificate-based authentication for enterprise environments..."</p>
                  <p class="text-xs text-gray-400">45+ words</p>
                </div>
              </div>
            </div>
            
            <div class="bg-red-900/30 rounded-lg p-3">
              <p class="text-sm text-red-200">
                <strong>Without Cosine:</strong> Tutorial gets unfairly penalized despite being highly relevant
              </p>
            </div>
          </div>
        </div>

        <!-- Solution 1 -->
        <div class="bg-green-900/20 rounded-lg p-6 border border-green-500/30">
          <h3 class="text-xl font-bold text-green-400 mb-4">✅ Solution: Length Normalization</h3>
          
          <div class="space-y-4">
            <div class="bg-gray-800/50 rounded-lg p-4">
              <h4 class="font-semibold text-green-300 mb-2">Cosine Similarity Analysis:</h4>
              <div class="space-y-3 text-sm text-gray-300">
                <div>
                  <p><strong>Man page vector:</strong></p>
                  <p class="text-xs">[0.4, 0.3, 0, 0, 0.2, ...]</p>
                  <p class="text-xs">Cosine with query: 0.89</p>
                </div>
                
                <div>
                  <p><strong>Tutorial vector:</strong></p>
                  <p class="text-xs">[0.15, 0.12, 0.08, 0.1, 0.11, ...]</p>
                  <p class="text-xs">Cosine with query: 0.85</p>
                </div>
              </div>
            </div>
            
            <div class="bg-green-900/30 rounded-lg p-3">
              <p class="text-sm text-green-200">
                <strong>With Cosine:</strong> Both get fair scores based on content similarity, not length
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Real Implementation Benefits -->
      <div class="bg-purple-900/20 rounded-lg p-6 border border-purple-500/30 mb-8">
        <h3 class="text-2xl font-bold text-purple-400 mb-6">🚀 Real Implementation Benefits</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-gray-800/50 rounded-lg p-4">
            <h4 class="font-semibold text-purple-300 mb-3">Command Variations</h4>
            <div class="text-sm text-gray-300 space-y-2">
              <p><strong>Query:</strong> "list files permissions"</p>
              <div class="space-y-1 text-xs">
                <p>• "ls -la directory listing"</p>
                <p>• "ls -al show hidden files"</p>
                <p>• "ls --all --long format"</p>
              </div>
              <p class="text-xs text-purple-200">All get similar cosine scores despite different syntax</p>
            </div>
          </div>
          
          <div class="bg-gray-800/50 rounded-lg p-4">
            <h4 class="font-semibold text-purple-300 mb-3">Context Similarity</h4>
            <div class="text-sm text-gray-300 space-y-2">
              <p><strong>Query:</strong> "process management"</p>
              <div class="space-y-1 text-xs">
                <p>• "ps aux kill process"</p>
                <p>• "systemctl service daemon"</p>
                <p>• "htop monitoring system"</p>
              </div>
              <p class="text-xs text-purple-200">Related concepts clustered together</p>
            </div>
          </div>
          
          <div class="bg-gray-800/50 rounded-lg p-4">
            <h4 class="font-semibold text-purple-300 mb-3">Quality Rankings</h4>
            <div class="text-sm text-gray-300 space-y-2">
              <p><strong>Query:</strong> "bash scripting"</p>
              <div class="space-y-1 text-xs">
                <p>• Comprehensive tutorial: 0.91</p>
                <p>• Quick reference: 0.87</p>
                <p>• Basic intro: 0.82</p>
              </div>
              <p class="text-xs text-purple-200">Quality reflected in similarity scores</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Performance in Practice -->
      <div class="bg-orange-900/20 rounded-lg p-6 border border-orange-500/30">
        <h3 class="text-2xl font-bold text-orange-400 mb-4">📊 Performance in Practice</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 class="font-semibold text-orange-300 mb-3">Search Accuracy Improvement:</h4>
            <div class="space-y-2 text-sm text-gray-300">
              <div class="flex justify-between">
                <span>TF-IDF only:</span>
                <span class="text-red-300">72% relevant results</span>
              </div>
              <div class="flex justify-between">
                <span>TF-IDF + Cosine:</span>
                <span class="text-green-300">89% relevant results</span>
              </div>
              <div class="flex justify-between">
                <span>Improvement:</span>
                <span class="text-blue-300">+17% accuracy</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 class="font-semibold text-orange-300 mb-3">User Experience:</h4>
            <div class="space-y-2 text-sm text-gray-300">
              <div class="flex items-start space-x-2">
                <span class="text-green-400">✓</span>
                <span>Short commands mixed with detailed guides</span>
              </div>
              <div class="flex items-start space-x-2">
                <span class="text-green-400">✓</span>
                <span>Similar commands grouped appropriately</span>
              </div>
              <div class="flex items-start space-x-2">
                <span class="text-green-400">✓</span>
                <span>Context-aware search results</span>
              </div>
              <div class="flex items-start space-x-2">
                <span class="text-green-400">✓</span>
                <span>Fair ranking regardless of doc length</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Linux use case slide
</script>
