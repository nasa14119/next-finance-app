"use client"
import { ReactNode, createContext, useContext, useEffect, useReducer, useState } from "react";
import { ContextApp} from "./types";
import {  useIngresosFijos } from "./endpoints/ingresos-fijos";
import { useAhorro } from "./endpoints/ahorro";
type Props = {
  children: ReactNode, 
}
export const Context = createContext<ContextApp | null>(null); 
export function AppContext({children}: Props){
  const [ingresos_fijos, setIngresos] = useIngresosFijos(); 
  const [ahorro] = useAhorro()
  return <Context.Provider value={{ingresos_fijos, ahorro}}>
    {children}
  </Context.Provider>
}
export const useIngresosFijosData = () => {
  const contextData = useContext(Context);
  if(contextData === null) return null
  return contextData.ingresos_fijos
}
export const useAhorroData = () => {
  const contextData = useContext(Context);
  if(contextData === null) return null
  return contextData.ahorro
}
