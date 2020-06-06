<template>
  <div>
    <button @click="resetSingle">single &rarr; foo</button>
    <button @click="resetMulti">multi &rarr; []</button>
    <button @click="unTri">remove 'tri' value</button>
    <hr>
    App. single: {{single}}. multi: {{multi}}
    <hr>
    <SingleChoiceControl :values="values" v-model="single" />
    <hr>
    <MultipleChoiceControl :values="values" v-model="multi" />
    <hr>
    <span @click="toggle">Spoiler: </span>
    <span v-show="isOpen">Lorem ipsum dolor sit amet.</span>
  </div>
</template>

<script lang="ts">
import { reactive, watch, ref, watchEffect } from 'vue'
import SingleChoiceControl from './components/SingleChoiceControl.vue'
import MultipleChoiceControl from './components/MultipleChoiceControl.vue'
import useToggle, { UseToggleReturnValue } from './use/toggle'

export default {
  name: 'App',
  components: {
    SingleChoiceControl,
    MultipleChoiceControl,
  },

  setup () {
    const values = ref(['foo', 'bar', 'baz', 'tri'])
    const single = ref('bar')
    const multi = ref(['tri', 'baz'])
    const { toggle, isOpen }: UseToggleReturnValue = useToggle()

    const resetSingle = () => {
      single.value = 'foo'
    }

    const resetMulti = () => {
      multi.value = []
    }

    const unTri = () => {
      values.value = values.value.filter(v => v !== 'tri')
    }

    return {
      values,
      single,
      multi,
      toggle,
      isOpen,
      resetSingle,
      resetMulti,
      unTri,
    }
  },
}
</script>
