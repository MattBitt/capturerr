<script setup lang="ts">
import { storeToRefs } from 'pinia' // import storeToRefs helper hook from pinia
import { useCapturesApi } from '~/composables/captures-api'

const { data } = useCapturesApi()

console.log('data on the index page during load', data)

const hasCaptures = computed(() => {
  console.log('data in hasCaptures', data)
  return data?.value?.length > 0
})

const mycaptures = computed(() => data?.value)
</script>

<template>
  <div>
    <div v-if="hasCaptures">
      <!-- <CaptureCardGrid :captures="mycaptures" :loading="loading" /> -->
      <span>Lorem blah blah</span>
    </div>
    <div v-else>
      <p>No captures</p>
    </div>
  </div>
</template>
