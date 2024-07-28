import moment from "moment";
import {BtnPagoRecibido,BtnPagoRecibidoWithDelay, BtnUndoPagoRecibido} from "./Btn"
import { PillNumber } from "./PillNumber";
import { ResponseApiData } from "@context/types";

const DangerPill = ({time}: {time:number}) => (
  <div className="flex justify-end gap-x-2 group relative cursor-pointer z-50">
    <span>Dias de retraso</span>
    <span className="block text-white bg-dager/20 rounded-3xl text-sm tabular-nums w-7 text-center">
      {time}
    </span>
    <BtnPagoRecibidoWithDelay/>
  </div>
);
const AlertPill = ({time} : {time:number}) => {
  return(<div className="flex justify-end gap-x-2 relative z-50">
    <span>Recibido con Retraso</span>
    <BtnUndoPagoRecibido />
    <PillNumber className="bg-yellow/50 cursor-pointer relative group" body={time}>
      <span className="absolute text-xs -top-5 w-max -left-12 invisible group-hover:visible bg-primary rounded-3xl px-2">Dinero Recibido</span>
    </PillNumber>
  </div>)
}

export function DiasFaltantes({time_delay, days_retraso}: {time_delay: number, days_retraso: number}){
  if (days_retraso) {
    return <DangerPill time={days_retraso}/>
  }

  if(time_delay > 0){
    return <AlertPill time={time_delay}/>
  }

  return <BtnPagoRecibido/>
}