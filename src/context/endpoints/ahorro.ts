import { useEffect, useState } from "react";
import { Data, useAhorroMethods as MutationsFuctions, newData } from "../types";
import { useTrowError } from "@context/error";

const getAhorros = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DB}/ingreso`, {
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
const sendIngreso = async ({ body }: { body: newData }) => {
  return await fetch(`${process.env.NEXT_PUBLIC_DB}/ingreso`, {
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(body)
  })
}
export const useAhorro = () => {
  const [state, setState] = useState<null | Data[]>(null);
  const trowError = useTrowError()
  const Mutations: MutationsFuctions = {
    pushNewValue: async (value: newData) => {
      setState(prev => {
        if (prev === null) return null
        return [...prev, { id: "preview", ...value }] as Data[]
      })
      try {
        await sendIngreso({ body: value })
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