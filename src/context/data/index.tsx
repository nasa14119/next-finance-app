"use client"
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { AhorroData } from "../types";

const initialMonths = null
const Context = createContext({data: []}); 
type ValuesContexConfig = {
  allMonths: boolean | null;
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
  const [allMonths, setAllMonths] = useState<null | boolean>(initialMonths);
  useEffect(() => {
    const value = window.localStorage.getItem("toggle")
    if(value === null){
      window.localStorage.setItem("toggle", "false")
      setAllMonths(false); 
      return 
    }
    setAllMonths(value === "true")
  },[])
  const toogleMonth = (value?:boolean) => {
    setAllMonths(prev =>{
      const newValue = !prev
      if (typeof value === "undefined") {
        localStorage.setItem("toggle", newValue.toString())
        return newValue
      } else {
        localStorage.setItem("toggle", value.toString())
        return value
      }
    })
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