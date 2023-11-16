<script lang="ts" setup>
import { storeToRefs } from 'pinia' // import storeToRefs helper hook from pinia
import { useAuthStore } from '~/stores/auth' // import the auth store we just created

const { authenticateUser } = useAuthStore() // use authenticateUser action from  auth store

const { authenticated, user } = storeToRefs(useAuthStore())
</script>

<template>
  <div class="user-logo">
    <div class="user-logo__name">
      <p>Welcome {{ user?.user_name }}</p>
    </div>
  </div>
</template>

<style>
.user-logo {
  font-size: 108px;
  background: -webkit-linear-gradient(#d41919, #ffffff);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
