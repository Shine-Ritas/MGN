import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SelectDataArray = { [key: string]: string | number } | string[];

interface SingleFilterSelectProps {
  data: SelectDataArray;
  placeholder?: string;
  onSelect: (value: unknown) => void;
}

export function SingleFilterSelect({ data = [], placeholder = "Select", onSelect }: SingleFilterSelectProps) {
  const renderItems = () => {
    if (Array.isArray(data)) {
      return data.map((item, index) => (
        <SelectItem key={index} value={item}>
          {item}
        </SelectItem>
      ));
    } else {
      return Object.keys(data).map((key) => (
        <SelectItem key={key} value={data[key] as string}>
          {key}
        </SelectItem>
      ));
    }
  };

  return (
    <Select onValueChange={onSelect}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {/* <SelectLabel>Fruits</SelectLabel> */}
          {renderItems()}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
