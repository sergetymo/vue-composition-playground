<template>
  <div>
    <Choice v-model="state.options" v-slot="{ options, select }" :multiple="multiple">
      <div>
        <span @click="toggle">{{ state.isOpen ? '&uarr;' : '&darr;'}} {{valueString}}</span>
        <ul v-show="state.isOpen">
          <li v-for="option in options" :key="option.value" @click="handleItemClick(select, option)">
            <component :is="option.selected ? 'strong' : 'span'">{{option.value}}</component>
          </li>
        </ul>
      </div>
    </Choice>
  </div>
</template>

<script lang="ts">
import { reactive, computed, defineComponent, watch, onUpdated } from 'vue'
import Choice, { ChoiceOption } from './Choice'

function setupOptions (values: Array<string>, selected?: string | Array<string>): Array<ChoiceOption> {
  return values.map<ChoiceOption>(value => ({
    value,
    selected: Array.isArray(selected) ? selected.includes(value) : selected === value,
  }))
}

interface Props {
  modelValue: string | Array<string>,
  values: Array<string>,
}

export default defineComponent({
  name: 'Select',
  components: { Choice },

  props: {
    modelValue: {
      type: [String, Array],
      required: true,
    },
    values: {
      type: Array,
      required: true,
    },
  },

  setup (props: Props, { emit }) {
    const state = reactive({
      options: setupOptions(props.values, props.modelValue),
      isOpen: false,
    })

    const multiple = computed(() => Array.isArray(props.modelValue))

    const valueString = computed(() =>
      state.options.reduce<string>((result, option) =>
        option.selected
          ? result === ''
            ? option.value
            : result + ', ' + option.value
          : result
        ,
        ''
      )
    )

    watch (() => state.options, (options) => {
      let value: string | Array<string>
      if (multiple.value) {
        value = options.reduce<Array<string>>(
          (result: Array<string>, option: ChoiceOption) => {
            if (option.selected) {
              result.push(option.value)
            }
            return result
          },
          []
        )
      } else {
        value = options[options.findIndex((option) => option.selected)].value
      }
      emit('update:modelValue', value)
    })

    const toggle = () => {
      state.isOpen = !state.isOpen
    }

    const handleItemClick = (cb: (value: string) => void, option: ChoiceOption ) => {
      if (!multiple.value) {
        toggle()
      }
      cb(option.value)
    }

    return {
      state,
      multiple,
      valueString,
      toggle,
      handleItemClick,
    }
  }
})
</script>
