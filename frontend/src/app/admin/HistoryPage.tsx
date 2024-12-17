import React, { useEffect, useState } from 'react';
import Button from "@/components/ui/button";
import Search from '@/components/ui/search';
import { Dayjs } from "dayjs";
import { FaFilter } from "react-icons/fa";
import Dropdown from "@/components/ui/dropdown";
import { FaChevronRight } from "react-icons/fa6";
import axios from "axios";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

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

const HistoryPage = () => {
    const [items, setItems] = useState<ItemsType[]>([]);
    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:5000/api/admin/payments', { headers: { Authorization: `Bearer ${accessToken}` } });
            setItems(response.data);
        }
        fetchData();
    }, [accessToken]);

    const [selectedItem, setSelectedItem] = useState(3);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(items.length / itemsPerPage);

    const handlePageChange = (page: number) => {
        if(page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    const dropdownItems = [
        'С начала месяца',
        'За последний месяц',
        'За всё время'
    ];

    const handleSelect = (item: string, index: number) => {
        console.log(item);
        setSelectedItem(index);
    };

    const handleDownload = () => {
        const worksheet = XLSX.utils.json_to_sheet(items.map(item => ({
            ID: item.id,
            'Order ID': item.orderId,
            Username: item.username,
            Date: item.date.format('YYYY-MM-DD HH:mm'),
            Amount: item.amount,
            'Payment Method': item.paymentMethod,
            Status: item.status,
            IP: item.ip
        })));
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Payments');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(data, 'payments.xlsx');
    };

    return (
        <div className='min-h-screen px-2 xl:px-10 pt-10 pb-32'>
            <div className='flex flex-col xl:grid grid-cols-12 gap-12'>
                <div className='p-8 col-span-12 min-h-[80vh] bg-gradient-to-tl from-zinc-900 rounded-xl border border-white/10 relative'>
                    <span className='text-3xl text-transparent bg-clip-text bg-gradient-to-t from-emerald-400 to-emerald-600'>Список покупок</span>
                    <div className='flex flex-col md:flex-row gap-5 my-5 items-center'>
                        <Search items={items} />
                        <div className='flex w-full md:w-auto gap-5 items-center'>
                            <Dropdown dropdownItems={dropdownItems} onSelect={handleSelect} selectedItem={selectedItem}>
                                <div className='h-12 w-14 border border-emerald-600 hover:bg-emerald-600 bg-transparent transition-colors rounded-xl flex items-center justify-center text-white'>
                                    <FaFilter />
                                </div>
                            </Dropdown>
                            <div className='w-full flex flex-col md:block'>
                                <Button type={"outline"} onClick={handleDownload}>Скачать</Button>
                            </div>
                        </div>
                    </div>

                    <div className='mt-5 overflow-x-auto'>
                        <table className='min-w-full bg-zinc-900 rounded-xl border-white/10'>
                            <thead className='bg-zinc-900'>
                                <tr>
                                    <th className='px-6 py-3 text-left text-sm rounded-tl-xl font-medium text-gray-300'>ID</th>
                                    <th className='px-6 py-3 text-left text-sm font-medium text-gray-300'>Order ID</th>
                                    <th className='px-6 py-3 text-left text-sm font-medium text-gray-300'>Username</th>
                                    <th className='px-6 py-3 text-left text-sm font-medium text-gray-300'>Date</th>
                                    <th className='px-6 py-3 text-left text-sm font-medium text-gray-300'>Amount</th>
                                    <th className='px-6 py-3 text-left text-sm font-medium text-gray-300'>Payment Method</th>
                                    <th className='px-6 py-3 text-left text-sm font-medium text-gray-300'>Status</th>
                                    <th className='px-6 py-3 text-left text-sm rounded-tr-xl font-medium text-gray-300'>IP</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((item, index) => (
                                    <tr key={item.id} className='bg-zinc-800 hover:bg-zinc-600'>
                                        <td className={`px-6 py-4 text-gray-300 ${index === items.length - 1 ? 'rounded-bl-xl' : ''}`}>{item.id}</td>
                                        <td className='px-6 py-4 text-gray-300'>{item.orderId}</td>
                                        <td className='px-6 py-4 text-gray-300'>{item.username}</td>
                                        <td className='px-6 py-4 text-gray-300 whitespace-nowrap'>{item.date.format('YYYY-MM-DD HH:mm')}</td>
                                        <td className='px-6 py-4 text-gray-300'>{item.amount}</td>
                                        <td className='px-6 py-4 text-gray-300'>{item.paymentMethod}</td>
                                        <td className='px-6 py-4 text-gray-300'>{item.status}</td>
                                        <td className={`px-6 py-4 text-gray-300 ${index === items.length - 1 ? 'rounded-br-xl' : ''}`}>{item.ip}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className='flex items-center justify-center mt-5 gap-5'>
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`border border-white/15 p-1.5 rounded-lg ${currentPage === 1 ? 'opacity-50 text-white/15 cursor-not-allowed' : 'bg-emerald-600 text-white'}`}>
                            <FaChevronRight className='rotate-180' />
                        </button>
                        <p className='text-white font-bold'>{currentPage} из {totalPages}</p>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`border border-white/15 p-1.5 rounded-lg ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'bg-emerald-600 text-white'}`}>
                            <FaChevronRight />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HistoryPage;