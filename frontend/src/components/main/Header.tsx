'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Button from '@/components/ui/button';
import Accordion from "@/components/ui/accordion";
import Modal from '../ui/modal';

const burgerVariants = {
    open: { rotate: 45, y: 8, transition: { duration: 0.3 } },
    closed: { rotate: 0, y: 0, transition: { duration: 0.3 } }
};

const middleLineVariants = {
    open: { opacity: 0, transition: { duration: 0.3 } },
    closed: { opacity: 1, transition: { duration: 0.3 } }
};

const bottomLineVariants = {
    open: { rotate: -45, y: -14, transition: { duration: 0.3 } },
    closed: { rotate: 0, y: 0, transition: { duration: 0.3 } }
};

const menuVariants = {
    open: { height: "100vh", opacity: 1, transition: { duration: 0.5 } },
    closed: { height: 0, opacity: 0, transition: { duration: 0.5 } }
};

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(true);
    const [openHow, setOpenHow] = useState(false);
    const [openContacts, setOpenContacts] = useState(false);
    return (
        <>
            <Modal open={openHow} title={''} onClose={() => { setOpenHow(false) }}>
                <p className={'text-white text-center'}>Введи свой логин Steam<br /><br />Укажи желаемую сумму пополнения<br /><br />Оплати
                    любым удобным методом<br /><br />Получи деньги на баланс Steam!</p>
                <div className='flex flex-col gap-2 mt-10'>
                    <Accordion title={'ВАЖНО! Требования к аккаунту'}>
                        <p>Есть перечень требований к аккаунту, соответствие которых позволит нам совершить пополнение баланса:
                            Страной Вашего аккаунта должна одна из стран СНГ (Казахстан, Узбекистан, Кыргызстан, Россия и т.д).
                            Для аккаунтов со странами Китай, Турция и другими, не входящими в СНГ странам — пополнение недоступно.</p>
                    </Accordion>
                </div>
            </Modal>
            <Modal open={openContacts} title={''} onClose={() => { setOpenContacts(false) }}>
                <p className={'text-white text-center'}>Введи свой логин Steam<br /><br />Укажи желаемую сумму пополнения<br /><br />Оплати
                    любым удобным методом<br /><br />Получи деньги на баланс Steam!</p>
                <div className='flex flex-col gap-2 mt-10'>
                    <Accordion title={'ВАЖНО! Требования к аккаунту'}>
                        <p>Есть перечень требований к аккаунту, соответствие которых позволит нам совершить пополнение баланса:
                            Страной Вашего аккаунта должна одна из стран СНГ (Казахстан, Узбекистан, Кыргызстан, Россия и т.д).
                            Для аккаунтов со странами Китай, Турция и другими, не входящими в СНГ странам — пополнение недоступно.</p>
                    </Accordion>
                </div>
            </Modal>
            <header className={'max-w-[1380px] w-full px-5 xl:px-0 mx-auto mt-6'}>
                <nav className='flex items-center justify-between'>
                    <Link href={'/'} className='text-2xl lg:text-[40px] font-bold text-white'>
                        BestFor<span className={'bg-gradient-to-r from-emerald-600 to-emerald-800 font-bold bg-clip-text text-transparent'}>Gamers</span>
                    </Link>
                    <ul className='hidden lg:flex items-center gap-4 text-white'>
                        <li className='font-bold text-base cursor-pointer hover:text-emerald-500 transition-all' onClick={() => { setOpenContacts(true) }}>КОНТАКТЫ</li>
                        <li className='font-bold text-base cursor-pointer hover:text-emerald-500 transition-all' onClick={() => { setOpenHow(true) }}>ИНСТРУКЦИЯ</li>
                        <li className='font-bold text-base cursor-pointer hover:text-emerald-500 transition-all'>
                            <Link href={'#faq'} className='font-bold'>FAQ</Link>
                        </li>
                    </ul>
                    <div className='hidden lg:flex gap-2.5'>
                        <Button type={'outline'}>Войти</Button>
                        <Button>Зарегистрироваться</Button>
                    </div>

                    {/* Бургер для мобильного */}
                    <div className='lg:hidden' onClick={() => setMenuOpen(!menuOpen)}>
                        <motion.div className='z-[1000] relative w-6 h-6 cursor-pointer flex flex-col justify-between'>
                            <motion.div
                                className='w-full h-[2px] bg-white'
                                variants={burgerVariants}
                                initial='closed'
                                animate={menuOpen ? 'open' : 'closed'}
                            />
                            <motion.div
                                className='w-full h-[2px] bg-white'
                                variants={middleLineVariants}
                                initial='closed'
                                animate={menuOpen ? 'open' : 'closed'}
                            />
                            <motion.div
                                className='w-full h-[2px] bg-white'
                                variants={bottomLineVariants}
                                initial='closed'
                                animate={menuOpen ? 'open' : 'closed'}
                            />
                        </motion.div>
                    </div>

                    {/* Мобильное меню */}
                    <motion.div
                        className="lg:hidden z-[100] fixed top-0 left-0 w-full bg-zinc-900 flex flex-col items-center justify-center text-white"
                        variants={menuVariants}
                        initial='closed'
                        animate={menuOpen ? 'open' : 'closed'}
                    >
                        <ul className='flex flex-col items-center gap-8 text-white text-xl'>
                            <li className='font-bold cursor-pointer hover:text-emerald-500 transition-all' onClick={() => {
                                setMenuOpen(false);
                                setOpenContacts(true);
                            }}>КОНТАКТЫ</li>
                            <li className='font-bold cursor-pointer hover:text-emerald-500 transition-all' onClick={() => {
                                setMenuOpen(false)
                                setOpenHow(true)
                            }}>ИНСТРУКЦИЯ</li>
                            <li className='font-bold cursor-pointer hover:text-emerald-500 transition-all'>
                                <Link href={'#faq'} className='font-bold' onClick={() => setMenuOpen(false)}>FAQ</Link>
                            </li>
                        </ul>
                        <div className='flex flex-col gap-4 mt-10'>
                            <Button type={'outline'}>Войти</Button>
                            <Button>Зарегистрироваться</Button>
                        </div>
                    </motion.div>
                </nav>
            </header>
        </>
    );
};

export default Header;
