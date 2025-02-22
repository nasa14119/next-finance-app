export function BtnUndoPagoRecibido() {
  return (
    <button className="rounded-3xl bg-dager w-7 relative group grid place-content-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18 18 6M6 6l12 12"
        />
      </svg>
      <span className="absolute text-xs -top-5 w-max -left-12 invisible group-hover:visible bg-dager rounded-3xl px-2">no recibi el dinero</span>
    </button>
  );
}
export function BtnPagoRecibidoWithDelay() {
  return (
    <div className="absolute w-40">
      <button className="rounded-3xl bg-primary px-2 w-full invisible group-hover:visible">
        Dinero Recibido
        {/* {funcs?.loading ? "Loading..." :"Dinero Recibido"} */}
      </button>
    </div>
  );
}
export function BtnPagoRecibido() {
  return (
    <div className="flex justify-end gap-x-2 relative z-50">
      <BtnUndoPagoRecibido/>
      <button className="rounded-3xl bg-primary px-2">Dinero Recibido</button>
    </div>
  );
}