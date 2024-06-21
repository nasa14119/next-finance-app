import { z } from "zod";

export const DataPutSchema = z.object({
  id: z.string(), 
  valor: z.number(), 
  descripcion: z.string(), 
  dia: z.number(), 
  mes: z.number(), 
  ano: z.number()
})

export type DataWithId = z.infer<typeof DataPutSchema>
export type DataPut = z.infer<typeof DataPutSchema>