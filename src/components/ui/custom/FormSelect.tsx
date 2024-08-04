
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import InputError from "@/components/ui/input-error"

interface FormSelectProps{
    selectKey : string,
    collection : any[],
    setValue : any,
    errors : any
}
const FormSelect = ({
    selectKey,
    collection,
    setValue,
    errors
}:FormSelectProps) => {
  return (
    <>
        <Select onValueChange={(value)=>setValue(selectKey,value)}>
                      <SelectTrigger id={selectKey} aria-label="Select Progress">
                        <SelectValue placeholder="Select Progress" />
                      </SelectTrigger>
                      <SelectContent>
                        {
                          collection.map((item) => (
                            <SelectItem key={item.id} value={`${item.id}`}>
                              {item.title}
                            </SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                    <InputError field={errors?.[selectKey!]} />
    </>
  )
}

export default FormSelect