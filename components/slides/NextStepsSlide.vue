<template>
  <div class="min-h-[80vh] flex flex-col justify-center">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-5xl font-bold text-white mb-4">
          🚀 Next Steps & Future Work
        </h1>
        <p class="text-xl text-gray-300">
          Scaling the Linux Documentation Search Engine
        </p>
      </div>

      <!-- Immediate Next Steps -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div class="bg-blue-900/20 rounded-lg p-6 border border-blue-500/30">
          <h3 class="text-2xl font-bold text-blue-400 mb-4">🎯 Immediate Goals (1-2 months)</h3>
          
          <div class="space-y-4">
            <div class="flex items-start space-x-3">
              <span class="text-green-400 text-xl">✅</span>
              <div>
                <h4 class="font-semibold text-blue-300">Performance Optimization</h4>
                <p class="text-sm text-gray-300">Add caching layer, optimize database queries</p>
              </div>
            </div>
            
            <div class="flex items-start space-x-3">
              <span class="text-yellow-400 text-xl">🔄</span>
              <div>
                <h4 class="font-semibold text-blue-300">Batch Processing</h4>
                <p class="text-sm text-gray-300">Handle multiple document uploads efficiently</p>
              </div>
            </div>
            
            <div class="flex items-start space-x-3">
              <span class="text-purple-400 text-xl">📊</span>
              <div>
                <h4 class="font-semibold text-blue-300">Analytics Dashboard</h4>
                <p class="text-sm text-gray-300">Search patterns, popular docs, performance metrics</p>
              </div>
            </div>
            
            <div class="flex items-start space-x-3">
              <span class="text-red-400 text-xl">🔍</span>
              <div>
                <h4 class="font-semibold text-blue-300">Advanced Search Features</h4>
                <p class="text-sm text-gray-300">Filters, date ranges, document types</p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-green-900/20 rounded-lg p-6 border border-green-500/30">
          <h3 class="text-2xl font-bold text-green-400 mb-4">🔬 Research Areas (3-6 months)</h3>
          
          <div class="space-y-4">
            <div class="flex items-start space-x-3">
              <span class="text-blue-400 text-xl">🧠</span>
              <div>
                <h4 class="font-semibold text-green-300">Semantic Search</h4>
                <p class="text-sm text-gray-300">BERT embeddings for meaning-based search</p>
              </div>
            </div>
            
            <div class="flex items-start space-x-3">
              <span class="text-purple-400 text-xl">🎯</span>
              <div>
                <h4 class="font-semibold text-green-300">Query Understanding</h4>
                <p class="text-sm text-gray-300">Intent recognition, auto-complete, typo correction</p>
              </div>
            </div>
            
            <div class="flex items-start space-x-3">
              <span class="text-orange-400 text-xl">📈</span>
              <div>
                <h4 class="font-semibold text-green-300">Learning to Rank</h4>
                <p class="text-sm text-gray-300">Machine learning for personalized results</p>
              </div>
            </div>
            
            <div class="flex items-start space-x-3">
              <span class="text-cyan-400 text-xl">🌐</span>
              <div>
                <h4 class="font-semibold text-green-300">Multi-modal Search</h4>
                <p class="text-sm text-gray-300">Code snippets, diagrams, screenshots</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Technical Challenges -->
      <div class="bg-purple-900/20 rounded-lg p-6 border border-purple-500/30 mb-8">
        <h3 class="text-2xl font-bold text-purple-400 mb-6">⚡ Technical Challenges to Solve</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-gray-800/50 rounded-lg p-4">
            <h4 class="font-semibold text-purple-300 mb-3">🔄 Real-time Updates</h4>
            <p class="text-sm text-gray-300 mb-3">Challenge: Updating TF-IDF when docs change</p>
            <p class="text-xs text-blue-200">Solution: Incremental updates, delta calculations</p>
          </div>
          
          <div class="bg-gray-800/50 rounded-lg p-4">
            <h4 class="font-semibold text-purple-300 mb-3">📊 Scale Issues</h4>
            <p class="text-sm text-gray-300 mb-3">Challenge: Performance with 10,000+ docs</p>
            <p class="text-xs text-blue-200">Solution: Elasticsearch, distributed indexing</p>
          </div>
          
          <div class="bg-gray-800/50 rounded-lg p-4">
            <h4 class="font-semibold text-purple-300 mb-3">🎯 Result Quality</h4>
            <p class="text-sm text-gray-300 mb-3">Challenge: Context-aware relevance</p>
            <p class="text-xs text-blue-200">Solution: User feedback loops, A/B testing</p>
          </div>
        </div>
      </div>

      <!-- Community Contribution -->
      <div class="bg-orange-900/20 rounded-lg p-6 border border-orange-500/30">
        <h3 class="text-2xl font-bold text-orange-400 mb-4">🤝 Community & Open Source</h3>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 class="font-semibold text-orange-300 mb-3">Open Source Goals:</h4>
            <div class="space-y-2 text-sm text-gray-300">
              <div class="flex items-center space-x-3">
                <span class="text-green-400">📦</span>
                <span>Release as npm package for easy installation</span>
              </div>
              <div class="flex items-center space-x-3">
                <span class="text-blue-400">📚</span>
                <span>Comprehensive documentation and tutorials</span>
              </div>
              <div class="flex items-center space-x-3">
                <span class="text-purple-400">🔧</span>
                <span>Plugin system for custom document processors</span>
              </div>
              <div class="flex items-center space-x-3">
                <span class="text-red-400">🧪</span>
                <span>Test suite with benchmark datasets</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 class="font-semibold text-orange-300 mb-3">Target Users:</h4>
            <div class="space-y-2 text-sm text-gray-300">
              <div class="bg-gray-800/50 rounded-lg p-3">
                <p class="font-semibold text-cyan-300">🐧 Linux Enthusiasts</p>
                <p class="text-xs">Personal documentation libraries, homelab setups</p>
              </div>
              <div class="bg-gray-800/50 rounded-lg p-3">
                <p class="font-semibold text-cyan-300">🏢 System Administrators</p>
                <p class="text-xs">Corporate knowledge bases, troubleshooting guides</p>
              </div>
              <div class="bg-gray-800/50 rounded-lg p-3">
                <p class="font-semibold text-cyan-300">🎓 Educators & Students</p>
                <p class="text-xs">Academic research, course materials, learning resources</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Next steps slide
</script>
