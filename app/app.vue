<script setup lang="ts">
import { ref, onMounted } from 'vue'
import GlassSurface from '../components/GlassSurface.vue'
import FaultyTerminal from '../components/FaultyTerminal.vue'
import SearchHeader from '../components/SearchHeader.vue'
import SearchInput from '../components/SearchInput.vue'
import SearchResults from '../components/SearchResults.vue'
import UploadModal from '../components/UploadModal.vue'
import { useSearch } from '../composables/useSearch'
import { useAlert } from '../composables/useAlert'

interface DocumentType {
  id: number
  filename: string
  content: string
  content_raw?: string
  score?: number
  contentLength?: number
  uploadedAt?: string
  createdAt?: string
  tfIdfDetails?: any
}

// Search functionality and data management
const {
  documents,
  searchQuery,
  searchResults,
  isSearching,
  debugMode,
  deleteDocument,
  fetchAndBuildIndex
} = useSearch()

// Alert notifications
const { alert, showAlert, closeAlert } = useAlert()

// Modal and UI state management
const selectedFiles = ref<File[]>([])
const isLoading = ref(false)
const showUploadModal = ref(false)
const showDocumentModal = ref(false)
const selectedDocument = ref<DocumentType | null>(null)
const showDocumentManager = ref(false)
const selectedDocumentIds = ref<Set<number>>(new Set())
const isSelectingMode = ref(false)

onMounted(fetchAndBuildIndex)

// Document modal management
const openDocumentModal = (document: DocumentType) => {
  selectedDocument.value = document;
  showDocumentModal.value = true;
};

const closeDocumentModal = () => {
  showDocumentModal.value = false
  selectedDocument.value = null
}

// Date formatting utility
const formatDate = (dateString?: string) => {
  if (!dateString) return 'Unknown date'
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
  } catch {
    return 'Invalid date'
  }
}

// File upload handler - processes multiple files and shows results
const handleUpload = async () => {
  if (!selectedFiles.value.length) return;
  isLoading.value = true;
  
  try {
    let successCount = 0;
    let errorCount = 0;
    const errors: string[] = [];

    // Process each selected file
    for (const file of selectedFiles.value) {
      try {
        const formData = new FormData();
        formData.append('document', file);
        await $fetch('/api/upload', { method: 'POST', body: formData });
        successCount++;
      } catch (error) {
        errorCount++;
        errors.push(`${file.name}: ${error || 'Upload failed'}`);
        console.error(`Upload failed for ${file.name}:`, error);
      }
    }

    // Update document index and close modal
    await fetchAndBuildIndex();
    showUploadModal.value = false;

    // Display upload results
    if (errorCount === 0) {
      showAlert('success', 'Success!', `${successCount} document${successCount > 1 ? 's' : ''} uploaded successfully!`);
    } else if (successCount === 0) {
      showAlert('error', 'Upload Failed', `All ${errorCount} document${errorCount > 1 ? 's' : ''} failed to upload`);
    } else {
      showAlert('warning', 'Partial Success', `${successCount} uploaded, ${errorCount} failed`);
    }
  } catch (error) {
    console.error('Upload process failed:', error);
    showAlert('error', 'Upload Failed', 'An error occurred during the upload process');
  } finally {
    isLoading.value = false;
    selectedFiles.value = [];
    showUploadModal.value = false;
    const fileInput = document.getElementById('file-input') as HTMLInputElement;
    if(fileInput) fileInput.value = '';
  }
};

// File selection management
const removeFile = (index: number) => {
  selectedFiles.value.splice(index, 1);
};

// Document library selection controls
const toggleDocumentSelection = (documentId: number) => {
  if (selectedDocumentIds.value.has(documentId)) {
    selectedDocumentIds.value.delete(documentId);
  } else {
    selectedDocumentIds.value.add(documentId);
  }
};

const selectAllDocuments = () => {
  if (selectedDocumentIds.value.size === documents.value.length) {
    selectedDocumentIds.value.clear();
  } else {
    documents.value.forEach(doc => selectedDocumentIds.value.add(doc.id));
  }
};

