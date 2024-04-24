"use client"
import { ReactNode, createContext, useContext, useEffect, useReducer, useState } from "react";
import { ContextApp} from "./types";
import {  useIngresosFijos } from "./endpoints/ingresos-fijos";
import { useAhorro } from "./endpoints/ahorro";
import { useGastos } from "./endpoints/gastos";
import { useFormModal } from "@components/DataForm/useFormModal";
type Props = {
  children: ReactNode, 
}
export const Context = createContext<ContextApp | null>(null); 
export function AppContext({children}: Props){
  const [ingresos_fijos, setIngresos] = useIngresosFijos(); 
  const ahorro = useAhorro()
  const [gastos] = useGastos(); 
  const VALUES: ContextApp = {
    ingresos_fijos, 
    ahorro, 
    gastos,
  }
  return <Context.Provider value={VALUES}>
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
  return contextData.ahorro[0]
}
export const useAhorroMethods = () => {
  const contextData = useContext(Context);
  if(contextData === null) return null
  return contextData.ahorro[1]
}
export const useGastosData = () => {
  const contextData = useContext(Context);
  if(contextData === null) return null
  return contextData.gastos
}
