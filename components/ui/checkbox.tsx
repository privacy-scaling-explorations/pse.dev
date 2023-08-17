import { InputHTMLAttributes } from "react"
import * as CheckboxComponent from "@radix-ui/react-checkbox"
import { CheckboxProps as CheckboxComponentProps } from "@radix-ui/react-checkbox"

import { Icons } from "../icons"

type CheckboxInputProps = InputHTMLAttributes<HTMLDivElement> &
  CheckboxComponentProps

interface CheckboxProps extends CheckboxInputProps {
  label: string
  name: string
}

const Checkbox = ({ label, name, checked, ...props }: CheckboxProps) => {
  return (
    <div className="flex items-center">
      <CheckboxComponent.Root
        {...props}
        checked={checked}
        className="ease-in duration-100 flex items-center justify-center w-[14px] h-[14px] bg-white border-2 border-solid rounded-[1.5px] cursor-pointer aria-checked:bg-black aria-checked:border-black border-tuatara-200"
        id={name}
      >
        <CheckboxComponent.Indicator className="text-white">
          <Icons.check className="h-3 " />
        </CheckboxComponent.Indicator>
      </CheckboxComponent.Root>
      {label && (
        <label
          className="pl-3 font-sans text-base font-normal break-all cursor-pointer"
          htmlFor={name}
        >
          {label}
        </label>
      )}
    </div>
  )
}
Checkbox.displayName = "Checkbox"

export { Checkbox }