const deleteSelectedDocuments = async () => {
  const selectedCount = selectedDocumentIds.value.size;
  if (selectedCount === 0) return;

  if (!confirm(`Are you sure you want to delete ${selectedCount} selected document${selectedCount > 1 ? 's' : ''}? This action cannot be undone.`)) {
    return;
  }

  let successCount = 0;
  let errorCount = 0;

  for (const documentId of Array.from(selectedDocumentIds.value)) {
    try {
      await $fetch('/api/delete', {
        method: 'POST',
        body: { documentId }
      });
      successCount++;
    } catch (error) {
      console.error(`Failed to delete document ${documentId}:`, error);
      errorCount++;
    }
  }

  // Update index and reset selection state
  await fetchAndBuildIndex();
  selectedDocumentIds.value.clear();
  isSelectingMode.value = false;

  // Display deletion results
  if (errorCount === 0) {
    showAlert('success', 'Documents Deleted', `${successCount} document${successCount > 1 ? 's' : ''} deleted successfully.`);
  } else if (successCount === 0) {
    showAlert('error', 'Delete Failed', `Failed to delete ${errorCount} document${errorCount > 1 ? 's' : ''}.`);
  } else {
    showAlert('warning', 'Partial Success', `${successCount} deleted, ${errorCount} failed.`);
  }
};

const cancelSelection = () => {
  selectedDocumentIds.value.clear();
  isSelectingMode.value = false;
};
</script>

