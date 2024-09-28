export interface FormInputProps {
    type?: string;
    label?: string;
    placeholder?: string;
    defaultValue?: string | number;
    fieldError?: { message?: string };
    register: any;
    divClassName?: string;
    disabled?: boolean;
  }
  