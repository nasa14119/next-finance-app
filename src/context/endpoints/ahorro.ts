import { useEffect, useState } from "react";
import { AhorroData, AhorroNewValue, AhorroMethods as MutationsFuctions } from "../types";

const getAhorros = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DB}/ingreso`, {
    headers: {
      "Content-Type": "application/json"
    }, 
    method: "GET"
  })
  return await res.json()
}
const sendIngreso = async ({ body }: { body: AhorroNewValue }) => {
  return await fetch(`${process.env.NEXT_PUBLIC_DB}/ingreso`, {
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(body)
  })
}
export const useAhorro = () => {
  const [state, setState] = useState<null | AhorroData[]>(null); 
  const Mutations: MutationsFuctions = {
    pushNewValue : async (value: AhorroNewValue ) => {
      setState(prev => {
        if(prev === null) return null
        return [...prev, {id: "preview", ...value}] as AhorroData[]
      })
      const res = await sendIngreso({body:value})
      const getData = getAhorros()
      getData.then(v => {
        setState(v)
      })
    }
  }
  useEffect(() =>{
    const goToServer = async () => {
      const res = await getAhorros(); 
      setState(res); 
    }
    goToServer(); 
  }, [])
  return [state, Mutations] as [AhorroData[] | null, MutationsFuctions]
}