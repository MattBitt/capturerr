import {reactive, computed} from 'vue'
import { useStorage } from '@vueuse/core'

const activeRequests = reactive([])


export default function usePageRequests(){

  const isLoading = computed(()=> !!activeRequests.length)

  const makeRequest = async (url) =>{

    // push the url to the activeRequests
    const index = activeRequests.length
    activeRequests[index] = url

    const token = useStorage('token', '')
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token.value}`,
    }

    const response = await fetch(url, { headers } ).catch(error => alert(error)) // if failed remove the url from the activeRequests and alert error
    const data = await response.json()
    // remove the url from activeRequests

    activeRequests.splice(index, 1)

    return data

  }

  const makePostRequest = async (url, data) =>{
    // push the url to the activeRequests
    const index = activeRequests.length
    activeRequests[index] = url

    const token = useStorage('token', '')
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token.value}`,
    }

    const response = await fetch(url, { headers, method: 'PUT', body: JSON.stringify(data) } ).catch(error => alert(error)) // if failed remove the url from the activeRequests and alert error

    activeRequests.splice(index, 1)

    return response.json()
  }

  return {isLoading, makeRequest, makePostRequest}
}