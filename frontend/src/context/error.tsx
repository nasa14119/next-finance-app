"use client"
import { useError } from "@components/ErrorMessage/useError";
import { ReactNode, createContext, useContext } from "react";

const ErrorContext = createContext({}); 
type ErrorContextValues = {
  ErrorComponent: () => JSX.Element, 
  trowNewError: (newMessage: string) => void
}
export function ErrorContextProvider({children}: {children: ReactNode}){
  const [ErrorComponent, trowNewError] = useError({duration: 750}); 
  const VALUES: ErrorContextValues = {
    ErrorComponent, 
    trowNewError
  }
  return (
    <ErrorContext.Provider value={VALUES}>
      {children}
    </ErrorContext.Provider>
  )
}
export const useErrorComponent = () => {
 const { ErrorComponent } = useContext(ErrorContext) as ErrorContextValues;
 return ErrorComponent 
}
export const useTrowError = () => {
  const { trowNewError } = useContext(ErrorContext) as ErrorContextValues;
  return trowNewError
}