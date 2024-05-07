"use client"
import { useModal } from '@components/Modal/useModal'
import React from 'react'
import { FormData } from '.';

export function useFormModal() {
  const [Modal, openModal] = useModal(); 
  const handleState = {
    open: () => openModal(true), 
    close: () => openModal(false)
  }
  const Element = ({type}:{type: string}) => (
    <Modal>
      <FormData type={type} closeModal={handleState.close}/> 
    </Modal>
  )
  return [Element, handleState] as [typeof Element, {open: () => void, close: () => void}]; 
}
