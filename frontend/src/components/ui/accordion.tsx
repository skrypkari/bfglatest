'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";


const Accordion = ({ title, children }: { title: string; children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(prev => !prev);
    };

    return (
        <div className="border-white/15 border bg-white/5 rounded-xl">
            <motion.div
                onClick={toggleAccordion}
                className={`flex justify-between items-center p-4 cursor-pointer hover:bg-white/15 transition-all ${isOpen ? 'rounded-x-xl rounded-t-xl' : 'rounded-xl'}`}
            >
                <span className="font-bold text-white">{title}</span>
                <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <IoIosArrowDown className='text-white'/>
                </motion.span>
            </motion.div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <div className="p-4 text-white">{children}</div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Accordion;