import { useEffect, useState } from "react";
import { GastosData } from "../types";

const getGastos = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DB}/gastos`, {
    headers: {
      "Content-Type": "application/json"
    }, 
    method: "GET"
  })
  return await res.json()
}
export const useGastos = () => {
  const [state, setState] = useState(null); 
  useEffect(() =>{
    const goToServer = async () => {
      const res = await getGastos(); 
      setState(res); 
    }
    goToServer(); 
  }, [])
  return [state] as [GastosData[] | null]
}