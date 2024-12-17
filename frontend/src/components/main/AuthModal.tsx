import React, {useState} from 'react';
import Modal from '@/components/ui/modal';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {setAccessToken} from '@/store/authSlice';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';

const AuthModal = ({open, onClose}: { open: boolean, onClose: () => void }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState<{
        email?: string,
        password?: string,
        confirmPassword?: string,
        api?: string
    }>({});
    const dispatch = useDispatch();

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSubmit = async () => {
        const validationErrors: { email?: string, password?: string, confirmPassword?: string, api?: string } = {};

        if (!validateEmail(email)) {
            validationErrors.email = 'Invalid email format';
        }
        if (password.length < 6) {
            validationErrors.password = 'Password must be at least 6 characters';
        }
        if (!isLogin && password !== confirmPassword) {
            validationErrors.confirmPassword = 'Passwords do not match';
        }
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            try {
                const response = await axios.post(`http://localhost:5000/api/auth/${isLogin ? 'login' : 'register'}`, {email, password});
                localStorage.setItem('accessToken', response.data.accessToken);
                dispatch(setAccessToken(response.data.accessToken));
                onClose();
            } catch (error) {
                console.log(error);
                setErrors({api: 'Authentication failed'});
            }
        }
    };

    return (
        <Modal open={open} onClose={onClose} title={isLogin ? 'Login' : 'Register'}>
            <div className="flex justify-center mb-4">
                <div className="flex justify-center mb-4">
                     <span
                         className={`cursor-pointer transition-all px-4 py-2 ${isLogin ? 'text-emerald-600' : 'text-gray-500'}`}
                         onClick={() => setIsLogin(true)}>
                            Login
                    </span>
                    <span
                        className={`cursor-pointer transition-all px-4 py-2 ${!isLogin ? 'text-emerald-600' : 'text-gray-500'}`}
                        onClick={() => setIsLogin(false)}>
                            Register
                  </span>
                </div>
            </div>
            <div className="space-y-4">
                <div>
                    <Input
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e)}
                    />
                    {errors.email && <p className="text-rose-500">{errors.email}</p>}
                </div>
                <div>
                    <Input
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e)}
                    />
                    {errors.password && <p className="text-rose-500">{errors.password}</p>}
                </div>
                {!isLogin && (
                    <div>
                        <Input
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e)}
                        />
                        {errors.confirmPassword && <p className="text-rose-500">{errors.confirmPassword}</p>}
                    </div>
                )}
                {errors.api && <p className="text-rose-500">{errors.api}</p>}
                <Button
                    onClick={handleSubmit}
                    className="w-full p-2 bg-emerald-600 text-white"
                >
                    {isLogin ? 'Login' : 'Register'}
                </Button>
            </div>
        </Modal>
    );
};

export default AuthModal;