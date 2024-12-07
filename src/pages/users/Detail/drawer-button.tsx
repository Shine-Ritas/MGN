import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { memo, useMemo, useState, useRef } from "react";
import { FixedSizeList as List } from 'react-window';
import { Input } from "@/components/ui/input";

type Props = {
  label: string;
  current: number;
  total: number;
  setPrevState: () => void;
  setNextState: () => void;
  setSelectState: (value: number) => void;
};

export const MemorizedIndexerButton = memo(({ label, current, total, setPrevState, setNextState, setSelectState }: Props) => {
  const [searchTerm, setSearchTerm] = useState('');

  const options = useMemo(() =>
    Array.from({ length: total }, (_, i) => ({
      value: `${i + 1}`,
      label: `Option ${i + 1}`
    })),
    [total]
  );

  const filteredOptions = useMemo(() =>
    options.filter(option =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [options, searchTerm]);

  const listRef = useRef<any>(null); // Ref to access the List component instance

  const handleSetSelectState = (value: string) => {
    setSelectState(Number(value)); // Update the current state to reflect the selected value
  }
    
  const Row = ({ index, style }: { index: number, style: React.CSSProperties }) => (
    <SelectItem
      key={filteredOptions[index].value}
      value={filteredOptions[index].value}
      style={style}
    >
      {filteredOptions[index].label}
    </SelectItem>
  );

  return (
    <div className="flex items-center gap-3">
      <Button
        variant="default"
        size="icon"
        className="h-12"
        onClick={setPrevState}
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>
      <div className="flex-1">
        <Select value={String(current)} 
        onOpenChange={(isOpen) => {
            if (isOpen) {
                listRef.current.scrollToItem(current, "start"); // Scroll to the selected item when the dropdown opens
            }}
        }
        onValueChange={handleSetSelectState}>
          <SelectTrigger className="bg-primary-muted text-xs h-12">
            <div className="flex flex-col items-start">
              {label}
              <SelectValue>{current} / {total}</SelectValue>
            </div>
          </SelectTrigger>
          <SelectContent>
            <div className="mb-2">
              <Input
                placeholder="Search options..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <List
              ref={listRef} // Attach ref to the List component
              height={35 * 20}
              itemCount={filteredOptions.length}
              itemSize={35}
              width="100%"
            >
              {Row}
            </List>
          </SelectContent>
        </Select>
      </div>
      <Button
        variant="default"
        size="icon"
        className="h-12"
        onClick={setNextState}
      >
        <ChevronRight className="w-6 h-6" />
      </Button>
    </div>
  );
});
