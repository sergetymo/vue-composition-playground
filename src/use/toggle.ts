import { ref, Ref } from 'vue'

export interface UseToggleReturnValue {
  isOpen: Ref<boolean>
  toggle: () => void
}

export default function useToggle(): UseToggleReturnValue {
  const isOpen = ref(false)
  const toggle = () => {
    isOpen.value = !isOpen.value
  }
  return {
    isOpen,
    toggle,
  }
}
