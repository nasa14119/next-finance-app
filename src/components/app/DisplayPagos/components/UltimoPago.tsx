import moment from "moment";
import { ResponseIngreso } from "@context/types";

export function UltimoPago({data}:{data: ResponseIngreso}){
  const time = moment({day: data.dia_entrada, month: data.mes_entrada})
  return (
    <div>
      Ultimo Pago {time.format("DD/MM/YYYY")}
    </div>
  );
};