import { storeToRefs } from 'pinia' // import storeToRefs helper hook from pinia
import { useAuthStore } from '~/stores/auth' // import the auth store we just created

export default defineNuxtRouteMiddleware((to, from) => {
  const { authenticated } = storeToRefs(useAuthStore())
  console.log('in middleware')
  if (
    to.path.includes('auth') ||
    to.path === '/' ||
    to.path.includes('sandbox')
  ) {
    // TODO This doesn't seem super secure...
    console.log('Skipping authentication for route', to.fullPath)
    return
  }

  if (!authenticated.value) {
    // if not authenticated
    console.log('Not authenticated')
    return navigateTo('/auth/login-1')
  }
  console.log('Authenticated')
})
