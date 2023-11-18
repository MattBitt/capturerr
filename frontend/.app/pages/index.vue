<script setup lang="ts">
import { storeToRefs } from 'pinia' // import storeToRefs helper hook from pinia
import { useAuthStore } from '~/stores/auth' // import the auth store we just created

const { authenticateUser } = useAuthStore() // use authenticateUser action from  auth store

const { authenticated, user } = storeToRefs(useAuthStore()) // make authenticated state reactive with storeToRefs
const { open } = usePanels()
const config = useRuntimeConfig()
console.log('Runtime config:', config)

definePageMeta({
  title: 'Capturerr',
})
</script>

<template>
  <div>
    <div class="flex justify-center">
      <CapturerrLogo />
    </div>
    <div>
      <BaseButton @click="open('mypanel')">Open Panel</BaseButton>
    </div>

    <div v-if="authenticated">
      <UserLogo />
    </div>
    <div v-else>
      <p>No user logged in</p>
    </div>
  </div>
</template>
