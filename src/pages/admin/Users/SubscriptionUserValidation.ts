import * as Yup from 'yup';

export const subscriptionValidationSchema = Yup.object().shape({
        name : Yup.string().required('Name is required'),
        user_code : Yup.string().required('User code is required'),
        email : Yup.string().email('Invalid email').nullable(),
        password : Yup.string().required('Password is required'),
        current_subscription_id : Yup.number().required('Subscription is required')
})

export const UserDetailInfoValidationSchema = Yup.object().shape({
        name : Yup.string().required('Name is required'),
        email : Yup.string().email('Invalid email').nullable(),
        user_code : Yup.string().required('User code is required'),
        password : Yup.string().nullable()
})



// export the type
export type SubscriptionUser = Yup.InferType<typeof subscriptionValidationSchema>
export type UserDetailInfo = Yup.InferType<typeof UserDetailInfoValidationSchema>
