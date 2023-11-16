import { storeToRefs } from 'pinia' // import storeToRefs helper hook from pinia
import { useAuthStore } from '~/stores/auth' // import the auth store we just created

export default defineNuxtRouteMiddleware((to, from) => {
  // console.log('From auth middleware')
  // console.log('to', to, 'from', from)
  const { authenticateUser } = useAuthStore() // use authenticateUser action from  auth store
  const { authenticated } = storeToRefs(useAuthStore())

  if (to.path.includes('auth') || to.path === '/') {
    // TODO This doesn't seem super secure...
    console.log('Skipping authentication for route', to.fullPath)
    return
  }

  if (!authenticated.value) {
    // if not authenticated
    console.log('Not authenticated')
    return '/auth/login-1'
  }
})
