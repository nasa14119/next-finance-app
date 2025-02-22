import { useEffect, useState } from "react";
import { AhorroNewValue, Data, useAhorroMethods as MutationsFuctions, newData } from "../types";
import { useTrowError } from "@context/error";
import { useRouter } from "next/navigation";

const getAhorros = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DB}/ingresos`, {
    headers: {
      "Content-Type": "application/json"
    }, 
    method: "GET"
  })
  if(res.status !== 200){
    throw Error("Something went wrong")
  }
  return await res.json()
}
const sendIngreso = async ({ body }: { body: AhorroNewValue }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DB}/ingresos`, {
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(body)
  })
  if(res.status !== 200){
    throw Error("Error sending to DB")
  }
  return res
}
export const useAhorro = () => {
  const [state, setState] = useState<null | Data[]>(null);
  const trowError = useTrowError()
  const { refresh } = useRouter()
  const Mutations: MutationsFuctions = {
    pushNewValue: async (value: AhorroNewValue) => {
      setState(prev => {
        if (prev === null) return null
        return [...prev, { id: "preview", ...value }] as Data[]
      })
      try {
        await sendIngreso({ body: value })
        refresh(); 
      } catch (error) {
        trowError("Hubo un error al enviar la información")
        const getData = getAhorros()
        getData.then(v => {
          setState(v)
        })
      }
    }
  }
  useEffect(() =>{
    const goToServer = async () => {
      const res = await getAhorros(); 
      setState(res); 
    }
    goToServer(); 
  }, [])
  return [state, Mutations] as [Data[], MutationsFuctions]
}