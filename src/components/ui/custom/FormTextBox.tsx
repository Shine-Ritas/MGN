import { FormInputProps } from "../intefaces/forminput"
import { Label } from "@/components/ui/label";
import InputError from "../input-error";
import { Textarea } from "@/components/ui/textarea";

interface FormTextBoxProps extends FormInputProps {
    className?: string;
}

const FormTextBox = ({
    type = "text",
    label = "",
    placeholder = "",
    defaultValue = "",
    fieldError,
    register,
    className = "min-h-32"
}: FormTextBoxProps) => {

    const initValue = Number.isNaN(defaultValue) ? "" : defaultValue;

    return (
        <div className="grid gap-4">
            <Label htmlFor={label}>{label}</Label>
            <Textarea defaultValue={initValue}  placeholder={placeholder} className={className} {...register}/>
            <InputError field={fieldError} />
        </div>
    );
};

export default FormTextBox