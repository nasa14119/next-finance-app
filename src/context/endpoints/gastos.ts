import { useEffect, useState } from "react";
import { Data, GastosMutations, useGastosReturn } from "../types";
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
const sendNewValue = async (body:Data) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DB}/gastos`, {
    headers: {
      "Content-Type": "application/json"
    }, 
    method: "POST", 
    body: JSON.stringify(body)
  })
  if(res.status !== 200){
    throw "Error al enviar la información"
  }
  return await res.json()
}
export const useGastos = () : useGastosReturn => {
  const [state, setState] = useState<Data[]>([]); 
  const trowError = useTrowError(); 
  const Methods : GastosMutations = {
    pushNewValue(value) {
      sendNewValue(value).then(r => setState(prev => [...prev, r])).catch(e => trowError(e))
    },
  }
  useEffect(() =>{
    const goToServer = async () => {
      const res: Data[] = await getGastos(); 
      setState(res); 
    }
    goToServer(); 
  }, [])
  return [state, Methods]
}