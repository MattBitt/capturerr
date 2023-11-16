<script setup lang="ts">
import { useStorage } from '@vueuse/core'
import { storeToRefs } from 'pinia' // import storeToRefs helper hook from pinia
import { useAuthStore } from '~/stores/auth' // import the auth store we just created

const { authenticateUser } = useAuthStore() // use authenticateUser action from  auth store

const { authenticated, user } = storeToRefs(useAuthStore())

definePageMeta({
  title: 'Captures List',

  preview: {
    title: 'Captures list 1',
    description: 'For displaying a list of captures',
    categories: ['layouts', 'projects'],
    src: '/img/screens/layouts-projects-1.png',
    srcDark: '/img/screens/layouts-projects-1-dark.png',
    order: 68,
  },
})
const token = useStorage('token', '')
const { data, error, pending }: any = await useFetch(
  'http://172.29.48.119:8000/api/me/captures',
  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token.value}`,
    },
  },
)

const hasCaptures = computed(() => {
  return data.value?.length > 0 ? 'Yes' : 'No'
})

const mycaptures = computed(() => data.value)
</script>

<template>
  <TairoContentWrapper>
    <h1>Captures List</h1>
    <h2>Current User Id: {{ user.user_id }}</h2>
    <div v-if="hasCaptures === 'Yes'">
      <span>You have captures</span>
      <ul>
        <li>Item #1</li>
        <li v-for="capture in mycaptures" :key="capture.id">
          {{ capture.entry }} - {{ capture.id }}
        </li>

        <li>Item #15</li>
      </ul>
    </div>
    <div v-else>
      <span>You have no captures</span>
    </div>
  </TairoContentWrapper>
</template>
