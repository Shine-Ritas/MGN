
export interface FormInputProps {
    type?: string;
    label?: string;
    placeholder?: string;
    defaultValue?: string | number;
    fieldError?: { message?: string };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register: any;
    divClassName?: string;
    disabled?: boolean;
  }
  