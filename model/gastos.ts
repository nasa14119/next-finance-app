import { db } from "../db"

export const getGastos = () =>{
  const res = db.query("SELECT * FROM gastos"); 
  return res.all(); 
}