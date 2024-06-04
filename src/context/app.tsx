"use client"
import { ReactNode, createContext, useContext, useEffect, useReducer, useState } from "react";
import { AhorroMethods, ContextApp, GastosMutations} from "./types";
import {  useIngresosFijos, usePaymentMethods } from "./endpoints/ingresos-fijos";
import { useAhorro } from "./endpoints/ahorro";
import { useGastos } from "./endpoints/gastos";
import { useError } from "@components/ErrorMessage/useError";
type Props = {
  children: ReactNode, 
}
export const Context = createContext<ContextApp | null>(null); 
export function AppContext({children}: Props){
  const [ingresos_fijos, setIngresosMethods] = useIngresosFijos(); 
  const [ErrorMessage, trowError] = useError({duration: 1000}); 
  const ahorro = useAhorro()
  const [gastos, setGastosMethods] = useGastos(); 
  const VALUES: ContextApp = {
    ingresos_fijos, 
    setIngresosMethods,
    ahorro, 
    gastos, 
    setGastosMethods
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
export const useIngresosFijosMethods = () => {
  const contextData = useContext(Context); 
  if(contextData === null) return null
  return contextData.setIngresosMethods
}
export const useAhorroData = () => {
  const contextData = useContext(Context);
  if(contextData === null) return null
  return contextData.ahorro[0]
}
export const useAhorroMethods = () => {
  const contextData = useContext(Context);
  if(contextData === null) return null
  return contextData.ahorro[1] as AhorroMethods
}
export const useGastosData = () => {
  const contextData = useContext(Context);
  if(contextData === null) return null
  return contextData.gastos
}
export const useGastosMutations = ():GastosMutations => {
  const contetData = useContext(Context); 
  if(contetData === null) return {} as GastosMutations
  return contetData.setGastosMethods
}