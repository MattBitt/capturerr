<script setup lang="ts">
const navigation = [
  {
    name: 'Capturerr',
    icon: { name: 'ph:house-duotone', class: 'w-5 h-5' },
    to: '/',
  },
  {
    name: 'Divider',
    divider: true,
  },
  {
    name: 'Captures',
    icon: { name: 'ph:pencil-duotone', class: 'w-5 h-5' },
    to: '/captures',
  },
  {
    name: 'Users',
    icon: { name: 'ph:user-duotone', class: 'w-5 h-5' },
    to: '/users',
  },
  {
    name: 'Tags',
    icon: { name: 'ph:tag-duotone', class: 'w-5 h-5' },
    to: '/tags',
  },
  {
    name: 'Search',
    icon: { name: 'ph:magnifying-glass-duotone', class: 'w-5 h-5' },
    to: '/search',
  },
  {
    name: 'Divider',
    divider: true,
  },
  {
    name: 'Sign Up',
    icon: { name: 'ph-user-plus', class: 'w-5 h-5' },
    to: '/auth/signup-1',
  },
  {
    name: 'Login',
    icon: { name: 'ph:sign-in-duotone', class: 'w-5 h-5' },
    to: '/auth/login-1',
  },
  {
    name: 'Forgot Password',
    icon: { name: 'ph:recycle-duotone', class: 'w-5 h-5' },
    to: '/auth/forgot-password',
  },
  {
    name: 'Logout',
    icon: { name: 'ph:sign-out-duotone', class: 'w-5 h-5' },
    to: '/auth/logout',
  },
  {
    name: 'About',
    icon: { name: 'ph:question-duotone', class: 'w-5 h-5' },
    to: '/about',
  },
  {
    name: 'Settings',
    icon: { name: 'ph:gear-six-duotone', class: 'w-5 h-5' },
    to: '/settings',
  },

  {
    name: 'Divider',
    divider: true,
  },
  {
    name: 'Admin Tools',
    icon: { name: 'ph:hammer-duotone', class: 'w-5 h-5' },
    to: '/sandbox',
  },
]
</script>

<template>
  <TairoSubsidebar>
    <TairoSubsidebarMenu :navigation="navigation" />
  </TairoSubsidebar>
</template>
