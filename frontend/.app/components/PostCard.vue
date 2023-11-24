<template>
  <div
    class="flex m-2 gap-2 items-center shadow-md w-1/4 flex-grow rounded overflow-hidden"
    style="border: 1px solid #eee"
  >
    <NuxtLink :to="`/sandbox/posts/${post.id}`">
      <span class="text-gray-700 text-base font-bold p-2">Posts!</span>
      <span class="text-gray-700 text-base font-bold p-2">{{
        post.title
      }}</span>
    </NuxtLink>
  </div>
</template>
<script setup>
const props = defineProps({
  post: Object,
})
const post = { ...props.post }
</script>
