"use client"
import { Data } from "@context/types";
import { ReactNode, createContext, useContext, useRef } from "react";
import { create, createStore, useStore } from "zustand";
import { persist } from "zustand/middleware";

const initialMonths = null

type PersistContext = {
  allMonths: boolean | null, 
  toogleMonth: () => void
}

const usePersistContext = create(
  persist<PersistContext>(
    (set, get) => ({
      allMonths: initialMonths,
      toogleMonth: () => set({ allMonths: !get().allMonths }),
    }),
    { name: "config-toogle" }
  )
);

export const useAllMonths = () => {
  const values = usePersistContext().allMonths; 
  return values
}
export const useToggleMonths =  () => {
  const values = usePersistContext().toogleMonth
  return values
}
type DataStore = {
  data: Data[] | null, 
}
type ReactStore = ReturnType<typeof createDataStore>
const ReactDataContext = createContext<ReactStore | null>(null)
const createDataStore = (initProps: Data[]) => {
  const DEFAULT_VALUES : DataStore = {
    data:[]
  }
  return createStore<DataStore>()(() => ({...DEFAULT_VALUES, data: [...initProps]}))
}
type Props = {
  children : ReactNode, 
  data: Data[]
}
export const DataContext = ({children, data}:Props) => {
  const store:ReactStore = useRef(createDataStore(data)).current
  return (
    <ReactDataContext.Provider value={store}>
      {children}
    </ReactDataContext.Provider>
  )
}
export const useDataDB = () => {
  const context = useContext(ReactDataContext); 
  if(!context) throw Error("Missing DataContext provider")
  return useStore(context).data as Data[]; 
}