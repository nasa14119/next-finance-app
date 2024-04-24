"use client"
import { useModal } from '@components/Modal/useModal'
import React from 'react'
import { FormData } from '.';

export function useFormModal() {
  const [Modal, openModal] = useModal(); 
  const handleState = () =>{
    openModal(true);
  }
  const Element = ({type}:{type: string}) => (
    <Modal>
      <FormData type={type}/> 
    </Modal>
  )
  return [Element, handleState] as [({type}:{type:string}) => JSX.Element, () => void]; 
}
