"use client"
import { ReactNode, createContext, useContext, useEffect, useReducer, useState } from "react";
import { ContextApp} from "./types";
import { getIngresos, useIngresosFijos } from "./endpoints/ingresos-fijos";
type Props = {
  children: ReactNode, 
}
export const Context = createContext<ContextApp | null>(null); 
export function AppContext({children}: Props){
  const [ingresos_fijos, setIngresos] = useIngresosFijos(); 
  return <Context.Provider value={{ingresos_fijos}}>
    {children}
  </Context.Provider>
}
export const useIngresosFijosData = () => {
  const contextData = useContext(Context);
  if(contextData === null) return null
  return contextData.ingresos_fijos
}