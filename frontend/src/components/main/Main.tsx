import React from 'react';
import franklin from '../../assets/franklin.png'
import Image from "next/image";
import Form from "@/components/main/Form";
const Main = () => {
    return (
        <main className={'max-w-[1380px] w-full mx-auto mt-10 lg:mt-20 px-5 xl:px-0'}>
            <div className='flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-24'>
                <Image src={franklin} alt={''} loading={'lazy'} width={500} className='hidden lg:block'/>
                <div className='lg:max-w-[440px] w-full'>
                    <h1 className='text-5xl font-bold text-left text-white'>Пополнить<br/>Баланс Steam</h1>
                    <p className='text-2xl text-white/80 font-bold text-left'>Моментальное пополнение <br/>аккаунта
                        Steam</p>
                    <Form/>
                </div>
            </div>
        </main>
    );
};

export default Main;