import * as yup from 'yup';

export const signupSchema = yup.object({
  name: yup.string()
    .min(20, 'Name must be at least 20 characters')
    .max(60, 'Name must be at most 60 characters')
    .required('Name is required'),
  email: yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  address: yup.string()
    .max(400, 'Address cannot exceed 400 characters')
    .required('Address is required'),
  password: yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(16, 'Password must be at most 16 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[!@#$&*]/, 'Password must contain at least one special character (!@#$&*)')
    .required('Password is required'),
});

export const loginSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

export const storeSchema = yup.object({
  name: yup.string().required('Store name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  address: yup.string().required('Address is required'),
});

export const passwordUpdateSchema = yup.object({
  oldPassword: yup.string().required('Current password is required'),
  newPassword: yup.string()
    .min(8, 'Min 8 chars')
    .max(16, 'Max 16 chars')
    .matches(/[A-Z]/, 'One uppercase required')
    .matches(/[!@#$&*]/, 'One special char required')
    .required('New password is required'),
});