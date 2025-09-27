import { ref } from 'vue'

export const useAlert = () => {
  const alert = ref({
    show: false,
    type: 'success' as 'success' | 'error' | 'info' | 'warning',
    title: '',
    message: ''
  })

  let alertTimeout: NodeJS.Timeout | null = null

  const showAlert = (type: 'success' | 'error' | 'info' | 'warning', title: string, message: string) => {
    // Clear existing timeout if any
    if (alertTimeout) {
      clearTimeout(alertTimeout)
    }
    
    alert.value = { show: true, type, title, message }
    
    // Auto hide after 4 seconds
    alertTimeout = setTimeout(() => {
      alert.value.show = false
    }, 4000)
  }

  const closeAlert = () => {
    if (alertTimeout) {
      clearTimeout(alertTimeout)
    }
    alert.value.show = false
  }

  return {
    alert,
    showAlert,
    closeAlert
  }
}
