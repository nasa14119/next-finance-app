import { useEffect, useRef, useState } from "react";
import "./styles.css"
import { CloseIcon } from "@assets/icons";
export function Modal({
  children,
  state,
  close
}: {
  children: JSX.Element | JSX.Element[];
  state: boolean;
  close: (value?: boolean) => void;
}) {
  const firstload = useRef(true);
  const [animation, setAnimanition] = useState("false");
  const startAnimation = () => {
    setAnimanition("transition-in");
  };
  const stopAnimation = () => {
    setAnimanition("transition-out");
    setTimeout(close, 750)
  };
  const handleAnimation = () => {
    if (animation === "transition-in") {
      setAnimanition("true");
      return;
    }
    if (animation === "transition-out") {
      setAnimanition("false");
      return;
    }
  };
  useEffect(() => {
    if (firstload.current) {
      firstload.current = false;
      return;
    }
    if (state) {
      startAnimation();
      return;
    }
  }, [state]);
  return (
    <div
      className={`fixed inset-0 bg-secondary/35 modal-parent`}
      onClick={stopAnimation}
      data-state={animation}
    >
      <div
        className="modal z-50 bg-white p-2 rounded-[0.5rem] absolute inset-[10%] flex flex-col justify-center items-center text-black max-w-[600px] md:mx-auto"
        onClick={(e) => e.stopPropagation()}
        data-state={animation}
        onAnimationEnd={handleAnimation}
      >
        <div
          className="absolute top-5 right-5 cursor-pointer"
          onClick={stopAnimation}
        >
          {" "}
          <CloseIcon className="w-6 h-6 pointer-events-none" />
        </div>
        {state ? children : null}
      </div>
    </div>
  );
}
