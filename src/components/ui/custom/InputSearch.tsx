import React, { useState, forwardRef } from "react";
import { Input } from "../input";
import { Button } from "../button";
import { SearchIcon } from "lucide-react";

interface InputSearchInterface {
  placeholder?: string;
  value?: string;
  onAction: () => void;
  ref?: React.Ref<HTMLInputElement>;
}

const InputSearch = forwardRef<HTMLInputElement, InputSearchInterface>(
  ({ placeholder = "", value = "", onAction = () => {} }, ref) => {
    const [inputValue, setInputValue] = useState(value);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onAction();
    };

    return (
      <form onSubmit={handleSubmit} className="flex w-full">
        <Input
          type="search"
          placeholder={placeholder}
          value={inputValue}
          ref={ref}
          onChange={handleChange}
          className="w-full md:w-60 lg:w-80 rounded-e-none"
        />
        <Button type="submit" className="rounded-s-none">
          <SearchIcon className="h-4 w-4 bg-primary" />
        </Button>
      </form>
    );
  }
);

export default InputSearch;
