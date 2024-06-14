"use client"

import moment from "moment"
import { ResumenCol } from "./components/ResumenCol"
import { useAgrupedByType } from "./hooks/useAgrupedByType"
import { AhorroData } from "@context/types"

const getSum = (data: AhorroData[]) => {
  return data.reduce((prev, value) => prev +  value.valor , 0)
}
export function ResumenInfo() {
  const data = useAgrupedByType()
  if(!data) return null
  const totalIngreso = getSum(data.ingresos)
  const totalGastos = getSum(data.gastos)
  const total = totalIngreso + totalGastos
  const porcentajeIngresos = `${(totalIngreso / total) * 100}%`
  const porcentajeGastos = `${(totalGastos / total) * 100}%`
  return (
    <>
      <h2 className="capitalize text-xl max-w-[500px] md:mx-auto">Resumen <strong className="capitalize">{moment().format("MMMM")}</strong></h2>
      <article className="max-h-[30vh] md:max-h-[50vh] grid [grid-template-rows:1fr_2rem] mb-5 gap-y-2 max-w-[300px] md:mx-auto">
        <div className="grid [grid-template-rows:max-content_1fr] grid-cols-2 w-full h-full overflow-y-scroll gap-x-2">
          <h3 className="text-sm md:text-base text-accent">Ingresos</h3>
          <h3 className="text-sm md:text-base text-rose">Gastos</h3>
          <ResumenCol data={data.ingresos} />
          <ResumenCol data={data.gastos} />
        </div>
        <div className="h-full w-full rounded-[0.5rem] flex *:flex justify-between max-w-[300px] *:items-center overflow-hidden">
          <div className="bg-accent h-full pl-2" style={{width:porcentajeIngresos }}>{totalIngreso}</div>
          <div className="bg-rose h-full w-full justify-end pr-2" style={{width: porcentajeGastos}}>{totalGastos}</div>
        </div>
      </article>
    </>
  );
}
