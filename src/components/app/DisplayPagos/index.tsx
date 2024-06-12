"use client"
import moment from "moment";
import { useIngresosFijosData} from "src/context/app";
import { ResponseIngreso } from "src/context/types";
import DiasFaltantes from "./components/DiasFaltantes";
import { PillNumber } from "./components/PillNumber";
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
function UltimoPago({data}:{data: ResponseIngreso}){
  const time = moment({day: data.dia_entrada, month: data.mes_entrada})
  return (
    <div>
      Ultimo Pago {time.format("DD/MM/YYYY")}
    </div>
  );
};
function ProximoPago ({data}:{data: ResponseIngreso}){
  const timeNextPago = moment({day: data.dia_entrada, month: data.mes_entrada + 1})
  const time = timeNextPago.diff(moment(), "days")
  return (
    <div className="flex justify-end gap-x-2">
      <span>
        Dias faltantes proximo pago
      </span>
      <PillNumber body={time} className={"bg-secondary/20"}/>
    </div>
  );
};