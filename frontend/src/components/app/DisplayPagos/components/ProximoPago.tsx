import { PillNumber } from "./PillNumber";

export function ProximoPago ({time_nextpaymente}: {time_nextpaymente: number}){
  return (
    <div className="flex justify-end gap-x-2">
      <span>
        Dias faltantes proximo pago
      </span>
      <PillNumber body={time_nextpaymente} className={"bg-secondary/20"}/>
    </div>
  );
};