"use client"
import moment from "moment";
import {DiasFaltantes} from "./components/DiasFaltantes";
import { UltimoPago } from "./components/UltimoPago";
import { ProximoPago } from "./components/ProximoPago";
import { useIngresosFijosData } from "@context/app/ingresos_fijos";
moment.locale("es")

export function DisplayPagos() {
  const data = useIngresosFijosData(); 
  if(!data) return null 
  return (
    <header className="absolute top-2 right-4 left-4 grid grid-col-1 text-[12px] lg:text-sm text-right gap-y-2 2xl:w-3/5 2xl:left-auto z-20">
      <UltimoPago last_payment={data.last_payment}/>
      <ProximoPago time_nextpaymente={data.time_nextpaymente}/>
      <DiasFaltantes  days_retraso={data.time_delay} time_delay={data.time_delay}/>
    </header>
  );
}