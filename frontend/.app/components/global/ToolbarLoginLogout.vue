<script setup lang="ts">
import { storeToRefs } from 'pinia' // import storeToRefs helper hook from pinia
import { useAuthStore } from '~/stores/auth' // import the auth store we just created

const { authenticateUser } = useAuthStore() // use authenticateUser action from  auth store

const { authenticated, user } = storeToRefs(useAuthStore()) // make authenticated state reactive with storeToRefs
</script>

<template>
  <div v-if="authenticated">
    <ToolbarLogoutButton />
  </div>
  <div v-else>
    <ToolbarLoginButton />
  </div>
</template>
