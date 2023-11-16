<script setup lang="ts">
definePageMeta({
  title: 'Capture Details',
})

const route = useRoute()
const slug = computed(() => route.params.slug)

const { data, pending, error, refresh } = await useFetch(
  `/api/captures/${slug.value}`,
)
</script>

<template>
  <TairoContentWrapper>
    <template #right>
      <BaseButton color="primary" class="w-full sm:w-32" shape="rounded">
        <Icon name="lucide:pen-square" class="h-4 w-4" />
        <span>Edit</span>
      </BaseButton>

      <BaseButton color="primary" class="w-full sm:w-32" shape="rounded">
        <Icon name="lucide:plus" class="h-4 w-4" />
        <span>New</span>
      </BaseButton>
      <BaseButton
        color="info"
        class="w-full sm:w-32"
        shape="rounded"
        @click="refresh"
      >
        <Icon name="lucide:refresh-ccw" class="h-4 w-4" />
        <span>Refresh</span>
      </BaseButton>
    </template>
  </TairoContentWrapper>
  <TairoContentWrapper>
    <template #left>
      <div v-if="pending">Loading...</div>

      <div v-else-if="data">
        <BaseCard v-for="item in data?.data" :key="item.id">
          <div
            class="border-muted-200 dark:border-muted-700 flex flex-col items-center border-b p-6 sm:flex-row"
          >
            <div class="flex flex-col items-center gap-3 sm:flex-row">
              <div class="text-center leading-none sm:text-left">
                <h4
                  class="text-muted-800 dark:text-muted-100 font-sans text-base font-medium"
                >
                  {{ item.text }}
                </h4>
                <p class="text-muted-400 font-sans text-sm">
                  {{ item.user_id }}
                </p>
              </div>
            </div>
          </div>
          <div
            class="flex flex-col items-center justify-between px-6 py-4 sm:flex-row"
          >
            <div class="mt-4 w-full sm:mt-0 sm:w-auto">
              <BaseButton class="w-full sm:w-auto"> View profile </BaseButton>
            </div>
          </div>
        </BaseCard>
      </div>

      <div v-else-if="error">
        <BaseCard>
          <p>Error:{{ error }}</p>
          <p>No Data Found</p>
        </BaseCard>
      </div>
    </template>
  </TairoContentWrapper>
</template>
