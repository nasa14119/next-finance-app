import { db } from "../db"; 
import { getIngresosFijos } from "./ingresos_fijos";
type IngresosMes = {
  dinero_actualmente: number, 
  prev_value: number
}
const getIngresoMes = () => {
  const query = db.prepare(`SELECT * FROM ingresos_este_mes`); 
  return query.get() as IngresosMes
}
export const changeToPay = () =>{ 
  const getIngresoFijo = db.prepare(`SELECT valor FROM ingresos_fijos`); 
  const {valor : ingresoMensual} = getIngresoFijo.get() as { valor: number}; 
  const values = getIngresoMes()
  const updatedValues = {
    $dinero_actualmente : values.dinero_actualmente + ingresoMensual,
    $prev_value: values.dinero_actualmente
  }
  const updateValues = db.prepare(`
    UPDATE ingresos_este_mes
    SET dinero_actualmente = $dinero_actualmente, prev_value = $prev_value
  `)
  updateValues.run(updatedValues); 
  return getIngresosFijos(); 
}
export const revertChange = () =>{ 
  const values = getIngresoMes(); 
  const updatedValues = {
    $dinero_actualmente : values.prev_value,
    $prev_value: values.dinero_actualmente
  }
  const updateValues = db.prepare(`
    UPDATE ingresos_este_mes
    SET dinero_actualmente = $dinero_actualmente, prev_value = $prev_value
  `)
  updateValues.run(updatedValues); 
  return getIngresosFijos(); 
}

export const addGastoState = (value : number) => {
  const values = getIngresoMes(); 
  const updatedValues = {
    $dinero_actualmente : values.prev_value - value,
    $prev_value: values.dinero_actualmente
  }
  const updateValues = db.prepare(`
    UPDATE ingresos_este_mes
    SET dinero_actualmente = $dinero_actualmente, prev_value = $prev_value
  `)
  updateValues.run(updatedValues); 
  return getIngresosFijos(); 
}
