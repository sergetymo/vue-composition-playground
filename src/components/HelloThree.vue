<template>
  <div>
    <h3>Count is</h3>
    <span>{{state.count}} &times; 2 = {{state.double}}</span>
    <button @click="increment">INC</button>
  </div>
</template>

<script lang="ts">
import { reactive, computed } from 'vue'

export default {
  setup() {
    const state = reactive({
      count: 0,
      double: computed(() => state.count * 2)
    })

    function increment () {
      state.count++
    }

    return {
      state,
      increment
    }
  }
}
</script>
