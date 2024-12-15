import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Spinner from "@/components/ui/spinner";
import { Dayjs } from "dayjs";

interface ItemsType {
    id: number;
    orderId: number;
    username: string;
    date: Dayjs;
    amount: number;
    paymentMethod: string;
    status: string;
    ip: string;
}

const Search = ({ items }: { items?: ItemsType[] }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredItems, setFilteredItems] = useState<ItemsType[]>([]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchTerm(value);
        if (items) {
            const filtered = items.filter(item =>
                item.username.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredItems(filtered);
        }
    };

    return (
        <div className='w-full h-12 rounded-xl relative'>
            <input
                className='w-full h-full rounded-xl appearance-none border-none outline-none text-white px-2 font-bold bg-[#272729] focus:bg-[#333334] placeholder:text-zinc-600 transition-colors shadow-lg'
                value={searchTerm}
                onChange={handleInputChange}
                placeholder="Search by username"
            />
            <AnimatePresence>
                {searchTerm && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className='absolute w-full min-h-14 max-h-[360px] bg-[#333334] z-50 rounded-xl top-14 overflow-x-hidden overflow-y-auto [&::-webkit-scrollbar]:w-0'
                    >
                        {items ? (
                            <div className='w-full flex flex-col'>
                                {filteredItems.length > 0 ? (
                                    filteredItems.map(item => (
                                        <motion.div
                                            key={item.id}
                                            className='p-2 hover:bg-[#444445] cursor-pointer'
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.1 }}
                                        >
                                            <p className='text-white font-semibold'>{item.username}</p>
                                            <p className='text-gray-400 text-sm'>{item.date.format("DD.MM.YYYY")} | {item.orderId}</p>
                                        </motion.div>
                                    ))
                                ) : (
                                    <p className='text-gray-400 text-sm p-2'>No results found</p>
                                )}
                            </div>
                        ) : (
                            <Spinner />
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Search;
