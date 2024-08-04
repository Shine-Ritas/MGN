type InputErrorProps = {
    field?: { message?: string }
}

const InputError = ({ field }: InputErrorProps) => {
    return (
        field?.message && <p className="text-red-500 text-xs font-bold ">{"*" + field?.message}</p>
    )
}

export default InputError