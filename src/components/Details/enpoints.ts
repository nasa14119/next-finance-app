import { Data } from "@context/types";
import { z } from "zod";

export const getDataFromServer = async (url: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DB}/${url}`); 
  if(res.status !== 200) throw null; 
  return await res.json(); 
}
const SchemaDataPut = z.object({
  id: z.string(), 
  valor: z.number().min(1), 
  descripcion: z.string(), 
  type: z.union([z.literal("ingreso"), z.literal("gasto")]),  
  dia: z.number(), 
  mes: z.number(), 
  ano: z.number()
})
export const sendEditedData = async (url: string, body: Data) => {
  SchemaDataPut.parse(body);
  const res = await fetch(`${process.env.NEXT_PUBLIC_DB}/${url}`, {
    body: JSON.stringify(body), 
    method: "PUT", 
    headers: {
      "Content-Type": "application/json",
    }
  }); 
  if(res.status !== 200) throw null; 
  return await res.json(); 
}