export const getIngresos = async () =>{
  const res = await fetch("http://localhost:3000/ingresos-fijos", {
    headers: {
      "Content-Type": "application/json"
    }, 
    method: "GET"
  })
  return await res.json()
}
const reducerIngresos = (state: any)=> {
  return state
}