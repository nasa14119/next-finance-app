import { Router } from "express"
import { changePresupueto, getPresupuesto } from "../model/conectDb";
import  { z } from "zod";
const app = Router();

app.get("/", (req, res) => {
  const { value } = getPresupuesto();
  res.send(JSON.stringify(value)).status(200);
})

const Payload = z.object({value: z.number()})
app.put("/", (req, res) =>{
  const check = Payload.safeParse(req.body)
  if(!check.success){
    return res.sendStatus(400)
  }
  const { value } = req.body
  const update = changePresupueto(value); 
  return res.send(update); 
})
export default app