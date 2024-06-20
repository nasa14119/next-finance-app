import moment from "moment";
import { ResponseIngreso } from "@context/types";
import { PillNumber } from "./PillNumber";

export function ProximoPago ({data}:{data: ResponseIngreso}){
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