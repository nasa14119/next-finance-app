import { Router } from "express"
import { changeDate, changeDescripcion,  changeGasto,  changeValor, createGasto, deleteGasto, getGastos } from "../model/gastos";
import { z } from "zod";
import { DataPutSchema } from "./types";
const app = Router(); 
const Gasto = z.object({
  id: z.string().optional(), 
  valor: z.number(), 
  descripcion: z.string(), 
  dia: z.number(), 
  mes: z.number(), 
  ano: z.number()
})
export type Gasto = z.infer<typeof Gasto>
app.get("/", (req, res) => {
  const gastos = getGastos(); 
  res.status(200).send(gastos); 
})

app.post("/" , (req, res) => {
  const check = Gasto.safeParse(req.body); 
  if("error" in check){
    return res.status(400).send(check.error.errors); 
  }
  const newGasto = createGasto(req.body); 
  return res.status(200).send(newGasto); 
})
const PayloadDateShema = z.object({
  id: z.string(), 
  dia: z.number(), 
  mes: z.number(), 
  ano: z.number()
})
app.put("/date", (req, res) =>{
  const check = PayloadDateShema.safeParse(req.body); 
  if("error" in check){
    return res.status(400).send(check.error.errors); 
  }
  try {
    const newGastoDate = changeDate(req.body);
    return res.status(200).send(newGastoDate); 
  } catch (error) {
    res.status(404).send({error})
  }
})

const PayloadValorShema = z.object({
  id: z.string(), 
  valor: z.number()
})
app.put("/valor", (req, res) =>{
  const check = PayloadValorShema.safeParse(req.body); 
  if("error" in check){
    return res.status(400).send(check.error.errors); 
  }
  try {
    const newGastoValue = changeValor(req.body);
    return res.status(200).send(newGastoValue); 
  } catch (error) {
    res.status(404).send({error})
  }
})
const PayloadDescripcionShema = z.object({
  id: z.string(), 
  descripcion : z.string()
})
app.put("/descripcion", (req, res) =>{
  const check = PayloadDescripcionShema.safeParse(req.body); 
  if("error" in check){
    return res.status(400).send(check.error.errors); 
  }
  try {
    const newGastoValue = changeDescripcion(req.body);
    return res.status(200).send(newGastoValue); 
  } catch (error) {
    res.status(404).send({error})
  }
})
app.put("/" , (req, res) => {
  const check = DataPutSchema.safeParse(req.body); 
  if("error" in check){
    return res.status(400).send(check.error.errors); 
  }
  try {
    const newValue = changeGasto(req.body)
    res.status(200).send(newValue); 
  } catch (error) {
    res.sendStatus(404); 
  }
})
const PayloadDeleteShema = z.object({
  id: z.string(), 
})
app.delete("/", (req, res) =>{
  const check = PayloadDeleteShema.safeParse(req.body); 
  if("error" in check){
    return res.status(400).send(check.error.errors); 
  }
  try {
    const newGastosList = deleteGasto(req.body.id);
    return res.status(200).send(newGastosList); 
  } catch (error) {
    res.status(404).send({error})
  }
})

export default app; 