<script lang="ts" setup></script>

<template>
  <form action="" method="POST" class="relative py-3 sm:mx-auto sm:max-w-xl">
    <BaseCard shape="curved" class="relative px-4 py-10 sm:p-10 md:mx-0">
      <div class="mx-auto max-w-md">
        <div class="flex items-center gap-4">
          <div
            class="bg-primary-500/20 text-primary-500 flex h-14 w-14 shrink-0 items-center justify-center rounded-full font-sans text-2xl"
          >
            <Icon name="ph:armchair-duotone" class="h-5 w-5" />
          </div>
          <div class="block text-xl font-semibold text-gray-700">
            <BaseHeading as="h3" size="lg" weight="medium">
              Sandbox Pages
            </BaseHeading>
            <BaseText size="sm" class="text-muted-400"
              >Select your option below</BaseText
            >
          </div>
        </div>
        <div class="divide-y divide-gray-200">
          <div class="grid grid-cols-12 gap-4 py-8">
            <div class="col-span-8">
              <BaseCard class="p-6 m-6 text-center max-w-md">
                <NuxtLink to="/sandbox/stores">Stores</NuxtLink>
              </BaseCard>
              <BaseCard class="p-6 m-6 text-center max-w-md">
                <NuxtLink to="/sandbox/form">Form</NuxtLink>
              </BaseCard>
              <BaseCard class="p-6 m-6 text-center max-w-md">
                <NuxtLink to="/sandbox/todo">Todo</NuxtLink>
              </BaseCard>
              <BaseCard class="p-6 m-6 text-center max-w-md">
                <NuxtLink to="/sandbox/auth">Auth</NuxtLink>
              </BaseCard>
            </div>
          </div>
        </div>
      </div>
    </BaseCard>
  </form>
</template>
