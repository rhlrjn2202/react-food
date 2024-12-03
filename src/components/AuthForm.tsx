import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LoginCredentials, SignupCredentials } from '../types/auth';

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
  mode: 'login' | 'signup';
  onSubmit: (data: LoginCredentials | SignupCredentials) => Promise<void>;
  error?: string;
}

export default function AuthForm({ mode, onSubmit, error }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(mode === 'login' ? loginSchema : signupSchema),
    mode: 'onBlur', // Validate on blur
    defaultValues: mode === 'login' 
      ? { identifier: '', password: '' }
      : { name: '', email: '', mobile: '', password: '', confirmPassword: '' },
  });

  const handleFormSubmit = async (data: LoginForm | SignupForm) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderInput = (
    id: string,
    label: string,
    type: string,
    placeholder?: string,
    showToggle?: boolean,
    isShown?: boolean,
    onToggle?: () => void
  ) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-sand-700">
        {label}
      </label>
      <div className="relative mt-1">
        <input
          id={id}
          type={showToggle && isShown ? 'text' : type}
          placeholder={placeholder}
          {...register(id)}
          className={`block w-full px-3 py-2 bg-white border rounded-md shadow-sm
            placeholder:text-sand-400 
            ${errors[id] 
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
              : 'border-sand-300 focus:border-primary-500 focus:ring-primary-500'
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
              <EyeOff className="w-5 h-5 text-sand-400" />
            ) : (
              <Eye className="w-5 h-5 text-sand-400" />
            )}
          </button>
        )}
      </div>
      {errors[id] && (
        <p className="mt-1 text-sm text-red-600" role="alert">
          {errors[id]?.message as string}
        </p>
      )}
    </div>
  );

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4" noValidate>
      {mode === 'signup' && (
        renderInput('name', 'Full Name', 'text', 'Enter your full name')
      )}

      {mode === 'signup' ? (
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
        mode === 'signup' ? 'Create a strong password' : 'Enter your password',
        true,
        showPassword,
        () => setShowPassword(!showPassword)
      )}

      {mode === 'signup' && (
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

      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full btn-primary"
      >
        {isSubmitting ? (
          <Loader2 className="w-5 h-5 animate-spin mx-auto" />
        ) : mode === 'login' ? (
          'Sign In'
        ) : (
          'Sign Up'
        )}
      </button>

      <p className="text-sm text-sand-600 text-center">
        {mode === 'login' ? (
          <>
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary-600 hover:text-primary-500">
              Sign up
            </Link>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <Link to="/login" className="text-primary-600 hover:text-primary-500">
              Sign in
            </Link>
          </>
        )}
      </p>

      {mode === 'signup' && (
        <div className="text-xs text-sand-500 mt-4">
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