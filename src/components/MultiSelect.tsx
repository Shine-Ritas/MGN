import { FormEvent, useState } from "react";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
interface ISelectProps {
    values: {
        key: string;
        value: string;
    }[];
}
const MultiSelect = ({ values }: ISelectProps) => {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const [collection, setCollection] = useState<ISelectProps["values"]>(values);

    const handleSelectChange = (value: string) => {
        if (!selectedItems.includes(value)) {
            setSelectedItems((prev) => [...prev, value]);
        } else {
            const referencedArray = [...selectedItems];
            const indexOfItemToBeRemoved = referencedArray.indexOf(value);
            referencedArray.splice(indexOfItemToBeRemoved, 1);
            setSelectedItems(referencedArray);
        }
    };

    const isOptionSelected = (value: string): boolean => {
        return selectedItems.includes(value) ? true : false;
    };

    const handleSearch = (e: FormEvent<HTMLInputElement>) => {
        // prevent  other select item event
        e.stopPropagation();

        // filter values based on search
        setCollection(values.filter((value) => value.value.includes(e.currentTarget.value)));
        // if search is empty, return all values
        if (e.currentTarget.value === "") {
            setCollection(values);
        }
    
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex gap-2 font-bold">
                        <span>
                            {
                                selectedItems.length === 0 ? "Select" : selectedItems.length === 1 ? "1 Selected" : `${selectedItems.length} Selected`
                            }
                        </span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" onCloseAutoFocus={(e) => e.preventDefault()}>
                    <DropdownMenuLabel >
                        <Input placeholder="Search" onInput={(e)=>handleSearch(e)} />
                    </DropdownMenuLabel>


                    <DropdownMenuSeparator  />
                    {collection.map((value: ISelectProps["values"][0], index: number) => {
                        return (
                            <DropdownMenuCheckboxItem
                                
                                onSelect={(e) => e.preventDefault()}
                                key={index}
                                checked={isOptionSelected(value.key)}
                                onCheckedChange={() => handleSelectChange(value.key)}
                            >
                                {value.value}
                            </DropdownMenuCheckboxItem>
                        );
                    })}
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};

export default MultiSelect;