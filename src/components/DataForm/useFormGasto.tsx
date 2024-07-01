import { useModal } from '@components/Modal/useModal'
import React from 'react'
import { FormDataGastos } from '.';
import z from "zod"
import { ReturnHandleSumit, SchemaNewValue } from './types';
import { useGastosMutations } from 'src/context/app';
export type PropsNewValue = z.infer<typeof SchemaNewValue>
const useDataCheckGastos = () => {
  const { pushNewValue } = useGastosMutations()
  const handleCheck:ReturnHandleSumit = (props) => {
    const {data:values, success, error} = SchemaNewValue.safeParse(props); 
    if(!success){
      console.error(error.errors);
      return [error.errors[0].message]
    }
    pushNewValue({
      valor: values.value, 
      descripcion: values.title, 
      dia: values.dia,
      mes: values.mes, 
      ano: values.ano,
      type: "gasto"
    }); 
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
