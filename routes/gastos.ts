import { Router } from "express"
import { getGastos } from "../model/gastos";
const app = Router(); 

app.get("/", (req, res) => {
  const gastos = getGastos(); 
  res.status(200).send(gastos); 
})

export default app; 