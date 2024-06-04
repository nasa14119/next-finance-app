"use client"
import moment from "moment";
import { useIngresosFijosData } from "src/context/app";
import { getDay, getMonth } from "src/utils";
moment.locale("es")
export const UltimoPago = () => {
  const data = useIngresosFijosData();
  if (data === null) {
    return <div>Ultimo Pago 00/00/0000</div>;
  }
  const time = moment({day: data.dia_entrada, month: data.mes_entrada-1})
  return (
    <div>
      Ultimo Pago {time.format("DD/MM/YYYY")}
    </div>
  );
};
export const ProximoPago = () => {
  const data = useIngresosFijosData();
  if (data === null) {
    return <div>Dias faltantes 00</div>;
  }
  const timeNextPago = moment({day: data.dia_entrada, month: data.mes_entrada-1}).add(1, "M")
  const time = timeNextPago.diff(moment(), "days")
  return (
    <div className="flex justify-end gap-x-2">
      <span>
        Dias faltantes proximo pago
      </span>
      <span className="block text-white bg-secondary/20 px-2 rounded-3xl text-sm tabular-nums w-7 text-center">
        {time}
      </span>
    </div>
  );
};
function BtnPagoRecibido() {
  return (
    <div className="flex justify-end gap-x-2">
      <button className="rounded-3xl bg-primary px-2">Dinero Recibido</button>
    </div>
  );
}
function BtnUndoPagoRecibido() {
  return (
    <button className="rounded-3xl bg-dager px-2 relative group">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-3"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18 18 6M6 6l12 12"
        />
      </svg>
      <span className="absolute text-xs -top-5 w-max -left-12 invisible group-hover:visible bg-dager rounded-3xl px-2">no recibi el dinero</span>
    </button>
  );
}
function BtnPagoRecibidoWithDelay() {
  return (
    <div className="absolute w-40">
      <button className="rounded-3xl bg-primary px-2 w-full invisible group-hover:visible">
        Dinero Recibido
      </button>
    </div>
  );
}
export const DiasFaltantes = () => {
  const data = useIngresosFijosData();
  if (data === null) {
    return <div>00</div>;
  }
  const time = moment({day: data.dia_entrada, month: data.mes_entrada -1})
  const isPass = moment().isAfter(time)
  const daysRetraso = time.diff(moment(), "days")
  if (isPass && data.isDelay) {
    return (
      <div className="flex justify-end gap-x-2 group relative cursor-pointer z-50">
        <span>Dias de retraso</span>
        <span className="block text-white bg-dager/20 px-2 rounded-3xl text-sm tabular-nums w-7 text-center">
          {daysRetraso * -1}
        </span>
        <BtnPagoRecibidoWithDelay/>
      </div>
    );
  }
  console.log(data);
  if(data.time_delay > 0 && !data.isDelay){
    return (
      <div className="flex justify-end gap-x-2 relative z-50">
        <span>Recibido con Retraso</span>
        <BtnUndoPagoRecibido />
        <span className="block text-white bg-yellow/40 px-2 rounded-3xl text-sm tabular-nums w-7 text-center">
          {data.time_delay}
        </span>
      </div>
    );
  }
  return <BtnPagoRecibido/>
};