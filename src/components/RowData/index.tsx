type Props = {
  title: string, 
  value:number, 
  dia: number, 
  mes: number, 
  ano: number,
}
export function RowData(info:Props) {
  return (
    <ul className="grid grid-rows-1 [grid-template-columns:1fr_1fr_50%] text-xs md:text-base md:[grid-template-columns:1fr_25%_30%]">
      <li>{info.title}</li>
      <li className="text-center md:text-left">${info.value}</li>
      <li className="text-right">fecha: {info.dia}/{info.mes}/20{info.ano}</li>
    </ul>
  )
}