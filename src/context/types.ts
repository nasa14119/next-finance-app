export type ResponseIngreso = {
  valor: number,
  dia_entrada: number,
  mes_entrada: number,
  ano_entrada: number,
  isDelay: boolean,
  time_delay: number,
  estado: number,
}
export type ContextApp = {
  ingresos_fijos: ResponseIngreso | null
}