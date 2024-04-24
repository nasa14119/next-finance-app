import { useEffect, useState } from "react"
import { ResponseIngreso } from "../types"

export const getIngresos = async () =>{
  const res = await fetch("http://localhost:3000/ingresos-fijos", {
    headers: {
      "Content-Type": "application/json"
    }, 
    method: "GET"
  })
  return await res.json()
}

export const useIngresosFijos = () => {
  const [ingresos_fijos, setIngresosFijos] = useState<null | ResponseIngreso>(null); 
  useEffect(() =>{
    const goToServer = async () =>{
      const res = await getIngresos()
      setIngresosFijos(res)
    }    
    goToServer()
  }, [])
  const changeValue = (value: null | ResponseIngreso) => {
    setIngresosFijos(value)
  }
  return [ingresos_fijos, changeValue] as [ResponseIngreso | null, (value: null | ResponseIngreso) => void]
}