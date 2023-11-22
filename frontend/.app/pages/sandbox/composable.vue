<script setup lang="ts">
import { useMouse } from '~/composables/mouse'

const { x, y } = useMouse()
</script>

<template>
  <div>
    <h2>Mouse position is at: {{ x }}, {{ y }}</h2>
  </div>
</template>
