import { useEffect, useState } from "react";
import { AhorroData } from "../types";

const getAhorros = async () => {
  console.log();
  const res = await fetch(`${process.env.NEXT_PUBLIC_DB}/ingreso`, {
    headers: {
      "Content-Type": "application/json"
    }, 
    method: "GET"
  })
  return await res.json()
}
export const useAhorro = () => {
  const [state, setState] = useState(null); 
  useEffect(() =>{
    const goToServer = async () => {
      const res = await getAhorros(); 
      setState(res); 
    }
    goToServer(); 
  }, [])
  return [state] as [AhorroData[] | null]
}