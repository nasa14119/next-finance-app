export const formatDateRes = (res: {dia_entrada: number, mes_entrada: number, ano_entrada: number}) => {
  const DD = res.dia_entrada < 10 ? "0"+ res.dia_entrada : res.dia_entrada
  const MM = res.mes_entrada < 10 ? "0"+ res.mes_entrada : res.mes_entrada
  return `${DD}/${MM}/${res.ano_entrada}`
}

export const getMonth = (): number =>{
  const date = new Date(); 
  return date.getMonth() + 1; 
}
export const getDay = (): number =>{
  const date = new Date(); 
  return date.getDate(); 
}