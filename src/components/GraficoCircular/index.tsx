"use client"
import "./styles.css"

import React, {useEffect, useState} from "react"
import { useData } from "./useData";
export function GraficoCircular() {
  const data = useData(); 
  const porcentage = data.total > 0 ? (data.value*100) / data.total: 0
  return (
    <div className="graficoCirlarContainer">
      <div className="graficoCirular" style={{"--value": porcentage} as React.CSSProperties}></div>
      <div className="porcentage">
        <div className="text-center text-[3rem] md:text-[4rem] flex gap-x-2 items-end">
          <span className="leading-[0.7]">{data.value}</span>
          <span className="leading-none text-sm">{Math.round(porcentage)}%</span>
        </div>
      </div>
    </div>
  );
}
