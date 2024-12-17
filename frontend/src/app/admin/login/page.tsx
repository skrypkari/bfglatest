'use client'
import React, {useState} from 'react';
import { IoIosArrowRoundBack } from "react-icons/io";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import axios from "axios";
import {useRouter} from "next/navigation";
import {setAccessToken} from "@/store/authSlice";
import {useDispatch} from "react-redux";



const Page = () => {

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | undefined>();
    const [loading, setLoading] = useState<boolean>(false);

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if(loading){
            return;
        }

        if(!username || !password){
            setError('Fill all fields !')
        }else{
            setError(undefined);
            setLoading(true);
            try{
                const res = await axios.post('http://localhost:5000/api/auth/login', {email: username, password: password}, {withCredentials: true});
                if(res.data.accessToken){
                    localStorage.setItem('accessToken', res.data.accessToken)
                    setTimeout(() => {
                        setLoading(false);
                        setError(undefined);
                        router.push('/admin')
                    }, 2000)
                }else{
                    setTimeout(() => {
                        setLoading(false)
                        setError('Admin not found !')
                    }, 5000)
                }
            }catch (e){
                console.log(e);
                setTimeout(() => {
                    setLoading(false)
                    setError('Server error !')
                }, 5000)
            }
        }
    }


    return (
        <div className='flex items-center justify-center min-h-screen'>
            <div className='max-w-[600px] w-full p-5 bg-gradient-to-tl from-zinc-900 border border-white/15 to-zinc-800 rounded-xl mx-5'>
                <div className='flex justify-between items-center'>
                    <span className='font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-t from-emerald-500 to-emerald-900'>Admin Panel</span>
                    <IoIosArrowRoundBack className='text-white text-4xl'/>
                </div>
                <form onSubmit={handleSubmit} className='pt-6 space-y-6'>
                    {loading ? (
                        <div className='flex justify-center py-16'>
                            <svg aria-hidden="true" className="w-8 h-8 text-zinc-600 animate-spin fill-emerald-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                        </div>
                    ) : (
                        <>
                            <Input placeholder={'Login'} name={'username'} value={username} onChange={(e) => {
                                setUsername(e)
                            }}/>
                            <Input placeholder={'Password'} name={'password'} value={password} onChange={(e) => {
                                setPassword(e)
                            }} inputType={'password'}/>
                        </>
                    )}
                    {error && <p className='text-emerald-500 font-bold'>{error}</p>}
                    <div className='flex flex-col'>
                        <Button>Log in</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Page;