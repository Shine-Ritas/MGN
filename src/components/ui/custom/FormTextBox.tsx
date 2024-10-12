import  { Suspense, lazy, useEffect } from "react";
import { FormInputProps } from "../intefaces/forminput";
import { Label } from "@/components/ui/label";
import InputError from "../input-error";
import { Textarea } from "../textarea";

// Lazy load the ReusableRichTextEditor component
const ReusableRichTextEditor = lazy(() => import("./AdvancedRichEditor"));

interface FormTextBoxProps extends FormInputProps {
    className?: string;
    defaultValue?: string;
    editorType? : "normal" | "rich-editor";
    setValue?: any;
}

const FormTextBox = ({
    label = "",
    placeholder = "",
    defaultValue = "",
    fieldError,
    register,
    className = "min-h-44",
    disabled = false,
    editorType = "normal",
    setValue,
}: FormTextBoxProps) => {

    const initValue = Number.isNaN(defaultValue) ? "" : defaultValue;

    useEffect(() => {
        setValue("description", initValue);
    }, [initValue, setValue]);

    return (
        <div className="grid gap-4">
            <Label htmlFor={label}>{label}</Label>

            {
                editorType === "normal" ? (
                    <Textarea defaultValue={initValue}
                        disabled={disabled}
                        placeholder={placeholder}
                        className={className}
                        {...register} />
                ) : (
                    // Wrap the lazy-loaded component with Suspense
                    <Suspense fallback={<div>Loading editor...</div>}>
                        <ReusableRichTextEditor
                            // className={className}
                            disabled={disabled}
                            placeholder={placeholder}
                            defaultValue={initValue}
                            register={register}
                            onChange={(content: string) => setValue("description",content)}
                        />
                    </Suspense>
                )
            }

            <InputError field={fieldError} />
        </div>
    );
};

export default FormTextBox;
