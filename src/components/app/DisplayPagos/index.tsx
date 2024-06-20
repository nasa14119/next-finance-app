"use client"
import moment from "moment";
import { useIngresosFijosData} from "src/context/app";
import DiasFaltantes from "./components/DiasFaltantes";
import { UltimoPago } from "./components/UltimoPago";
import { ProximoPago } from "./components/ProximoPago";
moment.locale("es")

export function DisplayPagos() {
  const data = useIngresosFijosData(); 
  if(data === null) return null
  return (
    <header className="absolute top-2 right-4 left-4 grid grid-col-1 text-[12px] lg:text-sm text-right gap-y-2 2xl:w-3/5 2xl:left-auto z-20">
      <UltimoPago data={data}/>
      <ProximoPago data={data}/>
      <DiasFaltantes data={data}/>
    </header>
  );
}