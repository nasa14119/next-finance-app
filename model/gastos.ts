import { db } from "../db"
import { Gasto } from "../routes/gastos";
import { DataPut, DataWithId } from "../routes/types";
import { getMonth } from "../utils";

export const getGastos = () : Gasto[] =>{
  const res = db.query("SELECT * FROM gastos");
  const values  = res.all() as Gasto[] 
  return values.map(v => ({...v, type:"gasto"})); 
}
export const getGasto = (id: string): DataWithId => {
  const query = db.query(`
    SELECT * FROM gastos WHERE id = $id
  `)
  return query.get({$id: id}) as DataWithId; 
}

export const createGasto = (gasto : Gasto) => {
  const value = db.prepare(`
  INSERT INTO gastos (id, valor, descripcion, dia, mes, ano)
  VALUES ($id, $valor, $descripcion, $dia, $mes, $ano)
`)
  const newGasto = {
    $id : crypto.randomUUID(), 
    $valor: gasto.valor,
    $descripcion: gasto.descripcion,
    $dia : gasto.dia, 
    $mes: gasto.mes, 
    $ano: gasto.ano
  }
  value.run(newGasto); 
  return getGasto(newGasto.$id); 
}
type PayloadDate = {
  id: string, 
  dia: number, 
  mes: number, 
  ano: number
}
export const changeDate = (gasto : PayloadDate) => {
  const isNotFound = getGasto(gasto.id) === null; 
  if(isNotFound){
    throw "ID not found in db"
  }
  const query = db.prepare(`
    UPDATE gastos
    SET dia = $dia, mes = $mes, ano = $ano
    WHERE id = $id
  `)
  const newGasto = {
    $id: gasto.id, 
    $dia: gasto.dia, 
    $mes: gasto.mes, 
    $ano: gasto.ano
  }
  query.run(newGasto); 
  return getGasto(gasto.id); 
}

type PayloadValor = {
  id: string, 
  valor: number
}
export const changeValor = (gasto : PayloadValor) => {
  if(!gasto.id || !gasto.valor) throw "Payload not valid"
  const isNotFound = getGasto(gasto.id) === null; 
  if(isNotFound){
    throw "ID not found in db"
  }
  const query = db.prepare(`
    UPDATE gastos
    SET valor = $valor
    WHERE id = $id
  `)
  const newGasto = {
    $id: gasto.id, 
    $valor: gasto.valor
  }
  query.run(newGasto); 
  return getGasto(gasto.id); 
}
type PayloadDescripcion = {
  id: string, 
  descripcion: string
}
export const changeDescripcion = (gasto : PayloadDescripcion) => {
  if(!gasto.id || !gasto.descripcion) throw "Payload not valid"
  const isNotFound = getGasto(gasto.id) === null; 
  if(isNotFound){
    throw "ID not found in db"
  }
  const query = db.prepare(`
    UPDATE gastos
    SET descripcion = $descripcion
    WHERE id = $id
  `)
  const newGasto = {
    $id: gasto.id, 
    $descripcion: gasto.descripcion
  }
  query.run(newGasto); 
  return getGasto(gasto.id); 
}
export const changeGasto = (gasto: DataPut): DataWithId => {
  if(getGasto(gasto.id) === null) throw 404
  const query = db.prepare(`
      UPDATE gastos
      SET 
      valor = $valor,
      descripcion = $descripcion, 
      dia = $dia, mes = $mes, ano = $ano
      WHERE id = $id
    `)
  const newValue = {
    $valor: gasto.valor, 
    $descripcion: gasto.descripcion, 
    $dia: gasto.dia, 
    $mes: gasto.mes, 
    $ano: gasto.ano
  }
  query.run({...newValue, $id:gasto.id})
  return getGasto(gasto.id); 
}
export const deleteGasto = (id: string) => {
  if(!id) throw "No id was provided"
  const isNotFound = getGasto(id) === null; 
  if(isNotFound){
    throw "ID not found in db"
  }
  const query = db.prepare(`
    DELETE FROM gastos WHERE id = $id
  `)
  query.run({$id: id})
  return getGastos(); 
} 

export const sumGastosMes = () : number => {
  const $mes_actual = getMonth(); 
  const getGastos = db.prepare(`
    SELECT SUM(valor) FROM gastos
    WHERE mes = $mes_actual
  `)
  const {"SUM(valor)": value} = getGastos.get($mes_actual) as { "SUM(valor)": number};
  return value
}