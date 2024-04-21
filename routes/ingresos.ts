import { Router } from "express"
import {changeDate,changeDescripcion,changeValor,createIngreso, deleteIngreso, getIngresosData, sumIngresosMes } from "../model/ingresos";
import { z } from "zod";
const app = Router(); 
const Ingreso = z.object({
  id: z.string().optional(), 
  valor: z.number(), 
  descripcion: z.string(), 
  dia: z.number(), 
  mes: z.number(), 
  ano: z.number()
})
export type Ingreso = z.infer<typeof Ingreso>
app.get("/", (req, res) => {
  const values = getIngresosData(); 
  res.status(200).send(values); 
})

app.post("/" , (req, res) => {
  const check = Ingreso.safeParse(req.body); 
  if("error" in check){
    return res.status(400).send(check.error.errors); 
  }
  const newValue = createIngreso(req.body); 
  return res.status(200).send(newValue); 
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
    const newIngresoDate = changeDate(req.body);
    return res.status(200).send(newIngresoDate); 
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
    const newIngresoValue = changeValor(req.body);
    return res.status(200).send(newIngresoValue); 
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
    const newIngresoValue = changeDescripcion(req.body);
    return res.status(200).send(newIngresoValue); 
  } catch (error) {
    res.status(404).send({error})
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
    const newIngresosList = deleteIngreso(req.body.id);
    return res.status(200).send(newIngresosList); 
  } catch (error) {
    res.status(404).send({error})
  }
})
app.get("/sum" , (req, res) => {
  const value = sumIngresosMes(); 
  res.status(200).send({sum_ingeros_mes: value}); 
})

export default app; 