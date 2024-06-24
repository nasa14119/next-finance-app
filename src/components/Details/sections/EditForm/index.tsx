"use client"
import { sendEditedData } from "@components/Details/enpoints";
import { useTrowError } from "@context/error";
import { Data } from "@context/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getFormatedNumber, removeNonNumeric } from "src/utils";

export function EditForm({data}: {data:Data}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const throwError = useTrowError();
  const [titulo, setTitulo] = useState(data.descripcion)
  const [valor, setValor] = useState<string>(getFormatedNumber(data.valor.toString()))
  const [fecha, setFecha] = useState({
    dia: data.dia, 
    mes: data.mes, 
    ano: data.ano
  })
  const ParsedValues : Data = {
    id: data.id, 
    valor : Number(removeNonNumeric(valor)), 
    descripcion: titulo,
    dia: fecha.dia,
    mes: fecha.mes,
    ano: fecha.ano, 
    type: data.type
  }
  const check = [
    titulo === data.descripcion,
    ParsedValues.valor === data.valor,
    ParsedValues.dia === data.dia,
    ParsedValues.mes === data.mes,
    ParsedValues.ano === data.ano,
  ];
  const handleSubmit = async () => {
    const URL = data.type === "ingreso" ? "ingresos": "gastos"
    try {
      setLoading(true); 
      await sendEditedData(URL, ParsedValues ); 
      router.refresh(); 
    } catch (error) {
      throwError("Error al enviar los cambios al servidor"); 
    } finally {
      setLoading(false)
    }
  }
  return (
    <form
      className="flex flex-col gap-y-4 max-w-[500px] md:mx-auto h-full justify-center"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(); 
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
            setTitulo(e.target.value);
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
                setFecha((prev) => ({ ...prev, dia: Number(e.target.value) }));
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
                setFecha((prev) => ({ ...prev, mes: Number(e.target.value) }));
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
                setFecha((prev) => ({ ...prev, ano: Number(e.target.value) }));
              }}
            />
          </label>
        </div>
      </div>
      <button
        type="submit"
        className={`transition duration-150 ease-out text-lg p-2 rounded-2xl disabled:text-white/20  ${
          data.type === "ingreso"
            ? "bg-secondary/30 disabled:bg-secondary/20"
            : "bg-dager/30 disabled:bg-dager/20"
        }`}
        disabled={check.every(Boolean) || loading}
      >
        {loading ? (
            <svg
              className="text-white/30 animate-spin mx-auto"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
            >
              <path
                d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
              ></path>
            </svg>
        ) : (
          "Actualizar"
        )}
      </button>
    </form>
  );
}
