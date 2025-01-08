import { useModal } from '@components/Modal/useModal'
import React from 'react'
import { FormDataGastos } from '.';
import z from "zod"
import { ReturnHandleSumit, SchemaNewValue } from './types';
import { useGastosMutations } from 'src/context/app';
import { usePushNewValue } from '@context/data';
import { newData } from '@context/types';
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

export function useFormNewGastoPage(){
  const [Modal, openModal] = useModal(); 
  const sendDB = usePushNewValue()
  const handleState = (value ?: boolean) => {
    if(typeof value === "undefined"){
      openModal(); 
      return
    }
    openModal(value); 
  }
  const handleSubmit:ReturnHandleSumit = (v) => {
    const {success, error, data} = SchemaNewValue.safeParse(v)
    if(!success){
      console.error(error.errors);
      return [error.errors[0].message]
    }
    const newData:newData = {
      valor: data.value, 
      descripcion: data.title, 
      dia: data.dia, 
      mes: data.mes,
      ano: data.ano, 
      type: "gasto"
    }
    try {
      sendDB(newData)
      return [null]
    } catch (error) {
      return ["Error sending to DB"]
    }
  }; 
  const Element = () => (
    <Modal>
      <FormDataGastos handleModal={handleState} title='Gastos' handleSubmit={handleSubmit}/> 
    </Modal>
  )
  return [Element, handleState] as [() => JSX.Element, typeof handleState]; 
}