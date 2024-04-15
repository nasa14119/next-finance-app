import { Router } from "express"
import  { z } from "zod";
import { configDiaEntrada, dineroNoRecibido, dineroRecibido, getIngresosFijos, updateValorIngresosFijos } from "../model/ingresos_fijos";
const app = Router();
app.get("/", (req, res) =>{
  const value = getIngresosFijos(); 
  return res.status(200).send(value)
})
app.put("/valor", (req, res) => {
  if(!("valor" in req.body)){
    return res.status(400).send({error: "no payload was recibed"}); 
  }
  const check = z.number()
  try {
    const valor = check.parse(req.body.valor); 
    const new_valor = updateValorIngresosFijos(valor); 
    res.status(200).send(new_valor)
  } catch (error) {
    console.log(error);
    res.status(400).send({error:"datatype of payload is not suported"}); 
  }
})
app.get("/dinero-recibido", (req, res) =>{
  const time_delay = dineroRecibido(); 
  res.status(200).send({time_delay}); 
})
app.get("/dinero-no-recibido", (req, res) =>{
  const isDelay = dineroNoRecibido(); 
  res.status(200).send({isDelay}); 
})
const DineroEntrada = z.object({
  dia_entrada: z.number().min(1).max(31), 
  mes_entrada: z.number().min(1).max(12), 
  ano_entrada: z.number().max(99)
})
type DineroEntrada = z.infer<typeof DineroEntrada>
app.put("/dinero-entrada", (req, res) =>{
  const check = DineroEntrada.safeParse(req.body); 
  if("error" in check){
    return res.status(400).send({error: check.error.errors}); 
  }
  const body: DineroEntrada = req.body; 
  const updatedValues = configDiaEntrada({dia: body.dia_entrada, mes: body.mes_entrada , ano: body.ano_entrada}); 
  res.status(200).send(updatedValues); 
})

export default app