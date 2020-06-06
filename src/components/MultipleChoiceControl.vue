<template>
  <div>
    Multiple choice control
    <ul>
      <li
        v-for="option in options"
        :key="option.value"
        @click="choose(option.value)"
      >
        {{option.value}} {{option.selected ? '&check;' : '' }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watchEffect, watch } from 'vue'
import useChoice, { UseChoiceReturnValue } from './../use/choice'

interface Props {
  modelValue: Array<string>
  values: Array<string>
}

export default defineComponent({
  name: 'MultipleChoiceControl',
  props: {
    modelValue: {
      type: Array,
      reqiured: true,
    },
    values: {
      type: Array,
      required: true,
    }
  },

  setup (props: Props, { emit }) {
    const {
      options,
      choose,
      choice,
    }: UseChoiceReturnValue = useChoice(props.values, props.modelValue)

    watch(props, (newValue) => {
      const update = useChoice(newValue.values, newValue.modelValue)
      // this went wrong:
      // options.value = update.options.value
    })

    watchEffect(() => emit('update:modelValue', choice.value))

    return {
      options,
      choose,
    }
  }
})
</script>

<style>

</style>
