import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState, useMemo } from "react";
import InputError from "./input-error";

interface FormSelectProps {
  selectKey: string;
  setValue: any;
  errors?: any;
  defaultValue?: string;
}

const startYear = 1980;
const currentYear = new Date().getFullYear();

export default function YearSelect({ selectKey, setValue, errors, defaultValue }: FormSelectProps) {
  const [selectedYear, setSelectedYear] = useState<string>(defaultValue || "");

  // Memoizing the years array to avoid recalculating it on every render
  const years = useMemo(() => {
    return Array.from({ length: currentYear - startYear + 1 }, (_, index) => currentYear - index).map((year) => (
      <SelectItem key={year} value={year.toString()}>
        {year}
      </SelectItem>
    ));
  }, []);

  useEffect(() => {
    if (defaultValue) {
      setSelectedYear(defaultValue); // Set the default value if available
      setValue(selectKey, defaultValue); // Update the form value
    }
  }, [defaultValue, selectKey, setValue]);

  const handleYearChange = (value: string) => {
    setSelectedYear(value); // Update the selected year
    setValue(selectKey, value); // Pass the selected value to the parent form handler
  };

  return (
    <>
      <div className="min-w-[180px]">
        <Select onValueChange={handleYearChange} value={selectedYear}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent>
            <div className="max-h-[200px] overflow-y-auto">{years}</div>
          </SelectContent>
        </Select>
      </div>
      <InputError field={errors?.[selectKey!]} />
    </>
  );
}
