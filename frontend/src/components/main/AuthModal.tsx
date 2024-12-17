import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Modal from '@/components/ui/modal';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAccessToken } from '@/store/authSlice';

const AuthModal = ({ open, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async () => {
    let validationErrors = {};
    if (!validateEmail(email)) {
      validationErrors.email = 'Invalid email format';
    }
    if (password.length < 6) {
      validationErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post(`/api/${isLogin ? 'login' : 'register'}`, { email, password });
        dispatch(setAccessToken(response.data.token));
        onClose();
      } catch (error) {
        setErrors({ api: 'Authentication failed' });
      }
    }
  };

  return (
    <Modal open={open} onClose={onClose} title={isLogin ? 'Login' : 'Register'}>
      <div className="flex justify-center mb-4">
        <button
          className={`px-4 py-2 ${isLogin ? 'text-emerald-600' : 'text-gray-500'}`}
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
        <button
          className={`px-4 py-2 ${!isLogin ? 'text-emerald-600' : 'text-gray-500'}`}
          onClick={() => setIsLogin(false)}
        >
          Register
        </button>
      </div>
      <div className="space-y-4">
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full p-2 border ${errors.email ? 'border-red-400' : 'border-gray-300'} focus:border-emerald-600`}
          />
          {errors.email && <p className="text-rose-500">{errors.email}</p>}
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full p-2 border ${errors.password ? 'border-red-400' : 'border-gray-300'} focus:border-emerald-600`}
          />
          {errors.password && <p className="text-rose-500">{errors.password}</p>}
        </div>
        {errors.api && <p className="text-rose-500">{errors.api}</p>}
        <button
          onClick={handleSubmit}
          className="w-full p-2 bg-emerald-600 text-white"
        >
          {isLogin ? 'Login' : 'Register'}
        </button>
      </div>
    </Modal>
  );
};

export default AuthModal;