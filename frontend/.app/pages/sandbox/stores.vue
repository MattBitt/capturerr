<script setup lang="ts">
import { useStorage } from '@vueuse/core'
const input = useStorage('unique-key', 'Hello, world!')
</script>

<template>
  <div>
    <input v-model="input" />
  </div>
</template>
