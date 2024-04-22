"use client"
import { ReactNode, createContext, useContext, useEffect, useReducer, useState } from "react";
import { ContextApp} from "./types";
import { getIngresos } from "./endpoints/ingresos-fijos";
type Props = {
  children: ReactNode, 
}
export const Context = createContext<ContextApp | null>(null); 
export function AppContext({children}: Props){
  const [ingresos_fijos, setIngresosFijos] = useState(null)
  useEffect(() =>{
    const goToServer = async () =>{
      const res = await getIngresos()
      setIngresosFijos(res)
    }    
    goToServer()
  }, [])
  return <Context.Provider value={{ingresos_fijos}}>
    {children}
  </Context.Provider>
}
export const useIngresosFijosData = () => {
  const contextData = useContext(Context);
  if(contextData === null) return null
  return contextData.ingresos_fijos
}