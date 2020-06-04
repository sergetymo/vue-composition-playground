<script lang="ts">
import { h, reactive, computed } from 'vue'

export default {
  setup(props, { slots }) {
    const state = reactive({
      count: 0,
      double: computed(() => state.count * 2)
    })

    function increment () {
      state.count++
    }

    return () => h('div', slots.default({
      count: state.count,
      double: state.double,
      increment,
    }))
  }
}
</script>
