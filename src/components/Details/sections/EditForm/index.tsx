"use client"
import { Data } from "@context/types";
import { useState } from "react";
import { getFormatedNumber, removeNonNumeric } from "src/utils";

export function EditForm({data}: {data:Data}) {
  const [titulo, setTitulo] = useState(data.descripcion)
  const [valor, setValor] = useState<string>(getFormatedNumber(data.valor.toString()))
  const [fecha, setFecha] = useState({
    dia: data.dia, 
    mes: data.mes, 
    ano: data.ano
  })
  const ParsedValues = {
    value : Number(removeNonNumeric(valor)), 
    descripcion: titulo,
    dia: fecha.dia,
    mes: fecha.mes,
    ano: fecha.ano, 
  }
  const check = [
    titulo === data.descripcion,
    ParsedValues.value === data.valor,
    ParsedValues.dia === data.dia,
    ParsedValues.mes === data.mes,
    ParsedValues.ano === data.ano,
  ];
  return (
    <form
      className="flex flex-col gap-y-4 max-w-[500px] md:mx-auto h-full justify-center"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <label htmlFor="titulo" className="text-xl flex flex-col">
        <span>Titulo</span>
        <input
          className="bg-background border-b border-white/40 px-5 outline-none py-2 text-white/75 text-base"
          type="text"
          name="titulo"
          id="titulo"
          placeholder=" "
          value={titulo}
          onChange={(e) => {
            setTitulo(e.target.value)
          }}
        />
      </label>
      <label htmlFor="valor" className="text-xl flex flex-col">
        <span>Valor</span>
        <input
          className="bg-background border-b border-white/40 px-5 outline-none py-2 text-white/75 text-base"
          type="text"
          name="valor"
          id="valor"
          placeholder=" "
          value={valor}
          onChange={(e) => {
            let parseValue = getFormatedNumber(e.target.value);
            setValor(parseValue); 
          }}
        />
      </label>
      <div className="relative">
        <span className="text-left text-lg">Fecha:</span>
        <div className="max-w-full my-2 grid [grid-template-columns:25%_25%_1fr] text-base gap-x-2">
          <label htmlFor="dia" className="">
            <input
              className="w-full text-center rounded-2xl bg-text/20 outline-none p-2 caret-text/30"
              type="number"
              name="dia"
              id="dia"
              min="1"
              max="31"
              placeholder="DD"
              value={fecha.dia}
              onChange={(e) => {
                setFecha((prev) => ({ ...prev, dia: Number(e.target.value)}))
              }}
            />
          </label>
          <label htmlFor="mes" className="">
            <input
              className="w-full text-center rounded-2xl bg-text/20 outline-none p-2 caret-text/30"
              type="number"
              name="mes"
              id="mes"
              min="1"
              max="12"
              placeholder="MM"
              value={fecha.mes}
              onChange={(e) => {
                setFecha((prev) => ({ ...prev, mes: Number(e.target.value)}))
              }}
            />
          </label>
          <label htmlFor="ano" className="">
            <input
              className="w-full text-center rounded-2xl bg-text/20 outline-none p-2 caret-text/30"
              type="number"
              name="ano"
              id="ano"
              min="2024"
              placeholder="YYYY"
              value={fecha.ano}
              onChange={(e) => {
                setFecha((prev) => ({ ...prev, ano: Number(e.target.value)}))
              }}
            />
          </label>
        </div>
      </div>
      <button type="submit" className={`transition duration-150 ease-out text-lg p-2 rounded-2xl disabled:text-white/20  ${data.type=== "ingreso" ? "bg-secondary/30 disabled:bg-secondary/20": "bg-dager/30 disabled:bg-dager/20"}`}
        disabled={check.every(Boolean)}
      >
        Actualizar
      </button>
    </form>
  );
}
