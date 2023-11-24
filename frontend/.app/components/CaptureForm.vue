<script setup>
const props = defineProps({
  capture: Object,
})
const capture = { ...props.capture }
const { update } = useCapturerrBackend('captures')
const toaster = useToaster()
const handleSubmit = () => {
  update(capture.id, capture)
  console.log('capture updated!')
  toaster.clearAll()
  toaster.show({
    title: 'Update successful!',
    message: `Capture Updated!`,
    color: 'success',
    icon: 'ph:user-circle-fill',
    closable: true,
  })
  navigateTo('/captures')
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <BaseInput v-model="capture.id" label="id" placeholder="Enter your id" />
    <BaseInput
      v-model="capture.user_id"
      label="user id"
      placeholder="Enter your user id"
    />

    <BaseInput
      v-model="capture.entry"
      label="Entry"
      placeholder="Enter your entry"
      type="text"
    />
    <BaseInput
      v-model="capture.notes"
      label="Notes"
      placeholder="Enter your notes"
    />
    <BaseInput
      v-model="capture.location"
      label="location"
      placeholder="Enter your location"
    />
    <BaseButtonAction type="submit">Submit</BaseButtonAction>
  </form>
</template>
