import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

interface MultiSelectProps<T> {
  options: T[];
  selectedOptions: T[];
  onChange: (option: T) => void;
  labelExtractor: (option: T) => string; // Extract label for display
  customClassNames?: {
    buttonClassName?: string;
    dropdownClassName?: string;
    itemClassName?: string;
    selectedItemClassName?: string;
  };
  placeholder?: string;
}

export function MultiSelectDropdown<T>({
  options,
  selectedOptions,
  onChange,
  labelExtractor,
  customClassNames = {
    buttonClassName: "min-w-[130px] max-w-[300px] h-full",
    dropdownClassName: "custom-dropdown",
    itemClassName: "custom-item",
    selectedItemClassName: "custom-selected-item",
  },
  placeholder = "Select options",
}: MultiSelectProps<T>) {
  const { buttonClassName, dropdownClassName, itemClassName, selectedItemClassName } = customClassNames;

  const selectedLabels = selectedOptions.map(labelExtractor).join(", ");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={`flex items-center justify-between overflow-hidden ${buttonClassName}`}>
          <span className="truncate">{selectedLabels || placeholder}</span>
          <ChevronDown className="h-4 w-4 opacity-50 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={`w-[180px] ${dropdownClassName}`}>
        {options.map((option) => {
          const isSelected = selectedOptions.includes(option);
          return (
            <DropdownMenuCheckboxItem
              key={labelExtractor(option)}
              checked={isSelected}
              onCheckedChange={() => onChange(option)}
              className={`${itemClassName} ${isSelected ? selectedItemClassName : ""}`}
            >
              {labelExtractor(option)}
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
