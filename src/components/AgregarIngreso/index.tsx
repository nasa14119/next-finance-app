import {AddIcon} from "../../assets/icons"
export const AddIngresoBtn = () => (
  <div className="flex justify-start gap-x-5 h-10 items-center bg-accent/20 mb-5 p-5 rounded-xl md:w-[250px]">
    <AddIcon className="w-6 h-6 text-accent" />
    <span>Agregar Ingreso</span>
  </div>
);