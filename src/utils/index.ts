export const getMonth = (): number =>{
  const date = new Date(); 
  return date.getMonth() + 1; 
}
export const getDay = (): number =>{
  const date = new Date(); 
  return date.getDate(); 
}