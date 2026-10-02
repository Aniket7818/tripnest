import { ref, onMounted, onBeforeUnmount } from 'vue'

export function useScrollPosition(threshold = 20) {
  const isScrolled = ref(false)
  const scrollY = ref(0)

  function onScroll() {
    scrollY.value = window.scrollY
    isScrolled.value = window.scrollY > threshold
  }

  onMounted(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
  })

  return {
    isScrolled,
    scrollY
  }
}
