import {ref} from 'vue'
import usePageRequests from './usePageRequests.js'



export default function useCapturerrBackend(resource){
  const { makeRequest, makePostRequest } = usePageRequests()
  const items = ref([])
  const item = ref(null)
  
  const config = useRuntimeConfig()
  const url = `${config.public.apiBase}/me/${resource}`

  const { authenticated } = storeToRefs(useAuthStore())

  

  if (!authenticated.value) {
    // if not authenticated
    console.log('Not authenticated')
    throw new Error('Not authenticated') // not sure what to do here
  }
  


  console.log('Authenticated')

  const fetchAll = async ()=> items.value = await makeRequest(url)
  const fetchOne = async (id) => item.value = await makeRequest(`${url}/${id}`)
  const create = async (data) => await makePostRequest(url, data)
  const update = async (id, data) => await makePostRequest(`${url}/${id}`, data)


  
  return {
    items,
    fetchAll,
    item,
    fetchOne,
    create,
    update
  }
}
