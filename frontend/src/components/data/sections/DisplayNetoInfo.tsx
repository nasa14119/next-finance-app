"use client"

import { Fragment, useEffect, useState} from "react";
import { useAgrupatedMonthData } from "./hooks/useAgrupatedMonthData";
import {NetoRow} from "./NetoRow";
import { useAllMonths, useDataDB } from "@context/data";
import moment from "moment";
import { LoadingSkeletonData } from "../LoadingSkeletonData";
import { Data } from "@context/types";
const month = moment().get("M") + 1;
export function DisplayNetoInfo() {
  const data = useDataDB()
  const isAllMonths = useAllMonths(); 
  const dataCurrentMonth = data.filter(v => v.mes === month)
  const [displayData, setDisplayData] = useState(dataCurrentMonth)
  const formatData = useAgrupatedMonthData(displayData); 
  useEffect(() =>{
    setDisplayData((prev) => {
      if(isAllMonths){
        return data 
      }
      return prev.filter(v => v.mes === month)
    })
  },[data, isAllMonths])
  if(isAllMonths === null) return <LoadingSkeletonData />
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
