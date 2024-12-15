'use client'
import { MdInsertChart } from "react-icons/md";
import { MdHistory } from 'react-icons/md';
import { MdSettings } from 'react-icons/md';
import { IoIosFlash } from "react-icons/io";

import {useState} from "react";
import StatsPage from "@/app/admin/StatsPage";
import HistoryPage from "@/app/admin/HistoryPage";
import SettingsPage from "@/app/admin/SettingsPage";

const items = [
    {
        name: 'Статистика',
        icon: <MdInsertChart className={'text-2xl'}/>
    },
    {
        name: 'История',
        icon: <MdHistory className={'text-2xl'}/>
    },
    {
        name: 'Настройки',
        icon: <MdSettings className={'text-2xl'}/>
    }
]

const Page = () => {

    const [selectedItem, setSelectedItem] = useState(0);



    return (
        <div className={'min-h-screen relative'}>
            <div className='fixed hover:scale-105 transition-all z-50 p-2 bg-gradient-to-t from-emerald-600 to-emerald-900 bottom-10 right-1/2 translate-x-1/2 border border-white/15 rounded-xl flex items-center gap-5 text-white'>
                <span className='text-2xl'><IoIosFlash/></span>
                {items.map((item,i) => {
                    return(
                        <div key={i} className='group relative cursor-pointer hover:text-white/80 p-2 hover:bg-white/10 rounded-xl' onClick={() => setSelectedItem(i)}>
                            <span className='absolute -top-16 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-white font-bold bg-emerald-600 p-2 rounded-xl'>{item.name}</span>
                            <span>{item.icon}</span>
                        </div>
                    )
                })}
            </div>
            {selectedItem === 0 && <StatsPage/>}
            {selectedItem === 1 && <HistoryPage/>}
            {selectedItem === 2 && <SettingsPage/>}
        </div>
    );
};

export default Page;