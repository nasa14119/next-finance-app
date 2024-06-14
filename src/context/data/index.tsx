"use client"
import { ReactNode, createContext, useContext, useState } from "react";
import { AhorroData } from "../types";

const initialMonths = false
const Context = createContext({data: []}); 
type ValuesContexConfig = {
  allMonths: boolean;
  toogleMonth: (value?: boolean) => void;
};
const ContextConfig = createContext({allMonths: initialMonths, toogleMonth: () => {}}); 
export const DataContext = ({data, children}: {data:any, children : ReactNode}) => {
  const [state, setState] = useState(data);
  return <Context.Provider value={{data : state} as {data:any}}>
    {children}
  </Context.Provider>
}
export const DataConfig = ({children}: {children : ReactNode}) => {
  const [allMonths, setAllMonths] = useState(initialMonths);
  const toogleMonth = (value?:boolean) => {
    if(typeof value === "undefined") return setAllMonths(prev => !prev); 
    setAllMonths(value); 
  }
  const VALUES : ValuesContexConfig = {
    allMonths, 
    toogleMonth
  }
  return <ContextConfig.Provider value={VALUES}>
    {children}
  </ContextConfig.Provider>
}
export const useAllMonths = () => {
  const { allMonths } = useContext(ContextConfig)
  return allMonths
}
export const useToggleMonths =  () => {
  const { toogleMonth } = useContext(ContextConfig)
  return toogleMonth
}
export const useDataDB = () => { 
  const { data } = useContext(Context)
  return data as AhorroData[]
}