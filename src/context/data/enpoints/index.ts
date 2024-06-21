import { ResponseApiData } from "@context/types"

export const getAhorros = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DB}/ingreso`, {
    headers: {
      "Content-Type": "application/json"
    }, 
    method: "GET"
  })
  return await res.json() as ResponseApiData[]
}
export const getGastos = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DB}/gastos`, {
    headers: {
      "Content-Type": "application/json"
    }, 
    method: "GET"
  })
  return await res.json() as ResponseApiData[]
}

export const getSaldo = async () => {
  let ingresos = await getAhorros(); 
  const gastos = await getGastos(); 
  return [...ingresos, ...gastos]
}