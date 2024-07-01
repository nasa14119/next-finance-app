import { Data, ResponseApiData } from "@context/types"

export const getAhorros = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DB}/ingresos`, {
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
export const deleteIdDB = async (id:string, type: "ingreso" | "gasto") => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_DB}/${
        type === "ingreso" ? "ingresos" : "gastos"
      }`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
        body: JSON.stringify({ id }),
      }
    );
    return await res.json() as Data[]
  } catch (error) {
    throw "Something went wrong in the request"
  }
}