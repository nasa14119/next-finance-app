"use client"
import { ReactNode, createContext, useContext, useState } from "react";
import { AhorroData } from "../types";

const Context = createContext({data: []}); 

export const DataContext = ({data, children}: {data:any, children : ReactNode}) => {
  const [state, setState] = useState(data);
  return <Context.Provider value={{data : state} as {data:any}}>
    {children}
  </Context.Provider>
}

export const useDataDB = () => { 
  const { data } = useContext(Context)
  return data as AhorroData[]
}