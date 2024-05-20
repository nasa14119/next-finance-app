"use client"
import { Basket} from "../../assets/icons";
import { useFormGasto } from "../DataForm/useFormGasto"
export const AddGastoBtn = () => {
  const [Form, handleState] = useFormGasto(); 
  return (
    <>
      <button
        className="flex justify-start gap-x-5 h-10 items-center bg-dager/20 mb-5 p-5 rounded-xl md:w-[250px]"
        onClick={() => handleState(true)}
      >
        <Basket className="w-6 h-6 text-dager" />
        <span>Agregar Gasto</span>
      </button>
      <Form />
    </>
  ); 
}
