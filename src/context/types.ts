
export type ResponseApiData = {
  valor: number,
  dia_entrada: number,
  mes_entrada: number,
  ano_entrada: number,
  isDelay: boolean,
  isPay: boolean, 
  time_delay: number,
  estado: number,
  format_date: string
}
export type IngresosFijosContext = {
  month_state: number, 
  month_budget: number, 
  last_payment: string, 
  time_nextpaymente: number, 
  time_delay: number, 
}
export type ResponseUseIngresosFijos = [
  null | ResponseApiData, 
  {
    changeValue : (param: null | ResponseApiData) => void,
    reFetchValues: () => void 
  }
]
export type Data = {
  id: string, 
  valor: number, 
  descripcion: string, 
  type: "ingreso" | "gasto",  
  dia: number, 
  mes: number, 
  ano: number
}
export type newData = {
  valor: number, 
  descripcion: string, 
  dia: number, 
  mes: number, 
  ano: number, 
  type: "ingreso" | "gasto",  
}
export type useAhorroMethods = {
  pushNewValue : (value: AhorroNewValue) =>  void
}
export type useGastosReturn = [
  Data[], 
  GastosMutations
]
export type GastosMutations = {
  pushNewValue: (value: newData) => void
}

export type AhorroNewValue = {
  valor: number,
  descripcion: string,
  dia: number,
  mes: number,
  ano: number
}

export type ContextApp = {
  ahorro: Data[], 
  setAhorroMethods: useAhorroMethods, 
  gastos: Data[], 
  setGastosMethods: GastosMutations
}