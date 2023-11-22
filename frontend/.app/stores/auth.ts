// store/auth.ts

import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
interface UserPayloadInterface {
  user_name: string
  password: string
  email: string
  id: string
}

interface NewUserInterface {
  user_name: string
  first_name: string
  last_name: string
  password: string
  email: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authenticated: false,
    loading: false,
    user: {},
  }),
  actions: {
    async authenticateUser({
      user_name,
      password,
      email,
    }: UserPayloadInterface) {
      const config = useRuntimeConfig()
      const { data, pending, error } = await useFetch(
        `${config.public.apiBase}/users/login`,
        {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: {
            user_name,
            password,
            email,
          },
        },
      )
      console.log('data', data.value)
      console.log('pending', pending.value)
      console.log('errors', error.value)
      this.loading = pending.value

      if (error.value) {
        console.log('error', error.value)
        this.authenticated = false
      } else if (data.value) {
        const token = useStorage('token', '')
        token.value = data?.value?.access_token

        this.user = { ...data.value }
        console.log('user =', this.user.user_name)
        this.authenticated = true
      } else {
        this.authenticated = false
      }
    },
    async signUpUser({
      user_name,
      first_name,
      last_name,
      email,
      password,
    }: NewUserInterface) {
      // useFetch from nuxt 3
      const config = useRuntimeConfig()

      const { data, pending }: any = await useFetch(
        `${config.public.apiBase}/users`,
        {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: {
            user_name,
            first_name,
            last_name,
            password,
            email,
          },
        },
      )
      this.loading = pending
      if (data.value) {
        this.authenticateUser({
          id: data.value.id,
          user_name,
          password,
          email,
        })
      }
    },

    logUserOut() {
      const token = useStorage('token', '')
      this.authenticated = false
      token.value = null
    },
  },
})
