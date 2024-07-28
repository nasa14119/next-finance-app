import { DisplayPagos } from '../DisplayPagos';
import { GraficoCircular } from '@components/GraficoCircular';
import { AddIngresoBtn } from '@components/AgregarIngreso';
import { AddGastoBtn } from '@components/AgregarGasto';
import { IngreosFinjosContextProvider } from '@context/app/ingresos_fijos';
import { ResponseApiData } from '@context/types';

async function MainDisplay() {
  const data:ResponseApiData = {
    ano_entrada: 2024, 
    dia_entrada: 15,
    mes_entrada: 7, 
    estado: 1500, 
    valor: 1800, 
    format_date: "15/07/2024", 
    isDelay: true, 
    isPay: true, 
    time_delay: 4, 
  }
  return (
    <IngreosFinjosContextProvider data={data}>
      <main className=" bg-primary/20 p-2 rounded-[0.5rem] relative flex flex-col justify-end md:flex-row md:items-end md:justify-between">
        <DisplayPagos />
        <GraficoCircular />
        <AddIngresoBtn />
        <AddGastoBtn />
      </main>
    </IngreosFinjosContextProvider>
  );
}

export default MainDisplay