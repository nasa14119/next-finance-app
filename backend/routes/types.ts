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

export const IngresosFijos = z.object({
  updated: z.string(), 
  last_payment: z.string().min(1), 
  salary: z.number().min(1),
  state: z.number().min(1), 
  isPay: z.boolean(),
  style_payment: z.union([z.literal("MONTHLY"), z.literal("BIWEEKLY"), z.literal("WEEKLY")])
}); 