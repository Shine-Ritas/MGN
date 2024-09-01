import * as Yup from 'yup';


export const botMutateValidation = Yup.object().shape({
    name : Yup.string().required('Category name is required'),
    token_key : Yup.string().required('Token is required'),
    type : Yup.number().required('Type is required'),
    available_ids : Yup.string().required('Available ids is required'),
})