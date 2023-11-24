<template>
  <div class="flex flex-wrap justify-center mt-6">
    <NuxtLink :to="`/sandbox/posts/${post.id}`">
      <div class="p-2 max-w-md">
        <div
          class="flex rounded-lg h-full dark:bg-gray-800 bg-primary-400 p-8 flex-col"
        >
          <div class="flex items-center mb-3">
            <div
              class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0"
            >
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                class="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
            </div>
            <h2 class="text-white dark:text-white text-lg font-medium">
              Feature 1.1
            </h2>
          </div>
          <div class="flex flex-col justify-between flex-grow">
            <p class="leading-5 text-lg text-white dark:text-primary-500 mb-5">
              {{ post.title }}
            </p>
            <p class="leading-relaxed text-blue dark:text-yellow-500 text-sm">
              {{ post.body }}
            </p>
          </div>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>
<script setup>
const props = defineProps({
  post: Object,
})
const post = { ...props.post }
</script>
