import { useState } from "react"
import { Modal } from "./Modal"
type Return = [
  ({children}: {children: JSX.Element | JSX.Element[]}) => JSX.Element, 
  (value?:boolean) => void
]
export const useModal = () =>  {
  const [state, setState] = useState(false); 
  const Component = ({children}: {children:  JSX.Element[] | JSX.Element }) => <Modal state={state} close={handleState}>{children}</Modal>
  const handleState = (value?:boolean) => {
    if(typeof value === "undefined"){
      return setState(prev => !prev); 
    }
    return setState(value); 
  }
  return [Component, handleState] as Return
}