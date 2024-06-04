
export type ResponseIngreso = {
  valor: number,
  dia_entrada: number,
  mes_entrada: number,
  ano_entrada: number,
  isDelay: boolean,
  isPay: boolean, 
  time_delay: number,
  estado: number,
}
export type ResponseUseIngresosFijos = [
  null | ResponseIngreso, 
  {
    changeValue : (param: null | ResponseIngreso) => void,
    reFetchValues: () => void 
  }
]
export type AhorroData = {
  id: string, 
  valor: number, 
  descripcion: string, 
  dia: number, 
  mes: number, 
  ano: number
}
export type GastoData = {
  id: string, 
  valor: number, 
  descripcion: string, 
  dia: number, 
  mes: number, 
  ano: number
}
export type AhorroMethods = {
  pushNewValue : (value: AhorroNewValue) =>  void
}
export type useGastosReturn = [
  GastoData[], 
  GastosMutations
]
export type GastosMutations = {
  pushNewValue: (value: GastoData) => void
}
export type GastosData = {
  id: string, 
  valor: number, 
  descripcion: string, 
  dia: number, 
  mes: number, 
  ano: number
}
export type ContextApp = {
  ingresos_fijos: ResponseIngreso | null, 
  setIngresosMethods: ResponseUseIngresosFijos[1], 
  ahorro: [AhorroData[] | null, AhorroMethods],
  gastos: GastoData[], 
  setGastosMethods: GastosMutations
}
export type AhorroNewValue = {
  valor: number,
  descripcion: string,
  dia: number,
  mes: number,
  ano: number
}