import * as Yup from 'yup'

export const adminActionValidation = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required'),
    role_id: Yup.number().required('Role is required'),
    password: Yup.string().required('Password is required'),
})

export type AdminActionValidationType = Yup.InferType<typeof adminActionValidation>