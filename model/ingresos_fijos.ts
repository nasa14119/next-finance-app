import { z } from "zod"
import { db } from "../db"
import { formatDateRes, getDay, getMonth } from "../utils"
import moment from "moment"
const IngresosFijos = z.object({
  valor: z.number(), 
  dia_entrada: z.number(), 
  mes_entrada: z.number(),
  ano_entrada: z.number(), 
  isDelay: z.coerce.boolean(),
  time_delay: z.number(),
  estado: z.number(), 
})
export type IngresosFijos = z.infer<typeof IngresosFijos>
export interface FormatIngresosFijos extends IngresosFijos {
  id ?: number, 
  format_date: string
}
export const getIngresosFijos = () : FormatIngresosFijos =>{
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
  const {dia_entrada, mes_entrada, isDelay : notPay } =  getIngresosFijos();
  const dia_actual = getDay(); 
  if (dia_entrada > dia_actual && !notPay) {
    const query = db.prepare(`
    UPDATE ingresos_fijos 
    SET isDelay = 0, time_delay = 0
  `)
    query.run(); 
    return getIngresosFijos();
  }
  const lastPayment = moment({day: dia_entrada, month: mes_entrada})
  let $time_delay = lastPayment.diff(moment(), "days")
  const query = db.prepare(`
    UPDATE ingresos_fijos 
    SET isDelay = 1, time_delay = $time_delay
  `)
  query.run({$time_delay});
  const {isDelay, time_delay} = getIngresosFijos(); 
  return {isDelay, time_delay} ; 
}
export const dineroNoRecibido = () => {
  checkDelayTime(); 
  const { mes_entrada } = getIngresosFijos(); 
  const query = db.query(`
    UPDATE ingresos_fijos
    SET isDelay = 1, mes_entrada = $mes_entrada 
  `)
  query.run({$mes_entrada:mes_entrada - 1}); 
  const {isDelay} = getIngresosFijos(); 
  return isDelay ; 
}
export const dineroRecibido = () => {
  const { time_delay } = checkDelayTime(); 
  const $mes_actual = getMonth()
  const query = db.query(`
    UPDATE ingresos_fijos
    SET isDelay = 0, mes_entrada = $mes_actual; 
  `)
  query.run({$mes_actual});
  return time_delay;
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