<template>
  <div class="min-h-screen relative ">
    <!-- CRT background with terminal effect -->
    <div class="fixed inset-0 z-0">
      <FaultyTerminal 
        :digit-size="1.2" 
        tint="#00ff44"
        :brightness="1.9"
        :scanline-intensity="0.1"
      />
      <!-- Center-focused dark gradient overlay (bigger, square, 100dvh) -->
      <div
        class="absolute inset-0 flex items-center justify-center pointer-events-none"
        style="z-index:1;"
      >
        <div
          class="flex items-center justify-center relative"
          style="height: 80dvh; aspect-ratio: 1 / 1; border-radius: 100%;"
        >
          <!-- Main radial gradient -->
          <div
        class="w-80dvh aspect-[1/1] rounded-full"
        style="background: radial-gradient(ellipse 80% 80% at center, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 80%, transparent 100%);"
          ></div>
          <!-- Outer blur/fade effect -->
          <div
        class="absolute inset-0 rounded-full pointer-events-none"
        style="
          filter: blur(32px);
          background: radial-gradient(ellipse 100% 100% at center, rgba(0,0,0,0.5) 60%, transparent 100%);
          z-index: 2;
        "
          ></div>
        </div>
      </div>
    </div>

    <!-- Main application interface -->
    <div class="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
      <!-- Application title with glitch effect -->
      <SearchHeader />

      <!-- Search input and controls -->
      <div class="w-full max-w-2xl mb-8">
        <SearchInput 
          :search-query="searchQuery"
          :debug-mode="debugMode"
          :documents-count="documents.length"
          @update:search-query="searchQuery = $event"
          @update:debug-mode="debugMode = $event"
          @open-upload="showUploadModal = true"
          @open-document-manager="showDocumentManager = true"
        />

        <!-- Debug mode status indicator -->
        <div v-if="debugMode" class="mt-3 text-center">
          <div class="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 px-3 py-1 rounded-full">
            <svg class="w-4 h-4 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span class="text-blue-200 text-sm font-medium">TF-IDF Debug Mode Active</span>
          </div>
        </div>
      </div>

      <!-- Search results display area -->
      <SearchResults 
        v-if="searchQuery"
        :search-query="searchQuery"
        :search-results="searchResults"
        :is-searching="isSearching"
        :debug-mode="debugMode"
        @open-document="openDocumentModal"
        @delete-document="deleteDocument"
        class="w-full max-w-4xl"
      />
    </div>

  <!-- Document management modal -->
  <div v-if="showDocumentManager" class="fixed inset-0 z-50 flex items-center justify-center p-2">
    <!-- Modal backdrop overlay -->
    <div 
      class="absolute inset-0 bg-black/50 backdrop-blur-sm" 
      @click="showDocumentManager = false"
    ></div>
    
    <!-- Document management modal with SSR safety -->
    <ClientOnly>
      <GlassSurface
        :width="1200"
        :height="700"
        :border-radius="16"
        :background-opacity="0.1"
        :blur-amount="20"
        class="relative shadow-2xl flex flex-col"
      >
        <div @click.stop class="w-full h-full flex flex-col">
          <!-- Header section -->
          <div class="flex items-center justify-between p-4 border-b border-white/10 flex-shrink-0">
            <div class="flex items-center gap-4">
              <svg class="w-6 h-6 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <h2 class="text-xl font-bold text-white">Document Library</h2>
              <span class="text-white/70 text-sm bg-white/10 px-3 py-1 rounded-full">{{ documents.length }} documents</span>
            </div>
            <GlassSurface
              :width="40"
              :height="40"
              :border-radius="20"
              :background-opacity="0.2"
              class="hover:shadow-lg transition-all duration-300"
            >
              <button @click="showDocumentManager = false" 
                      class="w-full h-full flex items-center justify-center text-white/70 hover:text-white transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </GlassSurface>
          </div>

          <!-- Document selection toolbar -->
          <div v-if="documents.length > 0" class="p-3 border-b border-white/10 flex-shrink-0">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-4">
                <GlassSurface
                  :width="120"
                  :height="32"
                  :border-radius="8"
                  :background-opacity="0.2"
                  class="hover:shadow-md transition-all duration-200"
                >
                  <button 
                    @click="isSelectingMode = !isSelectingMode; if (!isSelectingMode) selectedDocumentIds.clear()"
                    class="w-full h-full text-blue-300 text-sm justify-center flex items-center font-medium"
                  >
                    {{ isSelectingMode ? 'Cancel' : 'Select Mode' }}
                  </button>
                </GlassSurface>
                
                <GlassSurface
                  v-if="isSelectingMode"
                  :width="100"
                  :height="32"
                  :border-radius="8"
                  :background-opacity="0.2"
                  class="hover:shadow-md transition-all duration-200"
                >
                  <button 
                    @click="selectAllDocuments"
                    class="w-full h-full text-green-300 text-sm  justify-center flex items-center font-medium"
                  >
                    {{ selectedDocumentIds.size === documents.length ? 'Deselect All' : 'Select All' }}
                  </button>
                </GlassSurface>
              </div>

              <div v-if="isSelectingMode && selectedDocumentIds.size > 0" class="flex items-center gap-2">
                <span class="text-white/70 text-sm">{{ selectedDocumentIds.size }} selected</span>
                <GlassSurface
                  :width="120"
                  :height="32"
                  :border-radius="8"
                  :background-opacity="0.2"
                  class="hover:shadow-md transition-all duration-200"
                >
                  <button 
                    @click="deleteSelectedDocuments"
                    class="w-full h-full text-red-300 text-sm flex justify-center items-center font-medium"
                  >
                    Delete
                  </button>
                </GlassSurface>
              </div>
            </div>
          </div>

          <!-- Scrollable document content area -->
          <div class="p-4 overflow-y-auto flex-1 min-h-0">
            <div v-if="documents.length > 0" class="space-y-2">
              <div 
                v-for="doc in documents" 
                :key="doc.id"
                :class="[
                  'flex items-center justify-between p-3 rounded-xl border border-white/10 transition-all duration-200',
                  isSelectingMode && selectedDocumentIds.has(doc.id) 
                    ? 'bg-blue-500/20 border-blue-400/30' 
                    : 'bg-white/10 hover:bg-white/15'
                ]"
              >
                <div class="flex items-center gap-3 flex-1 min-w-0">
                  <!-- Selection checkbox for multi-select mode -->
                  <div v-if="isSelectingMode" class="flex-shrink-0">
                    <button 
                      @click="toggleDocumentSelection(doc.id)"
                      :class="[
                        'w-5 h-5 rounded border-2 transition-all duration-200 flex items-center justify-center',
                        selectedDocumentIds.has(doc.id) 
                          ? 'bg-blue-500 border-blue-500' 
                          : 'border-white/30 hover:border-white/50'
                      ]"
                    >
                      <svg v-if="selectedDocumentIds.has(doc.id)" class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </button>
                  </div>

                  <!-- Document icon and information -->
                  <svg class="w-5 h-5 text-blue-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  <div class="flex-1 min-w-0">
                    <div class="font-medium text-white text-sm truncate">{{ doc.filename }}</div>
                    <div class="text-xs text-white/60">{{ (doc.content_raw || doc.content)?.length || 0 }} characters</div>
                    <div v-if="debugMode && doc.content" class="text-xs text-yellow-300/60 mt-1">
                      Processed: {{ doc.content.length }} tokens
                    </div>
                  </div>
                </div>

                <!-- Action buttons when not in selection mode -->
                <div v-if="!isSelectingMode" class="flex items-center gap-2">
                  <GlassSurface
                    :width="36"
                    :height="36"
                    :border-radius="8"
                    :background-opacity="0.2"
                    class="hover:shadow-md transition-all duration-200"
                  >
                    <button 
                      @click="openDocumentModal(doc); showDocumentManager = false"
                      class="w-full h-full flex items-center justify-center text-blue-300"
                      title="View document"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
                    </button>
                  </GlassSurface>
                  <GlassSurface
                    :width="36"
                    :height="36"
                    :border-radius="8"
                    :background-opacity="0.2"
                    class="hover:shadow-md transition-all duration-200"
                  >
                    <button 
                      @click="deleteDocument(doc.id, doc.filename)"
                      class="w-full h-full flex items-center justify-center text-red-300"
                      title="Delete document"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                    </button>
                  </GlassSurface>
                </div>
              </div>
            </div>

            <!-- Empty state when no documents -->
            <div v-else class="text-center text-white/50 py-12">
              <svg class="w-16 h-16 mx-auto mb-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <h3 class="text-lg font-semibold text-white/80 mb-2">No documents in library</h3>
              <p class="text-white/60">Upload your first document to get started!</p>
            </div>
          </div>

          <!-- Footer section with controls -->
          <div class="p-4 border-t border-white/10 flex-shrink-0">
            <div class="flex items-center justify-between">
              <div class="text-xs text-white/70">
                Total: {{ documents.length }} documents
              </div>
              <GlassSurface
                :width="80"
                :height="40"
                :border-radius="8"
                :background-opacity="0.2"
                class="hover:shadow-md transition-all duration-200"
              >
                <button @click="showDocumentManager = false" 
                        class="w-full h-full text-blue-300 font-medium">
                  Close
                </button>
              </GlassSurface>
            </div>
          </div>
        </div>
      </GlassSurface>

      <!-- Fallback for SSR when GlassSurface is not available -->
      <template #fallback>
        <div class="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 max-w-5xl w-full max-h-[95vh] shadow-2xl flex flex-col"
             @click.stop>
          <!-- Fallback header -->
          <div class="flex items-center justify-between p-4 border-b border-white/10 flex-shrink-0">
            <div class="flex items-center gap-4">
              <svg class="w-6 h-6 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <h2 class="text-xl font-bold text-white">Document Library</h2>
              <span class="text-white/70 text-sm bg-white/10 px-3 py-1 rounded-full">{{ documents.length }} documents</span>
            </div>
            <button @click="showDocumentManager = false" 
                    class="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          <!-- Fallback scrollable content -->
          <div class="p-4 flex-1 overflow-y-auto">
            <div v-if="documents.length > 0" class="space-y-2">
              <div v-for="doc in documents" :key="doc.id" 
                   class="flex items-center justify-between p-3 rounded-xl border border-white/10 bg-white/10">
                <div class="flex items-center gap-3 flex-1 min-w-0">
                  <svg class="w-5 h-5 text-blue-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  <div class="flex-1 min-w-0">
                    <div class="font-medium text-white text-sm truncate">{{ doc.filename }}</div>
                    <div class="text-xs text-white/60">{{ (doc.content_raw || doc.content)?.length || 0 }} characters</div>
                  </div>
                </div>
                <button @click="deleteDocument(doc.id, doc.filename)" 
                        class="w-8 h-8 bg-red-500/20 hover:bg-red-500/40 text-red-300 rounded flex items-center justify-center transition-colors">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div v-else class="text-center text-white/50 py-12">
              <svg class="w-16 h-16 mx-auto mb-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <h3 class="text-lg font-semibold text-white/80 mb-2">No documents in library</h3>
              <p class="text-white/60">Upload your first document to get started!</p>
            </div>
          </div>
          
          <!-- Fallback footer -->
          <div class="p-4 border-t border-white/10 bg-white/5 flex-shrink-0">
            <div class="flex items-center justify-between">
              <div class="text-xs text-white/50">
                Total: {{ documents.length }} documents
              </div>
              <button @click="showDocumentManager = false" 
                      class="px-4 py-2 bg-white/20 hover:bg-white/30 text-blue-300 font-medium rounded-lg transition-colors">
                Close
              </button>
            </div>
          </div>
        </div>
      </template>
    </ClientOnly>
  </div>

    <UploadModal 
      :show="showUploadModal"
      :selected-files="selectedFiles"
      :is-loading="isLoading"
      @close="showUploadModal = false"
      @update:selected-files="selectedFiles = $event"
      @upload="handleUpload"
    />

    <!-- Glass Alert Component -->
    <div v-if="alert.show" class="fixed top-8 right-8 z-50 animate-in slide-in-from-right duration-300">
      <div class="bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-2xl p-6 max-w-sm">
        <div class="flex items-start gap-4">
          <!-- Icon based on alert type -->
          <div class="flex-shrink-0">
            <svg v-if="alert.type === 'success'" class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <svg v-else-if="alert.type === 'error'" class="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <svg v-else-if="alert.type === 'warning'" class="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
            <svg v-else class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          
          <div class="flex-1">
            <h3 class="text-white font-semibold text-lg">{{ alert.title }}</h3>
            <p class="text-white/80 text-sm mt-1">{{ alert.message }}</p>
          </div>
          
          <!-- Close button -->
          <button 
            @click="closeAlert"
            class="text-white/70 hover:text-white transition-colors flex-shrink-0"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Document View Modal -->
  <div v-if="showDocumentModal && selectedDocument" 
       class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
       @click="closeDocumentModal">
    <div class="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 max-w-4xl w-full max-h-[80vh] overflow-hidden"
         @click.stop>
      
      <!-- Modal Header -->
      <div class="flex items-center justify-between p-6 border-b border-white/10">
        <div class="flex-1">
          <h2 class="text-xl font-bold text-white mb-1">{{ selectedDocument.filename }}</h2>
          <div class="flex items-center gap-4 text-sm text-white/60">
            <span>{{ (selectedDocument.content_raw || selectedDocument.content)?.length || 0 }} characters</span>
            <span v-if="debugMode && selectedDocument.content" class="text-yellow-300">
              ({{ selectedDocument.content.length }} tokens processed)
            </span>
            <span>{{ formatDate(selectedDocument.uploadedAt || selectedDocument.createdAt) }}</span>
          </div>
        </div>
        <GlassSurface
          :width="40"
          :height="40"
          :border-radius="20"
          :background-opacity="0.2"
          class="hover:shadow-lg transition-all duration-300"
        >
          <button @click="closeDocumentModal" 
                  class="w-full h-full flex items-center justify-center text-white/70 hover:text-white transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </GlassSurface>
      </div>

      <!-- Modal Content -->
      <div class="p-6 overflow-y-auto max-h-[60vh]">
        <div class="prose prose-invert max-w-none">
          <div class="text-white/90 whitespace-pre-wrap font-mono text-sm leading-relaxed">
            {{ selectedDocument.content_raw || selectedDocument.content }}
          </div>
          
          <!-- Debug Mode: Show processed content -->
          <div v-if="debugMode" class="mt-6 p-4 bg-black/30 rounded-lg border border-yellow-400/30">
            <h4 class="text-yellow-200 font-semibold mb-2 text-sm">
              🧮 Processed Content (for search indexing):
            </h4>
            <div class="text-yellow-300/80 whitespace-pre-wrap font-mono text-xs leading-relaxed max-h-40 overflow-y-auto">
              {{ selectedDocument.content }}
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Footer -->
      <div class="p-6 border-t border-white/10 bg-white/5">
        <div class="flex items-center justify-between">
          <div class="text-xs text-white/50">
            Document ID: {{ selectedDocument.id }}
          </div>
          <div class="flex items-center gap-3">
            <GlassSurface
              :width="100"
              :height="40"
              :border-radius="8"
              :background-opacity="0.2"
              class="hover:shadow-md transition-all duration-200"
            >
              <button @click="deleteDocument(selectedDocument.id, selectedDocument.filename)" 
                      class="w-full h-full flex items-center justify-center gap-2 text-red-300 font-medium">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
                Delete
              </button>
            </GlassSurface>
            <GlassSurface
              :width="80"
              :height="40"
              :border-radius="8"
              :background-opacity="0.2"
              class="hover:shadow-md transition-all duration-200"
            >
              <button @click="closeDocumentModal" 
                      class="w-full h-full text-blue-300 font-medium">
                Close
              </button>
            </GlassSurface>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes slide-in-from-right {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes fade-out {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(100%);
  }
}

.animate-in {
  animation: slide-in-from-right 0.3s ease-out;
}

.animate-out {
  animation: fade-out 0.3s ease-in;
}

/* Custom CSS blur effects removed */


</style>