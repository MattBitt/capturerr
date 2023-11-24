<script lang="ts" setup>
import { storeToRefs } from 'pinia' // import storeToRefs helper hook from pinia
import { useAuthStore } from '~/stores/auth' // import the auth store we just created

const { authenticateUser } = useAuthStore() // use authenticateUser action from  auth store

const { authenticated, user } = storeToRefs(useAuthStore())
</script>

<template>
  <div>
    <div id="user-logo">
      <div>
        <p id="user-name">Welcome {{ user?.user_name }}</p>
      </div>
    </div>
    <div id="testapply">
      <BaseButton>Yay!</BaseButton>
    </div>
    <div class="group relative my-10 inline-flex">
      <div
        class="transitiona-all animate-tilt absolute -inset-px rounded-xl bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] opacity-70 blur-lg duration-1000 group-hover:-inset-1 group-hover:opacity-100 group-hover:duration-200"
      ></div>
      <a
        href="#"
        title="Get quote now"
        class="relative inline-flex items-center justify-center rounded-xl bg-gray-900 px-8 py-4 text-lg font-bold text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
        role="button"
        >Get it now
      </a>
    </div>
  </div>
</template>

<style lang="postcss">
#user-logo {
  @apply m-2 rounded-xl bg-gradient-to-br from-red-500 via-black to-white p-10 text-white transition-all duration-500 hover:bg-right-bottom;

  &:hover {
    @apply bg-yellow-400;
  }
}

#testapply {
  @apply bg-red-800 px-4 py-3;

  &:hover {
    @apply bg-red-300;
  }
}

#user-name {
  @apply m-2 rounded-xl bg-gradient-to-br from-red-500 via-black to-white p-10 text-white transition-all duration-500 hover:bg-right-bottom;
}
</style>
