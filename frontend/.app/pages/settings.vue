<script lang="ts" setup>
definePageMeta({
  title: 'Change some settings',
})

import { useStorage } from '@vueuse/core'

const current_user = useStorage('current_user_id', '')
const token = useStorage('token', '')

const route = useRoute()

const { data, pending, error, refresh } = await useFetch(
  'http://localhost:8000/api/users/login',
  {
    pick: ['id', 'user_name', 'access_token'],
    method: 'post',
    body: {
      email: 'matt@bittfurst.xyz',
      password: 'matt',
      user_name: 'matt',
    },
  },
)

if (data) {
  console.log(data)
}

current_user.value = data.id
token.value = data.access_token
</script>

<template>
  <h1>Settings Page</h1>

  <input v-model="data.user_name" />
</template>
