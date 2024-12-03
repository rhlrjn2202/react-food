import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import { LoginCredentials } from '../types/auth';
import SEO from '../components/SEO';
import { isMobile } from 'react-device-detect';

export default function LoginPage() {
  const { login } = useAuth();
  const [error, setError] = useState<string>();

  const handleLogin = async (credentials: LoginCredentials) => {
    try {
      await login(credentials);
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
    <>
      <SEO 
        title="Sign In"
        description="Sign in to your SpeedBite account to order delicious food."
      />
      <div className="min-h-screen bg-sand-50 flex flex-col">
        <div className={`flex-1 flex flex-col justify-center ${isMobile ? 'py-8 px-4' : 'py-12 sm:px-6 lg:px-8'}`}>
          <div className={`sm:mx-auto sm:w-full ${isMobile ? 'w-full' : 'sm:max-w-md'}`}>
            {!isMobile && (
              <img
                className="mx-auto h-12 w-auto"
                src="/icon-192.png"
                alt="SpeedBite"
              />
            )}
            <h2 className={`mt-6 text-center text-3xl font-bold tracking-tight text-sand-900 ${isMobile ? 'text-2xl' : ''}`}>
              Sign in to your account
            </h2>
          </div>

          <div className={`mt-8 sm:mx-auto sm:w-full ${isMobile ? 'w-full' : 'sm:max-w-md'}`}>
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <AuthForm
                type="login"
                onSubmit={handleLogin}
                error={error}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}