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
      // useFetch from nuxt 3
      const { data, pending }: any = await useFetch(
        'https://bittfurst.xyz/api/users/login',
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
      this.loading = pending

      if (data.value) {
        const token = useStorage('token', '')
        token.value = data?.value?.access_token
        console.log('user', data?.value)
        this.user = { ...data?.value }
      }
      this.authenticated = true
    },
    async signUpUser({
      user_name,
      first_name,
      last_name,
      email,
      password,
    }: NewUserInterface) {
      // useFetch from nuxt 3
      const { data, pending }: any = await useFetch(
        'https://bittfurst.xyz/api/users',
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
      const token = useStorage('token', '') // useCookie new hook in nuxt 3
      this.authenticated = false // set authenticated  state value to false
      token.value = null // clear the token cookie
    },
  },
})
