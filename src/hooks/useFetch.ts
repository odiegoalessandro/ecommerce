import useSWR from "swr"
import api from "../services/api"

export function useFetch<Data = any>(path: string){
  const { data, error } = useSWR<Data>(path, async path => {
    const { data } = await api.get(path)
    
    return data
  })

  return { data, error }
}