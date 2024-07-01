import { z } from "zod";
import { PropsNewValue } from "./useFormGasto";
import { getYear } from "src/utils";

export type ReturnHandleSumit = (props : PropsNewValue) => [error: string | null]; 
export const SchemaNewValue = z.object({
  value: z.number().min(1, {
    message: "El valor tiene que ser minimo 1"
  }), 
  title: z.string().min(1, {
    message: "El titulo no puede estar vacio"
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