<script setup>
import { useAuthStore } from '~/stores/auth' // import the auth store we just created

const props = defineProps({
  capture,
})
console.log('in setup.  this is the props passed in: ', props)
const { user } = storeToRefs(useAuthStore())

const handler = () => {
  console.log('In handler for Capture Card')
  console.log('capture passed in: ', props.value.capture)
  router.push(`/captures/${props.value.capture.id}`)
}

console.log(props.capture)
</script>

<template>
  <div>
    <div
      @click="handler"
      class="border-danger-200 dark:border-danger-700 flex flex-col items-center border p-6 bg-muted-800"
    >
      <span class="text-2xl font-bold text-primary-900 dark:text-primary-100">
        {{ capture?.entry }}
      </span>
      <span class="text-1xl font-bold text-primary-900 dark:text-primary-100">
        {{ capture?.notes }}
      </span>
    </div>
  </div>
</template>
