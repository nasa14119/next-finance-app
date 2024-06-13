import { AgrupedDataValue } from "@components/data/sections/hooks/useAgrupatedMonthData";
import moment from "moment";
import "moment/locale/es"
import { AhorroData } from "src/context/types";

export const getStringMonth = (m:number) => {
  moment.locale("es")
  const date = moment({month: m - 1})
  return date.format("MMMM"); 
}
export const getMonth = (): number =>{
  const date = new Date(); 
  return date.getMonth() + 1; 
}
export const getDay = (): number =>{
  const date = new Date(); 
  return date.getDate(); 
}
export const getYear = (): number =>{
  const date = new Date(); 
  return date.getFullYear(); 
}
const addCommas = (num:string)=> num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
export const removeNonNumeric = (num:string) => num.replace(/[^0-9]/g, "");
export const getFormatedNumber = (num:string) => addCommas(removeNonNumeric(num))

export const sortByMonth = (array : AgrupedDataValue[]) => {
  const checkDate = (date1: {month:number, day:number}, date2 : {month:number, day:number}) => {
    return moment(date1).isBefore(date2) ? 1 : -1; 
  }
  array.sort((a, b) => checkDate({month:a.mes, day: a.dia}, {month: b.mes, day:b.dia}))
  return array
} 
export function groupBy<T>(arr:T[], callback:any ){
  return arr.reduce((acc:any = {}, ...args) => {
    const key = callback(...args);
    acc[key] ??= []
    acc[key].push(args[0]);
    return acc;
  }, {});
}