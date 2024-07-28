import { useEffect, useState } from "react"
import { ResponseApiData, ResponseUseIngresosFijos } from "../types"

export const getIngresos = async () =>{
  const res = await fetch("http://localhost:3000/ingresos-fijos", {
    headers: {
      "Content-Type": "application/json"
    }, 
    method: "GET"
  })
  return await res.json()
}
export const useIngresosFijos = () : ResponseUseIngresosFijos => {
  const [ingresos_fijos, setIngresosFijos] = useState<null | ResponseApiData>(null); 
  useEffect(() =>{
    const goToServer = async () =>{
      const res = await getIngresos()
      setIngresosFijos(res)
    }    
    goToServer()
  }, [])
  const changeValue = (value: null | ResponseApiData) => {
    setIngresosFijos(value)
  }
  const reFetchValues = async () =>{
    const res = await getIngresos(); 
    setIngresosFijos(res);
  }
  return [ingresos_fijos, {changeValue, reFetchValues}]
}