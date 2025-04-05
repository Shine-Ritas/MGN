// MultiSelectHandler.tsx
import { useState } from "react";
import { MultiSelectDropdown } from "./multi-select";

interface MultiSelectHandlerProps<T> {
  options: T[];
  onChange: (updatedOptions: string) => void;
  labelExtractor: (option: T) => string;
  selectedOptions?: T[]; // We no longer need selectedOptions as it's managed internally
  placeHolder?:string;
  size?: "sm" | "md" | "lg";
}

const getDropDownContentStyle = (size: string) => {
  switch (size) {
    case "sm":
      return "";
    case "md":
      return "!w-96 max-h-[60vh] overflow-y-scroll";
    case "lg":
      return "w-[520px] grid grid-cols-3 gap-1 py-3 pe-3";
    default:
      return "w-32";
  }
}

const getDropDownItemStyle = (size: string) => {
  switch (size) {
    case "sm":
      return "";
    case "md":
      return "w-full";
    case "lg":
      return "text-xs";
    default:
      return "w-32";
  }
}

function MultiSelectHandler<T>({
  options,
  onChange,
  labelExtractor,
  selectedOptions = [], // Default empty array if no initial selectedOptions are passed
  placeHolder = "Select options",
  size = "sm",
}: MultiSelectHandlerProps<T>) {
  const [selected, setSelected] = useState<T[]>(selectedOptions);

  const handleSelectionChange = (option: T) => {
    const updatedOptions = selected.includes(option)
      ? selected.filter((o) => o !== option)
      : [...selected, option];

    setSelected(updatedOptions); // Update local state

    const optionsString = updatedOptions.map((o) => labelExtractor(o)).join(",");
    onChange(optionsString); // Notify parent with updated values
  };

  return (
    <MultiSelectDropdown
      options={options}
      selectedOptions={selected}
      onChange={handleSelectionChange}
      labelExtractor={labelExtractor}
      placeholder={placeHolder}
      customClassNames={{ dropdownClassName: getDropDownContentStyle(size),
        itemClassName : getDropDownItemStyle(size)
       }}
    />
  );
}

export default MultiSelectHandler;
