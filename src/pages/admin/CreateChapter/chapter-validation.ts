
import * as Yup from 'yup';

  export const createCard1Validation = Yup.object().shape({
        title : Yup.string()
            .required('Title is required')
            .min(3, 'Title must be at least 3 characters')
            .max(50, 'Title must not exceed 50 characters'),

        description : Yup.string()
            .required('Description is required')
            .min(3, 'Description must be at least 3 characters')
            .max(500, 'Description must not exceed 500 characters'),
        
        chapter_number : Yup.number()
            .typeError('Amount must be a number')
            .required('Chapter number is required')
            .min(1, 'Chapter number must be at least 1')
            .max(1000, 'Chapter number must not exceed 1000'),
        
        third_party_url : Yup.string()
            .nullable()
            .url('Third-party URL is invalid')
            .max(255, 'Third-party URL must not exceed 255 characters'),
        
        subscription_only : Yup.boolean()
  });

export type createCard1ValidationType = Yup.InferType<typeof createCard1Validation>;