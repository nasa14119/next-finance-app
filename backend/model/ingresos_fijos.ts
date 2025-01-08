import { z } from "zod"
import { db } from "../db"
import { formatDateRes, getLastPayment} from "../utils"
import moment from "moment"
const IngresosFijos = z.object({
  valor: z.number(), 
  dia_entrada: z.number(), 
  mes_entrada: z.number(),
  ano_entrada: z.number(), 
  isDelay: z.coerce.boolean(),
  isPay: z.coerce.boolean(),
  time_delay: z.number(),
  estado: z.number(), 
})
export type IngresosFijos = z.infer<typeof IngresosFijos>
export interface FormatIngresosFijos extends IngresosFijos {
  id ?: number, 
  format_date: string
}
export const getIngresosFijos = () : FormatIngresosFijos => {
  const query = db.query("SELECT * FROM ingresos_fijos"); 
  const res = query.get() as FormatIngresosFijos
  delete res.id
  res.format_date = formatDateRes(res); 
  return res; 
}
export const updateValorIngresosFijos = (new_valor: number) : FormatIngresosFijos => {
  const query = db.query(`
    UPDATE ingresos_fijos
    SET valor = $valor
  `)
  query.run({$valor: new_valor}); 
  return getIngresosFijos(); 
}
export const checkDelayTime = () => {
  const dia_pago_esperado = getLastPayment(); 
    let $time_delay = moment().diff(dia_pago_esperado, "days"); 
    const query = db.prepare(`
      UPDATE ingresos_fijos 
      SET time_delay = $time_delay
    `)
    query.run({$time_delay});
    return
}
export const checkOnTime = () => {
  const expectedPay = getLastPayment(); 
  const $isDelay = moment().isBefore(expectedPay); 
  const query = db.query("UPDATE ingresos_fijos SET isDelay = $isDelay"); 
  query.run({$isDelay: Number(!$isDelay)}); 
  return $isDelay; 
}
export const dineroNoRecibido = () => {
  const query = db.query(`
    UPDATE ingresos_fijos
    SET time_delay = 0, isPay = 0
  `)
  query.run(); 
  if(!checkOnTime()){
    checkDelayTime(); 
  } 
  return 
}
export const dineroRecibido = () => {
  dineroNoRecibido(); 
  const $mes_actual = getLastPayment().add(1, "M").get("M"); 
  const query = db.query(`
    UPDATE ingresos_fijos
    SET mes_entrada = $mes_actual, isPay = 1; 
  `)
  query.run({$mes_actual});
  return 
}
export const dineroRecibidoUndo = () => {
  const lastMonth = getLastPayment().subtract(1, "M").get("M"); 
  const query = db.query(`
  UPDATE ingresos_fijos
  SET mes_entrada = $mes_actual, isPay = 0; 
`)
  query.run({ $mes_actual: lastMonth });
  dineroNoRecibido(); 
}
export const configDiaEntrada = ({dia, mes, ano}:{dia:number, mes: number, ano:number}) =>{
  const query = db.query(`
    UPDATE ingresos_fijos
    SET dia_entrada = $dia_update, 
        mes_entrada = $mes_update,
        ano_entrada = $ano_update; 
  `)
  query.run({
    $dia_update: dia, 
    $mes_update: mes, 
    $ano_update: ano
  })
  checkDelayTime(); 
  return getIngresosFijos(); 
}