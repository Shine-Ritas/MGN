import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import InputError from "../input-error"
import { cn } from "@/utilities/util"
import { FormInputProps } from "../intefaces/forminput"

export default function FormInput({
  type = "text",
  label = "",
  placeholder = "",
  defaultValue = "",
  fieldError,
  register,
  divClassName,
  disabled = false
}: FormInputProps) {
  const initValue = type === "number" ? defaultValue.toString() : defaultValue

  const handleNumberInput = (e: React.FormEvent<HTMLInputElement>) => {
    e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '')
  }

  return (
    <div className={cn("grid gap-4", divClassName)}>
      <Label htmlFor={label} className="col-span-1">
        {label}
      </Label>
      <div>
        <Input
          type={type}
          id={label}
          disabled={disabled}
          placeholder={placeholder}
          defaultValue={initValue}
          onInput={type === "number" ? handleNumberInput : undefined}
          {...register}
        />
        <InputError field={fieldError} />
      </div>
    </div>
  )
}