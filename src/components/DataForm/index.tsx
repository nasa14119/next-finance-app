import React, { useState } from 'react'
import "./styles.css"
import { getDay, getFormatedNumber, getMonth, getYear } from 'src/utils';
import { useDataCheck } from './useDataCheck';
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
  value: string, 
  dia: number| string, 
  mes: number| string, 
  ano: number| string, 
}
export function FormData ({type} : {type:string}) {
  const [values, setValue] = useState<State>({
    value: "",
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
  const handleUpdate = (update:number | string, key:string) => {
    setValue(prev => ({...prev, [key]: update}))
  }
  const handleSubmit = useDataCheck({
    value: values.value,
    dia: Number(values.dia),
    mes: Number(values.mes),
    ano: Number(values.ano)
  })
  return (
    <form className="form-data" onSubmit={e =>{
      e.preventDefault(); 
      handleSubmit(); 
    }}>
      <h3 className='text-2xl my-2 text-center md:text-left'>{type}</h3>
      <label htmlFor="valor">
        <input type="text" name="valor" id="valor" placeholder=" " value={values.value} onChange={(e) => {
          let parseValue = getFormatedNumber(e.target.value); 
          handleUpdate(parseValue, "value")
        }}/>
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
          <span className='text-black/30 w-full text-center md:text-xl'>dia</span>
          <span className='text-black/30 w-full text-center md:text-xl'>mes</span>
          <span className='text-black/30 w-full text-center md:text-xl'>año</span>
      </div>
      <div className='grid [grid-template-columns:70%_1fr] grid-rows-1 gap-x-2'>
        <button type="submit" className="text-sm p-2 rounded-2xl bg-secondary/30">
          Submit
        </button>
        <button onClick={setAhora} type="button" className="text-sm p-2 rounded-2xl bg-primary text-white">
          Ahora
        </button>
      </div>
    </form>
  );
}
