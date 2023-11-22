<script setup lang="ts">
import { useStorage } from '@vueuse/core'
import { storeToRefs } from 'pinia' // import storeToRefs helper hook from pinia
import { useAuthStore } from '~/stores/auth' // import the auth store we just created

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

const config = useRuntimeConfig()
const { authenticated, user } = storeToRefs(useAuthStore())
console.log('user', user.value)
console.log(JSON.parse(JSON.stringify(user.value)))
const token = useStorage('token', '')
const { data, error, pending } = await useFetch(
  `${config.public.apiBase}/me/captures`,
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
console.log('my captures: ', JSON.parse(JSON.stringify(mycaptures.value)))
</script>

<template>
  <div>
    <TairoContentWrapper>
      <h1>Captures List</h1>
      <h2>Current User Id: {{ user.id }}</h2>

      <h2>Current User Name: {{ user.user_name }}</h2>
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
  </div>
</template>
