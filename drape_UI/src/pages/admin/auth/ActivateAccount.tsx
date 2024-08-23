import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { activateAccount } from './authSlice';
import { RootState } from '../../../drape/store';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ActivateAccount: React.FC = () => {
  const { uidb64, token } = useParams<{ uidb64: string; token: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const activationStatus = useAppSelector((state: RootState) => state.auth.status);
  const authError = useAppSelector((state: RootState) => state.auth.error);

  useEffect(() => {
    if (uidb64 && token) {
      dispatch(activateAccount({ uidb64, token }));
    }
  }, [uidb64, token, dispatch]);

  useEffect(() => {
    if (activationStatus === 'succeeded') {
      toast.success('Account activated successfully!');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } else if (activationStatus === 'failed') {
      toast.error(authError?.message || 'Account activation failed');
    }
  }, [activationStatus, authError, navigate]);

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Activating Account...</h2>
        <p className="text-center text-gray-600">Please wait while we activate your account.</p>
      </div>
      <ToastContainer />
    </section>
  );
};

export default ActivateAccount;
