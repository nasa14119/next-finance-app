"use client"
import { Data, newData } from "@context/types";
import { ReactNode, createContext, useContext, useRef } from "react";
import { create, createStore, useStore } from "zustand";
import { persist } from "zustand/middleware";
import { pushValueToDB } from "./enpoints";
import { useTrowError } from "@context/error";
import { useRouter } from "next/navigation";

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
type SetStateFunction = (prev: Data[]) => Data[]
type DataStore = {
  data: Data[] | null, 
  deleteId: (v:Data["id"]) => void, 
  setNewState: (handleState: SetStateFunction) => void
}
type ReactStore = ReturnType<typeof createDataStore>
const ReactDataContext = createContext<ReactStore | null>(null)
const createDataStore = (initProps: Data[]) => {
  const DEFAULT_VALUES = {
    data:[]
  }
  return createStore<DataStore>()((set, get) => ({
    ...DEFAULT_VALUES,
    data: [...initProps],
    deleteId: (id: Data["id"]) => {
      const state = get().data;
      if (!state) throw Error("No data available");
      if (!state.some((v) => v.id === id)) throw Error("Id is not found");
      const filter = state.filter((v) => v.id !== id);
      set({ data: [...filter] });
    },
    setNewState: (handleState) => {
      const state = handleState(get().data as Data[]); 
      if(!state) return
      set({data:[...state]})
    },
  }));
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
export const useDeleteFromId = () => {
  const context = useContext(ReactDataContext); 
  if(!context) throw Error("Missing DataContext provider")
  const deleteContext = context.getState().deleteId; 
  return deleteContext
}
export const usePushNewValue = () => {
  const context = useContext(ReactDataContext); 
  const triggerError = useTrowError()
  const { refresh } = useRouter(); 
  return (newValue:newData) => {
    if(!context) throw Error("Missing DataContext provider")
    const { setNewState } = context.getState(); 
    const handleState : SetStateFunction = (prev) => {
      if(!prev) throw Error("Value can't be null"); 
      const safePrev = [...prev]
      pushValueToDB(newValue, newValue["type"])
        .then((v) => setNewState(values => {
          const newValue = values.map(j => j.id === "temporal" ? v : j)
          refresh()
          return newValue as Data[]
        }))
        .catch((e) => {
          triggerError(e);
          setNewState(() => safePrev);
        });
      return [...prev, {...newValue, id: "temporal"}]
    }
    setNewState(handleState)
  }
}