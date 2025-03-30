import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { memo, useMemo, useState, useRef, useCallback } from "react";
import { FixedSizeList as List } from 'react-window';
import { Input } from "@/components/ui/input";

type Option = {
  label: string;
  value: string | number;
};

type Props = {
  label: string;
  current: number;
  total: number;
  selectOptions?: Option[];
  setPrevState: () => void;
  setNextState: () => void;
  setSelectState: (value: number) => void;
};

// Constants for better maintainability
const LIST_HEIGHT_LARGE = 200;
const LIST_HEIGHT_SMALL = 180;
const ITEM_SIZE_LARGE = 35;
const ITEM_SIZE_SMALL = 40;
const THRESHOLD = 20;

export const MemorizedIndexerButton = memo(({
  label,
  current,
  total,
  selectOptions,
  setPrevState,
  setNextState,
  setSelectState
}: Props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const listRef = useRef<any>(null);

  // Memoized options with better type safety
  const options = useMemo(() =>
    selectOptions ?? Array.from({ length: total }, (_, i) => ({
      label: String(i + 1),
      value: i + 1,
    })),
    [total, selectOptions]
  );

  // Memoized filtered options with debounced search
  const filteredOptions = useMemo(() => {
    if (!searchTerm) return options;
    const lowerSearch = searchTerm.toLowerCase();
    return options.filter(option =>
      option.label.toLowerCase().includes(lowerSearch)
    );
  }, [options, searchTerm]);

  // Memoized list dimensions
  const { height, itemSize } = useMemo(() => ({
    height: total > THRESHOLD ? LIST_HEIGHT_LARGE : LIST_HEIGHT_SMALL,
    itemSize: total > THRESHOLD ? ITEM_SIZE_LARGE : ITEM_SIZE_SMALL,
  }), [total]);

  // Optimized event handlers
  const handleSetSelectState = useCallback((value: string) => {
    const numValue = Number(value);
    if (!isNaN(numValue)) {
      setSelectState(numValue);
    }
  }, [setSelectState]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleOpenChange = useCallback((isOpen: boolean) => {
    if (isOpen && listRef.current) {
      const index = filteredOptions.findIndex(opt =>
        Number(opt.value) === current
      );
      if (index !== -1) {
        listRef.current.scrollToItem(index, "start");
      }
    }
  }, [current, filteredOptions]);

  // Optimized Row component with highlighting
  const Row = useCallback(({ index, style }: { index: number; style: React.CSSProperties }) => {
    const option = filteredOptions[index];
    const isSelected = Number(option.value) === current;

    return (
      <SelectItem
        key={option.value}
        value={String(option.value)}
        className={`${isSelected ? "bg-primary" : "bg-transparent"}`}
        style={{
          ...style,
          fontWeight: isSelected ? 'bold' : 'normal'
        }}
      >
        {option.label}
      </SelectItem>
    );
  }, [filteredOptions, current]);

  return (
    <div className="flex items-center gap-3">
      <Button
        variant="default"
        size="icon"
        className="h-12"
        onClick={setPrevState}
      // disabled={current <= 1}
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>

      <div className="flex-1">
        <Select
          value={String(current)}
          onOpenChange={handleOpenChange}
          onValueChange={handleSetSelectState}
        >
          <SelectTrigger className="bg-primary-muted text-xs h-12">
            <div className="flex flex-col items-start">
              {label}
              <SelectValue>{current} / {total}</SelectValue>
            </div>
          </SelectTrigger>
          <SelectContent className="z-[9999]">
            <div className="mb-2 px-2">
              <Input
                placeholder="Search ..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full"
              />
            </div>
            <List
              ref={listRef}
              height={height}
              itemCount={filteredOptions.length}
              itemSize={itemSize}
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
      // disabled={current >= total}
      >
        <ChevronRight className="w-6 h-6" />
      </Button>
    </div>
  );
});

MemorizedIndexerButton.displayName = 'MemorizedIndexerButton';