<template>
  <div>
    Single choice control
    <ul>
      <li
        v-for="option in options"
        :key="option.value"
        @click="choose(option.value)"
      >
        {{option.value}} {{option.selected ? '&larr;' : '' }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watchEffect, watch, ref, onUpdated } from 'vue'
import useChoice, { UseChoiceReturnValue } from './../use/choice'

interface Props {
  modelValue: string
  values: Array<string>
}

export default defineComponent({
  name: 'SingleChoiceControl',
  props: {
    modelValue: {
      type: String,
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
      options.value = update.options.value
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
