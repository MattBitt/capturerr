<script setup lang="ts">
import { storeToRefs } from 'pinia' // import storeToRefs helper hook from pinia
import { useAuthStore } from '~/stores/auth' // import the auth store we just created

const { authenticateUser } = useAuthStore() // use authenticateUser action from  auth store

const { authenticated } = storeToRefs(useAuthStore()) // make authenticated state reactive with storeToRefs
</script>

<template>
  <template v-if="!authenticated">
    <p>
      <BaseButton
        to="/auth/signup-1"
        color="primary"
        shape="curved"
        class="w-full"
      >
        Sign Up
      </BaseButton>
    </p>
    <p>
      <BaseButton
        to="/auth/login-1"
        color="primary"
        shape="curved"
        class="w-full"
      >
        Login
      </BaseButton>
    </p>
  </template>
  <template v-else>
    <p>
      <BaseButton
        to="/auth/logout"
        color="primary"
        shape="curved"
        class="w-full"
      >
        Logout
      </BaseButton>
    </p>
  </template>
</template>
