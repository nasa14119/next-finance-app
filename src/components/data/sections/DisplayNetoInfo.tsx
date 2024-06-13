"use client"

import { Fragment} from "react";
import { AgrupedDataValue, useAgrupatedMonthData } from "./hooks/useAgrupatedMonthData";
import {NetoRow} from "./NetoRow";
export function DisplayNetoInfo({data}: {data: AgrupedDataValue[]}) {
  const formatData = useAgrupatedMonthData(data); 
  return (
    <div>{
      formatData.map(([month, values]) => (
      <Fragment key={month}>
        <h2 className="capitalize text-xl ml-2 max-w-[500px] md:mx-auto">{month}</h2>
        <div className="flex gap-y-2 justify-start flex-col max-w-[500px] md:mx-auto">
          {values?.map(value => <NetoRow value={value} key={value.id}/>)}
        </div>
      </Fragment>
    ))}
    </div>
  )
}
