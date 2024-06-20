import { DisplayPagos } from '../DisplayPagos';
import { GraficoCircular } from '@components/GraficoCircular';
import { AddIngresoBtn } from '@components/AgregarIngreso';
import { AddGastoBtn } from '@components/AgregarGasto';

function MainDisplay() {
  return (
    <main className=" bg-primary/20 p-2 rounded-[0.5rem] relative flex flex-col justify-end md:flex-row md:items-end md:justify-between">
      <DisplayPagos />
      <GraficoCircular />
      <AddIngresoBtn />
      <AddGastoBtn />
    </main>
  );
}

export default MainDisplay