<template>
  <div>
    <MasonryWall
      :items="posts"
      :ssr-columns="1"
      :column-width="100"
      :gap="8"
      :max-columns="4"
    >
      <template #default="{ item, index }">
        <div
          :style="{ border: '1px solid blue' }"
          class="card flex items-center justify-center"
        >
          <PostCard :key="item.id" :post="item" />
        </div>
      </template>
    </MasonryWall>
  </div>
</template>
<script setup>
import useResource from '~/composables/useResource.js'

const { items: posts, fetchAll } = useResource('posts')
fetchAll()
</script>
