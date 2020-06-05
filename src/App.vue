<template>
  <div>
    App. Single: {{single}}. Multi: {{multi}}
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
import { reactive, watch, ref } from 'vue'
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
    const values = ['foo', 'bar', 'baz', 'tri']
    const single = ref('bar')
    const multi = ref(['tri', 'baz'])
    const { toggle, isOpen }: UseToggleReturnValue = useToggle()

    return { values, single, multi, toggle, isOpen }
  },
}
</script>
