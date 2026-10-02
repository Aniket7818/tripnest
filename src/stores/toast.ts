import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface ToastItem {
  id: string
  message: string
  type: 'success' | 'info' | 'error'
  duration: number
}

export const useToastStore = defineStore('toast', () => {
  const toasts = ref<ToastItem[]>([])

  function showToast(message: string, type: 'success' | 'info' | 'error' = 'success', duration = 3500) {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`
    const toast: ToastItem = { id, message, type, duration }
    toasts.value.push(toast)

    setTimeout(() => {
      removeToast(id)
    }, duration)
  }

  function removeToast(id: string) {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }

  return {
    toasts,
    showToast,
    removeToast
  }
})
