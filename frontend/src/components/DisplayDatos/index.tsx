import { RowData } from "@components/RowData";
import { DataDisplay } from "./types";
import moment from "moment";
type Props = {
  data: DataDisplay[], 
  type: "ingresos" | "gasto", 
  className?: string, 
}
const ingreosStyles = "bg-gradient-to-br from-accent/30 to-secondary/30"; 
const gastosStyles = "bg-gradient-to-r from-rose/30 to-pink/30 "; 
const MONTH = moment().get("M") + 1; 
export const DisplayDatos = ({data, type, className, ...rest}:Props) => {
  const defaultStyles = type === "ingresos" ? ingreosStyles: gastosStyles; 
  const filtededData:DataDisplay[] = data.filter(v => v.mes === MONTH); 
  const sumOfData = filtededData.reduce((prev, current) => prev + current.valor, 0)
  return (
    <section className={`relative grid grid-cols-1 [grid-template-rows:15%_1fr] ${defaultStyles} ${className}`} {...rest}>
      <a href={`/data/${type === "ingresos" ? "ingresos": "gastos"}`}>
        <h2>{type === "ingresos" ? "Ingresos": "Gastos"}</h2>
      </a>
      <div className="w-full h-full max-h-full md:max-h-[90%] overflow-y-scroll">
        {filtededData.map(value => <RowData key={value.id} title={value.descripcion} value={value.valor} {...value} /> )}
      </div>
      <span className="absolute right-2 bottom-2 text-sm bg-primary/85 px-3 rounded-lg">total: ${sumOfData ?? 0}</span>
    </section>
  );
}
