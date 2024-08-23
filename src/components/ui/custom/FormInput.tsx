import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InputError from "../input-error";

import { FormInputProps } from "../intefaces/forminput"
import { cn } from "@/lib/utils";

const FormInput = ({
  type = "text",
  label = "",
  placeholder = "",
  defaultValue= "",
  fieldError,
  register,
  divClassName,
}: FormInputProps) => {

  const initValue = Number.isNaN(defaultValue) ? "" : defaultValue;

  return (
    <div className={
      cn("grid gap-4",divClassName)
    }>
      <Label
      className="col-span-1"
      htmlFor={label}>{label}</Label>
      <div className="">
      <Input type={type} placeholder={placeholder} defaultValue={initValue} {...register} />
      <InputError field={fieldError} />
      </div>
      
    </div>
  );
};

export default FormInput;
