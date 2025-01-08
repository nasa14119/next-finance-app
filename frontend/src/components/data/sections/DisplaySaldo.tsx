"use client"

import { Fragment} from "react";
import { useAgrupatedMonthData } from "./hooks/useAgrupatedMonthData";
import SaldoRow from "./SaldoRow";
import { useAllMonths, useDataDB } from "@context/data/index";
import { LoadingSkeletonData } from "../LoadingSkeletonData";
import moment from "moment";
import { Data } from "@context/types";
const getSumMonth = (data: Data[]) => {
  const inicialValue = {total: 0, ingresos: 0, gastos: 0}
  return data.reduce((prev: typeof inicialValue, v) => {
    if(v.type === "ingreso"){
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
const DisplayResumenMonth = ({values}:{values:Data[]}) => {
  const totals = getSumMonth(values)
  return (
    <span className="flex flex-col max-w-[500px] my-3 md:mx-auto">
      <h2 className="capitalize text-xl md:text-left">{month}</h2>
      <div className="mx-3 grid items-end [grid-template-columns:auto_auto_auto] justify-start gap-x-2">
        <strong className="text-sm">Saldo ${totals.total}</strong>
        <strong className="text-xs text-accent">
          Ingresos: ${totals.ingresos}
        </strong>
        <strong className="text-xs text-dager">Gastos ${totals.gastos}</strong>
      </div>
    </span>
  );
}
export function DisplaySaldo() {
  const isActive = useAllMonths()
  const data : Data[] = useDataDB(); 
  const formatData = useAgrupatedMonthData(data);
  if(isActive === null ) return <LoadingSkeletonData/>
  if(!isActive) return (
    <div>
      {
        formatData.filter(([v]) => v === month).map(([month, values]) => {
          return (
            <Fragment key={month}>
              <DisplayResumenMonth values={values}/>
              <div className="flex gap-y-2 justify-start flex-col max-w-[500px] md:mx-auto text-sm">
                {values?.map(value => <SaldoRow value={value} key={value.id}/>)}
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
          return (
            <Fragment key={month}>
              <DisplayResumenMonth values={values}/>
              <div className="flex gap-y-2 justify-start flex-col max-w-[500px] md:mx-auto text-sm">
                {values?.map(value => <SaldoRow value={value} key={value.id}/>)}
              </div>
            </Fragment>
          ) 
        })
      }
    </div>
  )
}
