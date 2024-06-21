import moment from "moment";
import { usePaymentMethods } from "src/context/endpoints/ingresos-fijos";
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
  const {PaymentMade} = usePaymentMethods()
  return(<div className="flex justify-end gap-x-2 relative z-50">
    <span>Recibido con Retraso</span>
    <BtnUndoPagoRecibido />
    <PillNumber className="bg-yellow/50 cursor-pointer relative group" onClick={PaymentMade} body={time}>
      <span className="absolute text-xs -top-5 w-max -left-12 invisible group-hover:visible bg-primary rounded-3xl px-2">Dinero Recibido</span>
    </PillNumber>
  </div>)
}

export default function DiasFaltantes({data}: {data: ResponseApiData}){
  const time = moment({day: data.dia_entrada, month: data.mes_entrada})
  const isPass = moment().isAfter(time)
  const daysRetraso = time.diff(moment(), "days")
  if (isPass && !data.isPay) {
    return <DangerPill time={daysRetraso * -1}/>
  }

  if(data.time_delay > 0 && data.isPay){
    return <AlertPill time={data.time_delay}/>
  }

  return <BtnPagoRecibido/>
}