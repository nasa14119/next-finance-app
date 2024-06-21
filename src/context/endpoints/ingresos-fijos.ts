import { useEffect, useState } from "react"
import { ResponseApiData, ResponseUseIngresosFijos } from "../types"
import { useIngresosFijosMethods } from "../app"
import { useTrowError } from "../error"

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

export const usePaymentMethods = () => {
  const methodsIngresos = useIngresosFijosMethods(); 
  const trowError = useTrowError()
  const [loading, setLoading] = useState(false); 
  const PaymentMade = async () => {
    setLoading(true); 
    const res = await fetch(`${process.env.NEXT_PUBLIC_DB}/ingresos-fijos/dinero-recibido`)
    if(res.ok){
      methodsIngresos?.reFetchValues(); 
    }else{
      trowError("An error ocurred while sending information to server"); 
    }
    setLoading(false)
  }
  const PaymentUndo = async () => {
    setLoading(true); 
    const res = await fetch(`${process.env.NEXT_PUBLIC_DB}/ingresos-fijos/dinero-recibido-undo`)
    if(res.ok){
      methodsIngresos?.reFetchValues(); 
    }else{
      trowError("An error ocurred while sending information to server"); 
    }
    setLoading(false)
  }
  return {PaymentMade, PaymentUndo, loading}
}