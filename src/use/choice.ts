import { ref, Ref, computed } from 'vue'

export interface ChoiceOption {
  value: string
  selected: boolean
}

export interface UseChoiceReturnValue {
  options: Ref<Array<ChoiceOption>>
  choose: (value: string) => void
  choice: Ref<string | Array<string>>
  multiple: boolean
}

export default function useChoice (
  values: Array<string>,
  selected?: string | Array<string>
): UseChoiceReturnValue {
  const multiple: boolean = Array.isArray(selected)

  const options: Ref<Array<ChoiceOption>> = ref(values.map<ChoiceOption>(
    value => ({
      value,
      selected: multiple ? selected.includes(value) : selected === value,
    })
  ))

  const choice: Ref<string | Array<string>> = computed(() => {
    if (multiple) return options.value.filter(o => o.selected).map(o => o.value)
    return options.value[options.value.findIndex(o => o.selected)].value
  })

  const choose = (value: string): void => {
    const index = options.value.findIndex(option => option.value === value)
    if (index > -1) {
      if (!multiple) {
        if (options.value[index].selected) return
        options.value = options.value.map(option => ({
          value: option.value,
          selected: false,
        }))
      }
      options.value[index].selected = !options.value[index].selected
    }
  }

  return { options, choose, choice, multiple }
}
