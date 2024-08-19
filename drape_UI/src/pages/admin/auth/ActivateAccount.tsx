import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { activateAccount } from './authSlice';
import { RootState } from '../../../drape/store';
import Toast from '../../../components/Toast';

const ActivateAccount: React.FC = () => {
  const { uidb64, token } = useParams<{ uidb64: string; token: string }>();
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState<'success' | 'error' | 'warning'>('success');
  const [toastMessage, setToastMessage] = useState('');
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector((state: RootState) => state.auth.status);
  const authError = useAppSelector((state: RootState) => state.auth.error);
  const navigate = useNavigate();

  useEffect(() => {
    if (uidb64 && token) {
      dispatch(activateAccount({ uidb64, token }))
        .unwrap()
        .then(() => {
          setToastType('success');
          setToastMessage('Account activated successfully!');
          setShowToast(true);
          setTimeout(() => {
            setShowToast(false);
            navigate('/login'); // Redirect to login page after successful activation
          }, 3000);
        })
        .catch(() => {
          setToastType('error');
          setToastMessage(authError?.message || 'Account activation failed');
          setShowToast(true);
          setTimeout(() => {
            setShowToast(false);
          }, 3000);
        });
    }
  }, [uidb64, token, dispatch, navigate, authError]);

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Activating Account...</h2>
        <p className="text-center text-gray-600">Please wait while we activate your account.</p>
      </div>
      {showToast && <Toast type={toastType} message={toastMessage} />}
    </section>
  );
};

export default ActivateAccount;
