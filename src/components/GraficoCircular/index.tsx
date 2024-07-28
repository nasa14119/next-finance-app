"use client"
import { useIngresosFijosData } from "@context/app/ingresos_fijos"
import "./styles.css"

import React, {useEffect, useState} from "react"
export function GraficoCircular() {
  const info = useIngresosFijosData(); 
  if(!info) return null
  const {month_budget, month_state} = info
  const porcentage = month_budget > 0 ? (month_state * 100) / month_budget: 0
  return (
    <div className="graficoCirlarContainer">
      <div className="graficoCirular" style={{"--value": porcentage} as React.CSSProperties}></div>
      <div className="porcentage">
        <div className="text-center text-[3rem] md:text-[4rem] flex gap-x-2 items-end">
          <span className="leading-[0.7]">{month_state}</span>
          <span className="leading-none text-sm">{Math.round(porcentage)}%</span>
        </div>
      </div>
    </div>
  );
}
