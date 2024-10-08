import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import InputError from "../input-error"
import { cn } from "@/lib/utils"
import { FormInputProps } from "../intefaces/forminput"
import { Button } from "../button"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useState } from "react"

export default function FormInputPassword({
  label = "",
  placeholder = "",
  defaultValue = "",
  fieldError,
  register,
  divClassName,
  disabled = false
}: FormInputProps) {

  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className={cn("grid gap-4 relative", divClassName)}>
      <Label htmlFor={label} className="col-span-1">
        {label}
      </Label>
      <div>
        <Input
          type={showPassword ? "text" : "password"}
          id={label}
          disabled={disabled}
          placeholder={placeholder}
          defaultValue={defaultValue}
          {...register}
        />
        <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
        onClick={togglePasswordVisibility}
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? (
          <EyeOffIcon className="h-4 w-4 text-gray-500" />
        ) : (
          <EyeIcon className="h-4 w-4 text-gray-500" />
        )}
      </Button>
        <InputError field={fieldError} />
      </div>
    </div>
  )
}