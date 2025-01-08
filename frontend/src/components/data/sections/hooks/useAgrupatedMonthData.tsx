import { useMemo } from "react";
import { Data } from "src/context/types"
import { getStringMonth, groupBy, sortByMonth } from "src/utils";

export const useAgrupatedMonthData = (data:Data[]):[string, Data[]][] => {
  return useMemo(
    () => {
      //@ts-ignore
      const grupedByMonth = groupBy(sortByMonth(data), (data) => getStringMonth(data.mes))
      const arrayOfValues = Object.entries(grupedByMonth) 
      return arrayOfValues as [string, Data[]][]
    },
    [data]
  );
}
