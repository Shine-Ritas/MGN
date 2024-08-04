import * as Yup from 'yup';


export const categoryValidationSchema = Yup.object().shape({
    title : Yup.string().
    required('Category name is required')
})