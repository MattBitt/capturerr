<script setup lang="ts">
import { storeToRefs } from 'pinia' // import storeToRefs helper hook from pinia
import { useAuthStore } from '~/stores/auth' // import the auth store we just created

const { authenticated, user } = storeToRefs(useAuthStore()) // make authenticated state reactive with storeToRefs
const { open } = usePanels()
const config = useRuntimeConfig()

const isSidebarOpen = useState('sidebar-open', () => true)

console.info('App Config: ', config.app)
console.info('Public Config: ', config.public)

definePageMeta({
  title: 'Capturerr',
})
</script>

<template>
  <div>
    <div class="animate-pulse flex justify-center">
      <div>
        <CapturerrLogo />
      </div>
    </div>

    <div class="flex justify-center">
      <div v-if="authenticated">
        <UserLogo />
        <BaseButton @click="open('mypanel')">Open Panel</BaseButton>
        <BaseButton @click="isSidebarOpen = true">Open Sidebar</BaseButton>
        <NuxtLink :to="`/captures/`" class="btn btn-primary">Captures</NuxtLink>
      </div>
      <div v-else>
        <p>No user logged in</p>
        <NuxtLink :to="`/captures/`" class="btn btn-primary">Captures</NuxtLink>
      </div>
    </div>
  </div>
</template>
