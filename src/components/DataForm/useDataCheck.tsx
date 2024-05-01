import { useCallback } from "react";
import { useTrowError } from "src/context/app"
import { getYear, removeNonNumeric } from "src/utils";
import { z } from "zod";

type Props = {
  value: string | number, 
  dia: number, 
  mes: number, 
  ano: number
}

const SchemaNewValue = z.object({
  value: z.number().min(1, {
    message: "El valor tiene que ser minimo 1"
  }), 
  dia: z.number().min(1, {
    message: "El dia tiene que ser mayor a 0"
  }).max(31, {
    message: "El dia no puede ser mayor a 31"
  }), 
  mes: z.number().min(1, {
    message: "El mes tiene que ser mayor a 0"
  }).max(12, {
    message: "El mes tiene no puede ser mayor a 12"
  }), 
  ano: z.number().min(getYear(), {
    message: "El año no puede ser menor al año actual"
  })
})
export const useDataCheck = (props : Props) => {
  const handleError = useTrowError(); 
  const handleCheck = () => {
    props.value = Number(removeNonNumeric(props.value as string)) as number
    const values = SchemaNewValue.safeParse(props); 
    if(!values.success){
      console.error(values.error.errors);
      handleError(values.error.errors[0].message); 
      return 
    }
    console.log(values.data);
  }
  return handleCheck
}
