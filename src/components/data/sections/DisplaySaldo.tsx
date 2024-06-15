"use client"

import { Fragment} from "react";
import { AgrupedDataValue, useAgrupatedMonthData } from "./hooks/useAgrupatedMonthData";
import SaldoRow from "./SaldoRow";
import { useDataDB } from "@context/data/index";
export function DisplaySaldo() {
  const data : AgrupedDataValue[] = useDataDB(); 
  const formatData = useAgrupatedMonthData(data); 
  return (
    <div>{
      formatData.map(([month, values]) => (
      <Fragment key={month}>
        <h2 className="capitalize text-xl max-w-[500px] md:mx-auto">{month}</h2>
        <div className="flex gap-y-2 justify-start flex-col max-w-[500px] md:mx-auto text-sm">
          {values?.map(value => <SaldoRow value={value} ingreso={value.ingreso} key={value.id}/>)}
        </div>
      </Fragment>
    ))}
    </div>
  )
}
