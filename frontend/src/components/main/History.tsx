'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";

const History = () => {
    const names: string[] = [
        'Kari', 'Loomis',
        'Marquise', 'Edwards',
        'Averi', 'Colburn',
        'Emerald', 'Goff',
        'Kevon', 'Cadena',
        'Shayna', 'Montano',
        'Dequan', 'Paris',
        'Jackie', 'Millard',
        'Saul', 'Terry',
        'Kade', 'Kerns',
    ];

    const generateRandomClient = () => {
        const randomName = names[Math.floor(Math.random() * names.length)];
        const randomAmount = (Math.random() * 1000).toFixed(2);
        return { id: Date.now() + Math.random(), name: randomName, amount: randomAmount };
    };

    const generateInitialClients = (count: number) => {
        return Array.from({ length: count }, () => generateRandomClient());
    };

    const [clients, setClients] = useState<{ id: number; name: string; amount: string }[]>([]);

    useEffect(() => {
        // Генерируем начальные клиенты только на клиенте
        setClients(generateInitialClients(13));

        const intervalId = setInterval(() => {
            const newClient = generateRandomClient();
            setClients(prevClients => {
                const updatedClients = [newClient, ...prevClients];
                return updatedClients.length > 20 ? updatedClients.slice(0, 20) : updatedClients;
            });
        }, 5000); // Каждые 5 секунд генерируем нового клиента

        return () => clearInterval(intervalId); // Очищаем интервал при размонтировании компонента
    }, []);

    return (
        <div className={'h-8 w-full overflow-hidden flex lg:absolute py-10 bottom-0 '}>
            <AnimatePresence>
                {clients.map((client, i) => {
                    return (
                        <motion.span
                            key={client.id}
                            layout
                            className={`text-white text-nowrap text-[12px] bg-white/5 border-y border-r border-white/10 flex items-center gap-1 p-2.5`}
                            initial={{ opacity: 0 }} // Плавное появление нового элемента слева
                            animate={{ opacity: 1 }} // Анимация появления
                            exit={{ opacity: 0, x: 50 }} // Плавное исчезновение элемента вправо
                            transition={{ duration: 0.2, type: 'tween', delay: i === 0 ? 0.2 : 0 }}
                        >
                            <span className='font-bold'>{client.name}</span> пополнил на <span className='font-bold'>{client.amount} ₽</span>
                        </motion.span>
                    );
                })}
            </AnimatePresence>
        </div>
    );
};

export default History;
