<template>
  <div class="min-h-[80vh] flex flex-col justify-center items-center text-center">
    <div class="space-y-8">
      <!-- Search Icon Animation -->
      <div class="text-8xl animate-pulse">
        🔍
      </div>
      
      <!-- Title -->
      <h1 class="text-5xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
        Membangun Simple Search Engine
      </h1>
      <h2 class="text-3xl font-bold text-white">
        dengan Information Retrieval
      </h2>
      
      <!-- Subtitle  -->
      <p class="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
        Implementasi Text Pre-processing, TF-IDF, Cosine Similarity, dan Fuzzy Search
        <br>untuk membuat sistem pencarian dokumen yang cerdas dan toleran kesalahan
      </p>
      
      <!-- Main Components -->
      <div class="flex justify-center space-x-6 text-sm text-gray-300">
        <div class="flex flex-col items-center space-y-2">
          <div class="text-3xl">📝</div>
          <span>Text Pre-processing</span>
        </div>
        <div class="flex flex-col items-center space-y-2">
          <div class="text-3xl">📊</div>
          <span>TF-IDF</span>
        </div>
        <div class="flex flex-col items-center space-y-2">
          <div class="text-3xl">📐</div>
          <span>Cosine Similarity</span>
        </div>
        <div class="flex flex-col items-center space-y-2">
          <div class="text-3xl">🔍</div>
          <span>Fuzzy Search</span>
        </div>
        <div class="flex flex-col items-center space-y-2">
          <div class="text-3xl">🎯</div>
          <span>Ranking</span>
        </div>
      </div>
      
      <!-- Learning Objectives -->
      <div class="pt-8 text-gray-400 max-w-3xl mx-auto">
        <p class="text-lg font-semibold text-white mb-4">Yang akan dipelajari:</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          <div class="flex items-center space-x-2">
            <span class="text-green-400">✓</span>
            <span>Konsep dasar Information Retrieval</span>
          </div>
          <div class="flex items-center space-x-2">
            <span class="text-green-400">✓</span>
            <span>Implementasi algoritma TF-IDF</span>
          </div>
          <div class="flex items-center space-x-2">
            <span class="text-green-400">✓</span>
            <span>Perhitungan Cosine Similarity</span>
          </div>
          <div class="flex items-center space-x-2">
            <span class="text-green-400">✓</span>
            <span>Text processing dan tokenisasi</span>
          </div>
          <div class="flex items-center space-x-2">
            <span class="text-green-400">✓</span>
            <span>Fuzzy Search dengan Levenshtein Distance</span>
          </div>
          <div class="flex items-center space-x-2">
            <span class="text-green-400">✓</span>
            <span>Hybrid scoring system</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Title slide - no specific logic needed
</script>

<style scoped>
/* Additional animations if needed */
</style>
