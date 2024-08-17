import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import InputError from "@/components/ui/input-error";
import { useEffect } from "react";

interface FormSelectProps {
  selectKey: string;
  collection: any[];
  setValue: any;
  errors: any;
  defaultValue?: string;
}

const FormSelect = ({
  selectKey,
  collection,
  setValue,
  errors,
  defaultValue,
}: FormSelectProps) => {

  // Set default value when component mounts
  useEffect(() => {
    if (defaultValue) {
      setValue(selectKey, defaultValue);
    }
  }, [defaultValue, selectKey, setValue]);

  return (
    <>
      <Select onValueChange={(value) => setValue(selectKey, value)} defaultValue={defaultValue}>
        <SelectTrigger id={selectKey} aria-label="Select Progress">
          <SelectValue placeholder="Select Progress" defaultValue={defaultValue} />
        </SelectTrigger>
        <SelectContent>
          {collection.map((item) => (
            <SelectItem key={item.id} value={`${item.id}`}>
              {item.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <InputError field={errors?.[selectKey!]} />
    </>
  );
};

export default FormSelect;
