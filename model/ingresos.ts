import { db } from "../db"
import { Ingreso } from "../routes/ingresos";
import { getMonth } from "../utils";

export const getIngresosData = () : Ingreso[] => {
  const res = db.query("SELECT * FROM agregar_ingresos"); 
  const values = res.all() as Ingreso[]
  return values.map(v => ({...v, type:"ingreso"})); 
}
export const getIngresoData = (id: string) => {
  const query = db.query(`
    SELECT * FROM agregar_ingresos WHERE id = $id
  `)
  return query.get({$id: id}) as Ingreso; 
}

export const createIngreso = (ingreso : Ingreso) => {
  const value = db.prepare(`
  INSERT INTO agregar_ingresos (id, valor, descripcion, dia, mes, ano)
  VALUES ($id, $valor, $descripcion, $dia, $mes, $ano)
`)
  const newValue = {
    $id : crypto.randomUUID(), 
    $valor: ingreso.valor,
    $descripcion: ingreso.descripcion,
    $dia : ingreso.dia, 
    $mes: ingreso.mes, 
    $ano: ingreso.ano
  }
  value.run(newValue); 
  return getIngresoData(newValue.$id); 
}
type PayloadDate = {
  id: string, 
  dia: number, 
  mes: number, 
  ano: number
}
export const changeDate = (ingreso : PayloadDate) => {
  const isNotFound = getIngresoData(ingreso.id) === null; 
  if(isNotFound){
    throw "ID not found in db"
  }
  const query = db.prepare(`
    UPDATE agregar_ingresos
    SET dia = $dia, mes = $mes, ano = $ano
    WHERE id = $id
  `)
  const newValue = {
    $id: ingreso.id, 
    $dia: ingreso.dia, 
    $mes: ingreso.mes, 
    $ano: ingreso.ano
  }
  query.run(newValue); 
  return getIngresoData(ingreso.id); 
}

type PayloadValor = {
  id: string, 
  valor: number
}
export const changeValor = (ingreso : PayloadValor) => {
  if(!ingreso.id || !ingreso.valor) throw "Payload not valid"
  const isNotFound = getIngresoData(ingreso.id) === null; 
  if(isNotFound){
    throw "ID not found in db"
  }
  const query = db.prepare(`
    UPDATE agregar_ingresos
    SET valor = $valor
    WHERE id = $id
  `)
  const newValue = {
    $id: ingreso.id, 
    $valor: ingreso.valor
  }
  query.run(newValue); 
  return getIngresoData(ingreso.id); 
}
type PayloadDescripcion = {
  id: string, 
  descripcion: string
}
export const changeDescripcion = (ingreso : PayloadDescripcion) => {
  if(!ingreso.id || !ingreso.descripcion) throw "Payload not valid"
  const isNotFound = getIngresoData(ingreso.id) === null; 
  if(isNotFound){
    throw "ID not found in db"
  }
  const query = db.prepare(`
    UPDATE agregar_ingresos
    SET descripcion = $descripcion
    WHERE id = $id
  `)
  const newValue = {
    $id: ingreso.id, 
    $descripcion: ingreso.descripcion
  }
  query.run(newValue); 
  return getIngresoData(ingreso.id); 
}

export const deleteIngreso = (id: string) => {
  if(!id) throw "No id was provided"
  const isNotFound = getIngresoData(id) === null; 
  if(isNotFound){
    throw "ID not found in db"
  }
  const query = db.prepare(`
    DELETE FROM agregar_ingresos WHERE id = $id
  `)
  query.run({$id: id})
  return getIngresosData(); 
} 

export const sumIngresosMes = () : number => {
  const $mes_actual = getMonth(); 
  const getValues = db.prepare(`
    SELECT SUM(valor) FROM agregar_ingresos
    WHERE mes = $mes_actual
  `)
  const {"SUM(valor)": value} = getValues.get($mes_actual) as { "SUM(valor)": number};
  return value === null ? 0 : value
}