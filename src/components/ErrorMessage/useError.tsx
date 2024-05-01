import { SetStateAction, useState} from "react";
import {ComponentError} from "./index"
export const useError = ({duration}: {duration: number}): [() => JSX.Element, (newMessage: string) => void] => {
  const [message, setMessage] = useState<null | string>(null);
  const triggerError = (newMessage:string) => {
    setMessage(newMessage)
  }
  const clear = () => setMessage(null)
  const Component = () => <ComponentError duration={duration} errorMesage={message} clear={clear}/>

  return [Component , triggerError]
}