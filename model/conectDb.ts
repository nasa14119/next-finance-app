import { db } from "../db"
type PresupuestoMensual = {
  id: number,
  name: string,
  value: number
}
export const getPresupuesto = () =>{
  const res = db.query("SELECT * FROM presupuesto"); 
  return res.get() as PresupuestoMensual
}
export const changePresupueto = (v:number) => {
  const lastValue = getPresupuesto(); 
  const res = db.query(`
    UPDATE presupuesto
    SET value = $newValue
    WHERE name = $id
  `); 
  res.run({$newValue:v, $id: lastValue.name})
  return {
    prevValue: lastValue.value, 
    newValue : getPresupuesto()
  }
}