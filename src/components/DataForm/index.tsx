import React, { useState } from 'react'
import "./styles.css"
import { getDay, getMonth, getYear } from 'src/utils';
type Props = {
  handleSubmit: () => void
}
/*
  valor: number, 
  descripcion: string, 
  dia: number, 
  mes: number, 
  ano: number
}
*/
type State = {
  dia: number| string, 
  mes: number| string, 
  ano: number| string, 
}
export function FormData ({type} : {type:string}) {
  const [values, setValue] = useState<State>({
    dia: "",
    mes: "", 
    ano: ""
  }); 
  const setAhora = () => {
    const mes_actual = getMonth();
    const dia_actual = getDay()
    const year_actual = getYear(); 
    setValue(prev => ({...prev, dia: dia_actual, mes: mes_actual, ano:year_actual}))
  }
  const handleUpdate = (update:number, key:string) => {
    setValue(prev => ({...prev, [key]: update}))
  }
  return (
    <form className="form-data">
      <h3 className='text-2xl my-2 text-center md:text-left'>{type}</h3>
      <label htmlFor="valor">
        <input type="text" name="valor" id="valor" placeholder=" " />
        <span>Valor</span>
      </label>
      <label htmlFor="titulo">
        <input type="text" name="titulo" id="titulo" placeholder=" " />
        <span>Titulo</span>
      </label>
      <div className="form-data-fecha relative">
        <span className="[grid-area:title]">fecha:</span>
        <input
          type="number"
          name="dia"
          id="dia"
          min="1"
          max="31"
          placeholder="DD"
          value={values.dia}
          onChange={(e) => {
            handleUpdate(Number(e.target.value), "dia");
          }}
        />
        <input
          type="number"
          name="mes"
          id="mes"
          min="1"
          max="12"
          placeholder="MM"
          value={values.mes}
          onChange={(e) => {
            handleUpdate(Number(e.target.value), "mes");
          }}
        />
        <input
          type="number"
          name="ano"
          id="ano"
          min="2024"
          placeholder="YYYY"
          value={values.ano}
          onChange={(e) => {
            handleUpdate(Number(e.target.value), "ano");
          }}
        />
        <button onClick={setAhora} type="button" className="absolute right-0 -bottom-10 text-sm p-2 rounded-2xl bg-primary text-white">
          Ahora
        </button>
      </div>
    </form>
  );
}
