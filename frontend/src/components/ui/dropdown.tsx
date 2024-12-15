import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DropdownProps {
    children: React.ReactNode;
    dropdownItems?: string[];
    selectedItem: number;
    onSelect?: (item: string, index: number) => void;
}

const Dropdown = ({ children, dropdownItems, selectedItem, onSelect }: DropdownProps) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="relative inline-block"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Содержимое, которое будет видно постоянно */}
            {children}

            {/* Выпадающий список */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute md:right-0 md:left-auto left-0 mt-2 w-48 p-3 bg-[#272729] rounded-xl shadow-lg z-10"
                    >
                        <ul className="space-y-2">
                            {dropdownItems?.map((item, index) => (
                                <li
                                    key={index}
                                    className={`hover:bg-[#333334] text-white px-2 py-1 rounded cursor-pointer ${selectedItem === index ? "bg-[#333334]" : ''}`}
                                    onClick={() => {
                                        if (onSelect) {
                                            onSelect(item, index)
                                        }}}
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Dropdown;
