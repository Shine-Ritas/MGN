import * as Yup from 'yup'

export const comicValidationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    author: Yup.string().required('Author is required'),
    // cover: Yup.string().required('Cover Image is required'),
    // status: Yup.number().required('Status is required'),
    finish_status: Yup.number().required('Finish Status is required'),
    // legal_age: Yup.boolean().required('Legal Age is required'),
    // rating: Yup.number().required('Rating is required'),
    mogou_type: Yup.number().required('Mogou Type is required'),
    // released_year: Yup.string().required('Released Year is required'),
    // released_at: Yup.string().required('Released At is required'),
    // categories: Yup.array().of(Yup.object().shape({
    //     id: Yup.number().required('Category ID is required'),
    //     title: Yup.string().required('Category Title is required'),
    // })).required('Category is required'),
})

