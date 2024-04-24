"use client"
import { useFormModal } from "@components/DataForm/useFormModal";
import {AddIcon} from "../../assets/icons"
import { useAgregarGasto } from "./useAgregarGasto"
export const AddIngresoBtn = () => {
  // const handleEvent = useAgregarGasto();
  const [Form, handleModal] = useFormModal(); 
  return (
    <div onClick={handleModal} className="cursor-pointer flex justify-start gap-x-5 h-10 items-center bg-accent/20 mb-5 p-5 rounded-xl md:w-[250px]">
      <AddIcon className="w-6 h-6 text-accent" />
      <span>Agregar Ingreso</span>
      <Form type={"Ingresos"}/> 
    </div>
  );
};