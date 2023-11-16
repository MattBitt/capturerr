<script setup lang="ts">
// set compile time meta information
definePageMeta({
  title: 'Register new Account',
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
    <h1>Register</h1>
  </div>
</template>
