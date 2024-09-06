import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import InputError from "@/components/ui/input-error"
import { useEffect, useState } from "react";

interface FormSelectProps {
  selectKey: string,
  collection: any[],
  setValue: any,
  errors?: any,
  defaultValue?: string
}
const FormSelect = ({
  selectKey,
  collection,
  setValue,
  errors,
  defaultValue

}: FormSelectProps) => {

  const [currentValue, setCurrentValue] = useState<string | undefined>(defaultValue);

  useEffect(() => {
    setCurrentValue(defaultValue);
    setValue(selectKey, defaultValue);
  }
    , [currentValue])

  return (
    <>
      <Select onValueChange={(value) => setValue(selectKey, value)}
        defaultValue={currentValue}

      >
        <SelectTrigger id={selectKey} aria-label="Select Progress" defaultValue={defaultValue}>
          <SelectValue placeholder="Select Progress" />
        </SelectTrigger>
        <SelectContent>
          {
            collection.map((item) => (
              <SelectItem key={item.id} value={`${item.id}`}>
                {item.title}
              </SelectItem>
            ))
          }
        </SelectContent>
      </Select>
      <InputError field={errors?.[selectKey!]} />

    </>
  )
}
export default FormSelect