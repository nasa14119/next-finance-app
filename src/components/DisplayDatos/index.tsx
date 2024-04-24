import { RowData } from "@components/RowData";
import { DataDisplay } from "./types";
type Props = {
  data: DataDisplay[], 
  type: "ingresos" | "gasto", 
  className?: string, 
}
const ingreosStyles = "bg-gradient-to-br from-accent/30 to-secondary/30"; 
const gastosStyles = "bg-gradient-to-r from-rose/30 to-pink/30 "; 
export const DisplayDatos = ({data, type, className}:Props, ...rest:any) => {
  const defaultStyles = type === "ingresos" ? ingreosStyles: gastosStyles; 
  const sumOfData = data.reduce((prev, current) => prev + current.valor,0)
  return (
    <section className={`relative grid grid-cols-1 [grid-template-rows:15%_1fr] ${defaultStyles} ${className}`} {...rest}>
      <a href={`/data/${type === "ingresos" ? "ingresos": "gastos"}`}>
        <h2>{type === "ingresos" ? "Ingresos": "Gastos"}</h2>
      </a>
      <div className="w-full h-full max-h-full overflow-y-scroll">
        {data.map(value => <RowData key={value.id} ano={value.ano} dia={value.dia} mes={value.mes} title={value.descripcion} value={value.valor}/> )}
      </div>
      <span className="absolute right-2 bottom-2 text-sm">total: ${sumOfData}</span>
    </section>
  );
}
