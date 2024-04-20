import "./styles.css"

import React, { useState } from "react"
export function GraficoCircular({value = 0, total = 0}: {value: number, total : number}) {
  const porcentage =  (value*100)/total
  return (
    <div className="graficoCirlarContainer">
      <div className="graficoCirular" style={{"--value": porcentage} as React.CSSProperties}></div>
      <div className="porcentage">
        <div className="text-center text-[3rem] md:text-[4rem] flex gap-x-2 items-end">
          <span className="leading-[0.7]">{value}</span>
          <span className="leading-none text-sm">{Math.round(porcentage)}%</span>
        </div>
      </div>
    </div>
  );
}
