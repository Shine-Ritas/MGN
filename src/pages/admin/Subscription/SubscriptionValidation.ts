import * as Yup from 'yup';

export const subscriptionValidationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    price: Yup.number().required('Price is required'),
    duration: Yup.number().required('Duration is required'),
    max: Yup.number().required('Max is required'),
})
