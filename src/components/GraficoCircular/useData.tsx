import { useEffect, useState } from "react"

type Data = {
  total: number, 
  value: number
}
const getData = ():Promise<Data> => new Promise((resolve: any): Data => resolve({total: 1800, value: 1300}))
export const useData = () => { 
  const [res , setRes] = useState<Data>({total:0, value:0})
  const data = getData()
  useEffect(() =>{
    data.then(v => setRes(v)); 
  }, [data]); 
  return res as Data
} 