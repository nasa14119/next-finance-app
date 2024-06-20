
export type ResponseApiData = {
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
  dia: number, 
  mes: number, 
  ano: number
}
export type newData = {
  valor: number, 
  descripcion: string, 
  dia: number, 
  mes: number, 
  ano: number
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
  ingresos_fijos: ResponseApiData | null, 
  setIngresosMethods: ResponseUseIngresosFijos[1], 
  ahorro: Data[], 
  setAhorroMethods: useAhorroMethods, 
  gastos: Data[], 
  setGastosMethods: GastosMutations
}