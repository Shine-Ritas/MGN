import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import InputError from "@/components/ui/input-error";
import { cn } from "@/utilities/util";

export interface FormSelectProps
  extends React.ComponentPropsWithoutRef<typeof Select> {
  selectKey: string;
  collection: { id: string | number; title?: string; name?: string }[];
  setValue: any;
  errors?: Record<string, any>;
  placeholder?: string;
  className?: string;
  defaultValue?: string;
}

const FormSelect = React.forwardRef<HTMLDivElement, FormSelectProps>(
  (
    { selectKey, collection, setValue, errors, defaultValue, className, placeholder, ...props },
    ref
  ) => {
    const [currentValue, setCurrentValue] = React.useState<string | undefined>(defaultValue);

    const options = React.useMemo(
      () =>
        collection.map((item) => (
          <SelectItem key={item.id} value={`${item.id}`}>
            {item.title ?? item.name}
          </SelectItem>
        )),
      [collection]
    );

    // Handle value changes efficiently
    const handleChange = React.useCallback(
      (value: string) => {
        setCurrentValue(value);
        setValue(selectKey, value);
      },
      [selectKey, setValue]
    );

    return (
      <div className={cn("space-y-2", className)} ref={ref}>
        <Select value={currentValue} onValueChange={handleChange} {...props}>
          <SelectTrigger id={selectKey} aria-label={`Select ${selectKey}`}>
            <SelectValue placeholder={placeholder ?? "Select an option"} />
          </SelectTrigger>
          <SelectContent>{options}</SelectContent>
        </Select>
        {errors?.[selectKey] && <InputError field={errors[selectKey]} />}
      </div>
    );
  }
);

FormSelect.displayName = "FormSelect";

export default FormSelect;
