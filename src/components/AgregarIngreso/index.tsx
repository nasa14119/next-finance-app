"use client"
import { useFormIngreso } from "@components/DataForm/useFormIngreso";
import {AddIcon} from "../../assets/icons"
export const AddIngresoBtn = () => {
  const [Form, handleState] = useFormIngreso(); 
  return (
    <div onClick={() => handleState(true)} className="cursor-pointer flex justify-start gap-x-5 h-10 items-center bg-accent/20 mb-5 p-5 rounded-xl md:w-[250px]">
      <AddIcon className="w-6 h-6 text-accent" />
      <span>Agregar Ingreso</span>
      <Form/> 
    </div>
  );
};