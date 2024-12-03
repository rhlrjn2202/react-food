import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LoginCredentials, SignupCredentials, AuthFormData } from '../types/auth';

// Custom regex for Indian mobile numbers (10 digits starting with 6-9)
const INDIAN_MOBILE_REGEX = /^[6-9]\d{9}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const loginSchema = z.object({
  identifier: z.string()
    .min(1, 'Email or mobile number is required')
    .refine((val) => {
      return EMAIL_REGEX.test(val) || INDIAN_MOBILE_REGEX.test(val);
    }, 'Please enter a valid email or 10-digit mobile number'),
  password: z.string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters'),
});

const signupSchema = z.object({
  name: z.string()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]*$/, 'Name can only contain letters and spaces'),
  email: z.string()
    .min(1, 'Email is required')
    .regex(EMAIL_REGEX, 'Please enter a valid email address'),
  mobile: z.string()
    .min(1, 'Mobile number is required')
    .regex(INDIAN_MOBILE_REGEX, 'Please enter a valid 10-digit mobile number starting with 6-9'),
  password: z.string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  confirmPassword: z.string()
    .min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginForm = z.infer<typeof loginSchema>;
type SignupForm = z.infer<typeof signupSchema>;

interface AuthFormProps {
  type: 'login' | 'signup';
  onSubmit: (data: any) => Promise<void>;
  error?: string;
}

type FormFields = LoginForm & SignupForm;

type InputId = keyof FormFields;

export default function AuthForm({ type, onSubmit, error }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(type === 'login' ? loginSchema : signupSchema),
    mode: 'onBlur',
    defaultValues: type === 'login' 
      ? { identifier: '', password: '' }
      : { name: '', email: '', mobile: '', password: '', confirmPassword: '' },
  });

  const handleFormSubmit = async (formData: any) => {
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderInput = (
    id: InputId,
    label: string,
    type: string,
    placeholder?: string,
    showToggle?: boolean,
    isShown?: boolean,
    onToggle?: () => void
  ) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative mt-1">
        <input
          id={id}
          type={showToggle && isShown ? 'text' : type}
          placeholder={placeholder}
          {...register(id)}
          className={`block w-full px-3 py-2 bg-white border rounded-md shadow-sm
            placeholder:text-gray-400 
            ${errors[id] 
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
              : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
            }
            focus:outline-none focus:ring-2`}
        />
        {showToggle && (
          <button
            type="button"
            onClick={onToggle}
            className="absolute inset-y-0 right-0 flex items-center pr-3"
          >
            {isShown ? (
              <EyeOff className="w-5 h-5 text-gray-400" />
            ) : (
              <Eye className="w-5 h-5 text-gray-400" />
            )}
          </button>
        )}
      </div>
      {errors[id] && (
        <p className="mt-1 text-sm text-red-600" role="alert">
          {errors[id]?.message}
        </p>
      )}
    </div>
  );

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4" noValidate>
      {type === 'signup' && (
        renderInput('name', 'Full Name', 'text', 'Enter your full name')
      )}

      {type === 'signup' ? (
        <>
          {renderInput('email', 'Email Address', 'email', 'Enter your email')}
          {renderInput('mobile', 'Mobile Number', 'tel', '10-digit mobile number')}
        </>
      ) : (
        renderInput('identifier', 'Email or Mobile Number', 'text', 'Enter email or mobile number')
      )}

      {renderInput(
        'password',
        'Password',
        'password',
        type === 'signup' ? 'Create a strong password' : 'Enter your password',
        true,
        showPassword,
        () => setShowPassword(!showPassword)
      )}

      {type === 'signup' && (
        renderInput(
          'confirmPassword',
          'Confirm Password',
          'password',
          'Confirm your password',
          true,
          showConfirmPassword,
          () => setShowConfirmPassword(!showConfirmPassword)
        )
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {isSubmitting ? (
          <Loader2 className="w-5 h-5 animate-spin mx-auto" />
        ) : type === 'login' ? (
          'Sign In'
        ) : (
          'Sign Up'
        )}
      </button>

      <p className="text-sm text-gray-600 text-center">
        {type === 'login' ? (
          <>
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-600 hover:text-blue-500">
              Sign up
            </Link>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:text-blue-500">
              Sign in
            </Link>
          </>
        )}
      </p>

      {type === 'signup' && (
        <div className="text-xs text-gray-500 mt-4">
          <p className="mb-1">Password must contain:</p>
          <ul className="list-disc pl-4 space-y-1">
            <li>At least 8 characters</li>
            <li>One uppercase letter</li>
            <li>One lowercase letter</li>
            <li>One number</li>
            <li>One special character</li>
          </ul>
        </div>
      )}
    </form>
  );
}