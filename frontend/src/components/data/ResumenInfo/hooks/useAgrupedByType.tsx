import { useDataDB } from "@context/data"
import { Data } from "@context/types";
import moment from "moment";
import { groupBy } from "src/utils";
const month = moment().get("M") + 1
type ReturnedObejct = {
  ingresos: Data[], 
  gastos: Data[]
} 
export const useAgrupedByType = () : ReturnedObejct | null => {
  const data = useDataDB()
  if(data.length <= 0) return null
  const filterThisMonth = data.filter(v => v.mes === month)
  const agrupedData = groupBy(filterThisMonth, (value:Data) => value.type === "ingreso" ? "ingresos": "gastos")
  return agrupedData
}

