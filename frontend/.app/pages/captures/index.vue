<template>
  <div>
    <MasonryWall
      :items="captures"
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
          <CaptureCard :key="item.id" :capture="item" />
        </div>
      </template>
    </MasonryWall>
  </div>
</template>

<script setup>
const { items: captures, fetchAll } = useCapturerrBackend('captures')
console.log('captures', captures)
fetchAll()
</script>
