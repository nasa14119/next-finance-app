import { useAhorroMethods, useTrowError } from "src/context/app"
import { getYear, removeNonNumeric } from "src/utils";
import { z } from "zod";

const SchemaNewValue = z.object({
  value: z.number().min(1, {
    message: "El valor tiene que ser minimo 1"
  }), 
  title: z.string().min(1, {
    message: "El valor no puede estar vacio"
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
type Props = z.infer<typeof SchemaNewValue>

export const useDataCheck = (props : Props) => {
  const handleError = useTrowError(); 
  const sendInfo = useAhorroMethods()
  const handleCheck = (): boolean => {
    const {data:values, success, error} = SchemaNewValue.safeParse(props); 
    if(!success){
      console.error(error.errors);
      handleError(error.errors[0].message); 
      return false 
    }
    sendInfo?.pushNewValue({
      valor: values.value, 
      descripcion: values.title, 
      dia: values.dia, 
      mes: values.mes, 
      ano:values.ano - 2000
    })
    return true
  }
  return handleCheck
}
