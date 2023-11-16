<script setup lang="ts">
// set compile time meta information
definePageMeta({
  title: 'Welcome!',
})

useHead({
  meta: [{ name: 'description', content: 'My amazing site.' }],
  bodyAttrs: {
    class: 'test',
  },
  script: [{ innerHTML: "console.log('Hello world')" }],
})

// Here you can define your page logic
</script>

<template>
  <div>
    <h1>Login</h1>
  </div>
</template>
