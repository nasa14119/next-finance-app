import { useEffect, useState } from "react";
import { GastosData, GastosMutations, useGastosReturn } from "../types";
import { useTrowError } from "../error";

const getGastos = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DB}/gastos`, {
    headers: {
      "Content-Type": "application/json"
    }, 
    method: "GET"
  })
  return await res.json()
}
const sendNewValue = async (body:GastosData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DB}/gastos`, {
    headers: {
      "Content-Type": "application/json"
    }, 
    method: "POST", 
    body: JSON.stringify(body)
  })
  if(res.ok || res.status !== 200){
    throw "Error al enviar la información"
  }
  return await res.json()
}
export const useGastos = () : useGastosReturn => {
  const [state, setState] = useState<GastosData[]>([]); 
  const trowError = useTrowError(); 
  const Methods : GastosMutations = {
    pushNewValue(value) {
      sendNewValue(value).then(r => setState(prev => [r, ...prev])).catch(e => trowError(e))
    },
  }
  useEffect(() =>{
    const goToServer = async () => {
      const res: GastosData[] = await getGastos(); 
      setState(res); 
    }
    goToServer(); 
  }, [])
  return [state, Methods]
}