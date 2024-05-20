import { useModal } from '@components/Modal/useModal'
import React from 'react'
import { FormDataGastos } from '.';
import z from "zod"
import { getYear } from 'src/utils';
import { ReturnHandleSumit, SchemaNewValue } from './types';
export type PropsNewValue = z.infer<typeof SchemaNewValue>
const useDataCheckGastos = () => {
  const sendInfo = () => ""
  const handleCheck:ReturnHandleSumit = (props) => {
    const {data:values, success, error} = SchemaNewValue.safeParse(props); 
    if(!success){
      console.error(error.errors);
      return [error.errors[0].message]
    }
    return [null]
  }
  return handleCheck
}

export function useFormGasto() {
  const [Modal, openModal] = useModal(); 
  const handleState = (value ?: boolean) => {
    if(typeof value === "undefined"){
      openModal(); 
      return
    }
    openModal(value); 
  }
  const handleSubmit = useDataCheckGastos(); 
  const Element = () => (
    <Modal>
      <FormDataGastos handleModal={handleState} title='Gastos' handleSubmit={handleSubmit}/> 
    </Modal>
  )
  return [Element, handleState] as [() => JSX.Element, typeof handleState]; 
}
