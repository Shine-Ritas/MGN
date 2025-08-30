import * as Yup from 'yup';

export const registerValidationSchema = Yup.object().shape({
  user_code: Yup.string()
    .required('User Code is required')
    .min(3, 'User Code must be at least 3 characters')
    .max(20, 'User Code must not exceed 20 characters'),
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(40, 'Password must not exceed 40 characters'),
  confirm_password: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
  name: Yup.string()
    .required('Full Name is required')
    .min(2, 'Full Name must be at least 2 characters')
    .max(50, 'Full Name must not exceed 50 characters'),
});
