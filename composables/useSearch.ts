import { ref, watch } from 'vue'
import lunr from 'lunr'
import { useAlert } from './useAlert'

export interface Document {
  id: number
  filename: string
  content: string
  content_raw?: string
  score?: number
  contentLength?: number
  uploadedAt?: string
  createdAt?: string
  tfIdfDetails?: {
    queryTerms: string[]
    termScores: { [term: string]: { tf: number; idf: number; tfIdf: number; isFuzzy: boolean } }
    totalScore: number
    cosineSimilarity: number
    tfIdfScore: number
    combinedScore: number
  }
}

export function useSearch() {
  const documents = ref<Document[]>([])
  const searchQuery = ref('')
  const searchResults = ref<Document[]>([])
  const isSearching = ref(false)
  const debugMode = ref(false)
  let searchIndex: lunr.Index | null = null

  // Fetch documents from API
  const fetchDocuments = async () => {
    try {
      const response = await $fetch<Document[]>('/api/documents')
      documents.value = response
    } catch (error) {
      console.error('Failed to fetch documents:', error)
      throw error
    }
  }

  // Build search index
  const buildIndex = () => {
    if (!documents.value.length) return
    searchIndex = lunr(function () {
      this.ref('id')
      this.field('filename', { boost: 10 })
      this.field('content')
      documents.value.forEach(doc => this.add(doc))
    })
  }

  // Fetch and build index
  const fetchAndBuildIndex = async () => {
    const data = await $fetch<Document[]>('/api/documents')
    documents.value = data
    buildIndex()
  }

  // Debounce search for performance optimization
  let searchTimeout: NodeJS.Timeout | null = null

  // Perform TF-IDF search
  const performTFIDFSearch = async (query: string) => {
    if (!query.trim()) {
      searchResults.value = []
      isSearching.value = false
      return
    }
    
    isSearching.value = true
    
    try {
      const response = await $fetch<{ results: Document[] }>('/api/search', {
        method: 'POST',
        body: { query, debugMode: debugMode.value }
      })

      searchResults.value = response.results || []
    } catch (error) {
      console.error('Search error:', error)
      searchResults.value = []
    } finally {
      isSearching.value = false
    }
  }

  // Watch search query changes
  watch(searchQuery, (newQuery) => {
    if (searchTimeout) {
      clearTimeout(searchTimeout)
    }
    
    searchTimeout = setTimeout(() => {
      performTFIDFSearch(newQuery)
    }, 300)
  })

  // Watch debug mode changes
  watch(debugMode, () => {
    if (searchQuery.value.trim()) {
      performTFIDFSearch(searchQuery.value)
    }
  })

  // Delete document function
  const deleteDocument = async (documentId: number, filename: string) => {
    if (!confirm(`Are you sure you want to delete "${filename}"? This action cannot be undone.`)) {
      return
    }

    try {
      const response = await $fetch<{ success: boolean }>('/api/delete', {
        method: 'POST',
        body: { documentId }
      })

      if (response.success) {
        // Remove from documents list
        documents.value = documents.value.filter(doc => doc.id !== documentId)
        
        // Clear search results if deleted document was in results
        searchResults.value = searchResults.value.filter(result => result.id !== documentId)

        // Use alert from useAlert composable
        const { showAlert } = useAlert()
        showAlert('success', 'Document Deleted', `"${filename}" has been deleted successfully.`)
      }
    } catch (error) {
      console.error('Delete error:', error)
      const { showAlert } = useAlert()
      showAlert('error', 'Delete Failed', 'Failed to delete document. Please try again.')
    }
  }

  return {
    documents,
    searchQuery,
    searchResults,
    isSearching,
    debugMode,
    fetchDocuments,
    fetchAndBuildIndex,
    performTFIDFSearch,
    deleteDocument
  }
}
