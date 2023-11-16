<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

definePageMeta({
  title: 'See ya later alligator',
})

useHead({
  meta: [{ name: 'description', content: 'My amazing site.' }],
  bodyAttrs: {
    class: 'test',
  },
  script: [{ innerHTML: "console.log('Hello world')" }],
})

const { logUserOut } = useAuthStore()
logUserOut()
const router = useRouter()
router.push('/')
</script>

<template>
  <div>
    <h1>Logout</h1>
  </div>
</template>
