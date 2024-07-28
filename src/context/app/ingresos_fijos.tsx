"use client"
import { IngresosFijosContext, ResponseApiData } from "@context/types";
import { ReactNode, createContext, useContext, useRef } from "react";
import { createStore, useStore } from "zustand";

type ReactStore = ReturnType<typeof createDataStore>
const ReactDataContext = createContext<ReactStore | null>(null)
const createDataStore = (initProps: ResponseApiData) => {
    const Values: IngresosFijosContext = {
        last_payment: initProps.format_date, 
        month_budget: initProps.valor, 
        month_state: initProps.estado, 
        time_delay: initProps.time_delay, 
        time_nextpaymente: 10
    }
    return createStore<IngresosFijosContext | null>()(() => !initProps ? null : Values)
}
type Props = {
    children : ReactNode, 
    data: ResponseApiData
  }
  export const IngreosFinjosContextProvider = ({children, data}:Props) => {
    const store:ReactStore = useRef(createDataStore(data)).current
    return (
      <ReactDataContext.Provider value={store}>
        {children}
      </ReactDataContext.Provider>
    )
  }
  export const useIngresosFijosData = () =>{
    const context = useContext(ReactDataContext); 
    if(!context) throw Error("Missing DataContext provider")
    return useStore(context); 
  }