import { defineComponent } from 'vue'

export interface ChoiceOption {
  value: string,
  selected: boolean,
}

export interface Props {
  modelValue: Array<ChoiceOption>,
  multiple?: boolean,
}

export default defineComponent({
  name: 'Choice',

  props: {
    modelValue: {
      type: Array,
      required: true,
    },
    multiple: {
      type: Boolean,
      required: false,
    },
  },

  setup (props: Props, { slots, emit }) {
    const select = (value: string) => {
      let clone: Array<ChoiceOption> = JSON.parse(JSON.stringify(props.modelValue))
      const index = clone.findIndex(o => o.value === value)

      if (index > -1) {
        if (!props.multiple) {
          if (clone[index].selected) {
            return
          }
          clone = clone.map(o => {
            o.selected = false
            return o
          })
        }
        clone[index].selected = !clone[index].selected
      }

      emit('update:modelValue', clone)
    }

    return () => slots.default({
      options: props.modelValue,
      select,
    })
  }
})
