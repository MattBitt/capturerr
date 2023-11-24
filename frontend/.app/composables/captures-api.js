

import { useStorage } from '@vueuse/core'
import { computed } from 'vue'
import { ref, onMounted, onUnmounted } from 'vue'


export async function useCapturesApi() {

  console.log('hello from the composable')
  const config = useRuntimeConfig()
  
  const token = useStorage('token', '')
  
  const { data, error, pending } = await useFetch(
    `${config.public.apiBase}/me/captures`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.value}`,
      },
    },
  )

  console.log("no error yet")

  if (data.value && pending.value === false) {
    console.log("ready to return data", data.value)
    return data.value
  }
}

