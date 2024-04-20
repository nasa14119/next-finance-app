import { useEffect, useState } from "react";
import "./styles.css"
type Props = {
  duration: number, 
  errorMesage: string | null, 
  clear : () => void
}
const sleep = (ms:number) => new Promise(resolve => setTimeout(resolve, ms))
export const ComponentError = ({duration, errorMesage = null, clear} : Props) => {
  const [animation, setAnimation] = useState("out"); 
  const [animationParent, setAnimationParent] = useState("invisible"); 
  const startAnimation = () => {
    setAnimationParent("visible"); 
    setAnimation("enter"); 
  }
  const stopAnimation = async () => {
    setAnimation("out"); 
    await sleep(750)
    setAnimationParent("invisible"); 
    clear()
  }
  useEffect(() => {
    if (errorMesage === null) return
    startAnimation();
  }, [errorMesage]);
  return (
    <div className="error-parent" data-state={animationParent}>
      <div
        className="error"
        data-state={animation}
        onAnimationEnd={async () =>{
          await sleep(duration)
          stopAnimation()
        }}>
        {errorMesage}
      </div>
    </div>
  );
};