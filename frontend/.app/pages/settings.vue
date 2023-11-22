<script lang="ts" setup>
definePageMeta({
  title: 'Change some settings',
})

import { useStorage } from '@vueuse/core'
import { storeToRefs } from 'pinia' // import storeToRefs helper hook from pinia
import { useAuthStore } from '~/stores/auth' // import the auth store we just created

const { authenticateUser } = useAuthStore() // use authenticateUser action from  auth store

const { authenticated, user } = storeToRefs(useAuthStore()) // make authenticated state reactive with storeToRefs
const { open } = usePanels()

const current_user = useStorage('current_user_id', '')
const token = useStorage('token', '')

const route = useRoute()
const config = useRuntimeConfig()
</script>

<template>
  <TairoContentWrapper>
    <h1>Settings Page</h1>

    <template v-if="user">
      <div>
        <h2>Current User Id: {{ user.id }}</h2>
        <h2>The data will be here</h2>
      </div>
    </template>
    <template v-else>
      <div>
        <h2>dont think this should appear</h2>
      </div>
    </template>
  </TairoContentWrapper>
</template>
