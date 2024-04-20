import { Basket} from "../../assets/icons";

export const AddGastoBtn = () => (
  <div className="flex justify-start gap-x-5 h-10 items-center bg-dager/20 mb-5 p-5 rounded-xl md:w-[250px]">
    <Basket className="w-6 h-6 text-dager" />
    <span>Agregar Gasto</span>
  </div>
);