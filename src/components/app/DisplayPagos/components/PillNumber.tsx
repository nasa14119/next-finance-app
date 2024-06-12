import { ReactNode } from "react"

type Props = {
  body?: any,
  className?: string, 
  children?: ReactNode, 
} & Omit<JSX.IntrinsicElements["div"], "className">
export const PillNumber = ({body, className, children, ...rest}:Props) => (
  <div className={`w-7 text-white rounded-3xl text-sm tabular-nums text-center ${className}`} {...rest}>
    {body}
    {children}
  </div>
)