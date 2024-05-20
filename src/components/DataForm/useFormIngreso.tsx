"use client"
import { useModal } from '@components/Modal/useModal'
import React from 'react'
import { FormDataGastos } from '.';
import { ReturnHandleSumit, SchemaNewValue } from './types';
import { useAhorroMethods } from 'src/context/app';

const useDataCheckIngresos = () => {
  const sendInfo = useAhorroMethods()
  const handleCheck:ReturnHandleSumit = (props) => {
    const {data:values, success, error} = SchemaNewValue.safeParse(props); 
    if(!success){
      console.error(error.errors);
      return [error.errors[0].message]
    }
    sendInfo?.pushNewValue({
      valor: values.value, 
      descripcion: values.title, 
      dia: values.dia, 
      mes: values.mes, 
      ano:values.ano - 2000
    })
    return [null]
  }
  return handleCheck
}
export function useFormIngreso(){
  const [Modal, openModal] = useModal(); 
  const handleState = (value ?: boolean) => {
    if(typeof value === "undefined"){
      openModal(); 
      return
    }
    openModal(value); 
  }
  const handleSubmit = useDataCheckIngresos(); 
  const Element = () => (
    <Modal>
      <FormDataGastos handleModal={handleState} title='Ingresos' handleSubmit={handleSubmit}/> 
    </Modal>
  )
  return [Element, handleState] as [() => JSX.Element, typeof handleState]; 
}
