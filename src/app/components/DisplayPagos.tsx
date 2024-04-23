"use client"
import { useIngresosFijosData } from "src/context/app";
import { getDay, getMonth } from "src/utils";

export const UltimoPago = () => {
  const data = useIngresosFijosData();
  if (data === null) {
    return <div>Ultimo Pago 00/00/0000</div>;
  }
  const dia = data.dia_entrada < 10 ? "0" + data.dia_entrada : data.dia_entrada;
  const mes = data.mes_entrada < 10 ? "0" + data.mes_entrada : data.mes_entrada;
  const ano = "20" + data.ano_entrada;
  return (
    <div>
      Ultimo Pago {dia}/{mes}/{ano}
    </div>
  );
};
export const ProximoPago = () => {
  const data = useIngresosFijosData();
  if (data === null) {
    return <div>Siguiente Pago 00/00/0000</div>;
  }
  const dia = data.dia_entrada < 10 ? "0" + data.dia_entrada : data.dia_entrada;
  const mes = data.mes_entrada + 1 < 10 ? "0" + (data.mes_entrada + 1): data.mes_entrada
  const ano = "20" + data.ano_entrada;
  return (
    <div>
      Siguiente Pago {dia}/{mes}/{ano}
    </div>
  );
};
export const DiasFaltantes = () => {
  const data = useIngresosFijosData();
  if (data === null) {
    return <div>00</div>;
  }
  const {mes_entrada, dia_entrada} = data
  const mes_actual = getMonth(); 
  const dia_actual = getDay(); 
  const isPass = (mes_actual >= mes_entrada && dia_actual > dia_entrada)
  if(isPass){
    return <div >
      <span className="text-white bg-dager/20 px-2 rounded-3xl text-sm">
        {dia_actual - dia_entrada}
      </span>
    </div>
  }
  return <div >
  <span className="text-white bg-accent/20 px-2 rounded-3xl text-sm">
    {dia_entrada - dia_actual}
  </span>
</div>
};