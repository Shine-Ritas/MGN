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
  collection: { id: string | number; title?: string ;name?:string  }[];
  setValue: any;
  errors?: Record<string, any>;
  className?: string;
  defaultValue?: string;
}

const FormSelect = React.forwardRef<HTMLDivElement, FormSelectProps>(
  (
    { selectKey, collection, setValue, errors, defaultValue, className, ...props },
    ref
  ) => {
    const [currentValue, setCurrentValue] = React.useState<string | undefined>(
      defaultValue
    );

    React.useEffect(() => {
      setCurrentValue(defaultValue);
      setValue(selectKey, defaultValue);
    }, [defaultValue, selectKey, setValue]);


    return (
      <div className={cn("space-y-2", className)} ref={ref}>
        <Select
          onValueChange={(value) => {
            setValue(selectKey, value);
            setCurrentValue(value);
          }}
          value={currentValue}
          {...props}
        >
          <SelectTrigger id={selectKey} aria-label={`Select ${selectKey}`}>
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            {collection.map((item) => (
              <SelectItem key={item.id} value={`${item.id}`}>
                {item.title ?? item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors?.[selectKey] && <InputError field={errors[selectKey]} />}
      </div>
    );
  }
);

FormSelect.displayName = "FormSelect";

export default FormSelect;
