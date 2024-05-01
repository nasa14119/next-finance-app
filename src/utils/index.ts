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