'use client'

import {AnimatePresence, motion} from 'framer-motion';
import React from 'react';
import { IoMdClose } from 'react-icons/io'; // Не забудьте импортировать иконку

interface ModalProps {
    open: boolean;
    title: string;
    onClose: () => void; // Функция для закрытия модала
    children: React.ReactNode; // Дочерние элементы
}

const Modal: React.FC<ModalProps> = ({ open, title, onClose, children }: ModalProps) => {
    if (!open) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 0.1}}
                className="left-0 right-0 top-0 bottom-0 fixed bg-black/40 z-[1001] flex items-center justify-center overflow-y-auto"
                onClick={onClose}
            >
                <motion.div
                    className="p-10 mx-5 sm:mx-0 max-w-[500px] w-full bg-zinc-900 rounded-xl border border-white/15"
                    layout
                    initial={{scale: 0}}
                    animate={{scale: 1}}
                    exit={{scale: 0}}
                    transition={{duration: 0.2}}
                    onClick={(e) => {e.stopPropagation()}}
                >
                    <div className='flex justify-between items-center text-white w-full'>
                        <span className='font-bold text-xl'>{title}</span>
                        <IoMdClose
                            onClick={onClose} // Используйте onClose для закрытия
                            className='text-xl cursor-pointer hover:scale-125 hover:text-emerald-600 transition-all'
                        />
                    </div>
                    <div className='mt-5'>
                        {children}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default Modal;
