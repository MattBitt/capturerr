<template>
  <div>
    <div v-if="capture">
      <CaptureForm :capture="capture" />
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { watch } from 'vue'
import useCapturerrBackend from '~/composables/useCapturerrBackend.js'
const route = useRoute()

const { item: capture, fetchOne: fetchCapture } =
  useCapturerrBackend('captures')
fetchCapture(route.params.id)

watch(() => ({ ...capture.entry }))
</script>
