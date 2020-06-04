<template>
  <div>
    <span>{{state.current}}</span>
    <hr>
    <Select v-model="state.current" :values="values" />
  </div>
</template>

<script lang="ts">
import Select from './components/Select.vue'
import { reactive, watch } from 'vue'

export default {
  name: 'App',
  components: { Select },

  setup () {
    const state = reactive({ current: ['foo', 'tri'] })
    const values = ['foo', 'bar', 'baz', 'tri']

    return { state, values }
  },
}
</script>
