<script setup lang="ts">
import { useAuthStore } from '~/stores/auth' // import the auth store we just created

const props = defineProps({
  captures: Array,
  loading: Boolean,
})
const { user } = storeToRefs(useAuthStore())
definePageMeta({
  title: 'Card Grid',
})
</script>

<template>
  <div>
    <TairoContentWrapper>
      <button class="btn btn-primary">New Capture</button>
      <div v-if="!loading && captures?.length === 0">
        <BasePlaceholderPage
          title="No matching results"
          subtitle="Looks like we couldn't find any matching results for your search terms. Try other search terms."
        >
        </BasePlaceholderPage>
      </div>
      <div v-else>
        <div class="ltablet:grid-cols-2 grid w-full gap-4 lg:grid-cols-2">
          <TransitionGroup
            enter-active-class="transform-gpu"
            enter-from-class="opacity-0 -translate-x-full"
            enter-to-class="opacity-100 translate-x-0"
            leave-active-class="absolute transform-gpu"
            leave-from-class="opacity-100 translate-x-0"
            leave-to-class="opacity-0 -translate-x-full"
          >
            <div>Some text in a div</div>
            <div
              v-for="item in captures"
              class="m-10 p-10 text-lg text-primary-600"
            >
              <CaptureCard capture="item" />
              <!-- <NuxtLink to="/captures/{{ props.capture.id }}">
                <div :key="item.id">
              
                </div>
              </NuxtLink> -->
            </div>
          </TransitionGroup>
        </div>
      </div>
    </TairoContentWrapper>
  </div>
</template>
