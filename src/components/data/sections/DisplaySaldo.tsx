"use client"

import { Fragment} from "react";
import { AgrupedDataValue, useAgrupatedMonthData } from "./hooks/useAgrupatedMonthData";
import SaldoRow from "./SaldoRow";
import { useAllMonths, useDataDB } from "@context/data/index";
import { LoadingSkeletonData } from "../LoadingSkeletonData";
import moment from "moment";
const getSumMonth = (data: AgrupedDataValue[]) => {
  const inicialValue = {total: 0, ingresos: 0, gastos: 0}
  return data.reduce((prev: typeof inicialValue, v) => {
    if(v.ingreso){
      prev.total += v.valor 
      prev.ingresos +=v.valor
    }else{
      prev.total -= v.valor 
      prev.gastos +=v.valor
    }
    return prev
  },inicialValue)
}
const month = moment().format("MMMM"); 
export function DisplaySaldo() {
  const isActive = useAllMonths()
  const data : AgrupedDataValue[] = useDataDB(); 
  const formatData = useAgrupatedMonthData(data);
  if(isActive === null ) return <LoadingSkeletonData/>
  if(isActive) return (
    <div>
      {
        formatData.filter(([v]) => v === month).map(([month, values]) => {
          const totals = getSumMonth(values)
          return (
            <Fragment key={month}>
              <span className="flex flex-col max-w-[500px] my-3 md:mx-auto">
                <h2 className="capitalize text-xl md:text-left">{month}</h2>
                <div className="mx-2 grid items-end [grid-template-columns:3rem_3rem_3rem]">
                  <strong className="text-sm">${totals.total}</strong>
                  <strong className="text-sm text-accent">${totals.ingresos}</strong>
                  <strong className="text-sm text-dager">${totals.gastos}</strong>
                </div>
              </span>
              <div className="flex gap-y-2 justify-start flex-col max-w-[500px] md:mx-auto text-sm">
                {values?.map(value => <SaldoRow value={value} ingreso={value.ingreso} key={value.id}/>)}
              </div>
            </Fragment>
          ) 
        })
      }
    </div>    
  )
  return (
    <div>
      {
        formatData.map(([month, values]) => {
          const totals = getSumMonth(values)
          console.log(totals);
          return (
            <Fragment key={month}>
              <span className="flex flex-col max-w-[500px] my-3 md:mx-auto">
                <h2 className="capitalize text-xl md:text-left">{month}</h2>
                <div className="mx-2 grid items-end [grid-template-columns:3rem_3rem_3rem]">
                  <strong className="text-sm">${totals.total}</strong>
                  <strong className="text-sm text-accent">${totals.ingresos}</strong>
                  <strong className="text-sm text-dager">${totals.gastos}</strong>
                </div>
              </span>
              <div className="flex gap-y-2 justify-start flex-col max-w-[500px] md:mx-auto text-sm">
                {values?.map(value => <SaldoRow value={value} ingreso={value.ingreso} key={value.id}/>)}
              </div>
            </Fragment>
          ) 
        })
      }
    </div>
  )
}
