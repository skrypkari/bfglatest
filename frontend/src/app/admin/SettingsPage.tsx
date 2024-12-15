import React, {useState} from 'react';
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import Modal from "@/components/ui/modal";

const SettingsPage = () => {

    const [open, setOpen] = useState(false)

    return (
        <div className='min-h-screen px-2 xl:px-10 pt-10 pb-32'>
            <Modal open={open} title={'Создать промокод'} onClose={() => {setOpen(false)}}>
                <div className='space-y-6'>
                    <div className='flex flex-col gap-1.5'>
                        <label className='text-white font-bold'>Название промокода</label>
                        <Input value={''}/>
                    </div>
                    <div className='flex flex-col gap-1.5'>
                        <label className='text-white font-bold'>Максимум пополнений</label>
                        <Input value={''}/>
                    </div>
                    <div className='flex flex-col gap-1.5'>
                        <label className='text-white font-bold'>Бонус</label>
                        <Input value={''}/>
                    </div>
                    <div className='flex flex-col'>
                        <Button>Создать</Button>
                    </div>
                </div>
            </Modal>
            <div className='flex flex-col xl:grid grid-cols-12 gap-12'>
                <div className='p-8 col-span-12 xl:col-span-8 min-h-[80vh] bg-gradient-to-tl from-zinc-900 rounded-xl border border-white/10 relative'>
                <span className='text-3xl text-transparent bg-clip-text bg-gradient-to-t from-emerald-400 to-emerald-600'>Настройки сайта</span>
                    <div className='flex flex-col gap-1.5 pt-10'>
                        <label className='text-white font-bold'>Название сайта</label>
                        <Input value={'BestForGamers'}/>
                    </div>
                    <div className='flex flex-col gap-1.5 pt-10'>
                        <label className='text-white font-bold'>Комиссия</label>
                        <Input value={'16 %'}/>
                    </div>
                    <div className='flex flex-col gap-1.5 pt-10'>
                        <label className='text-white font-bold'>API QIWI</label>
                        <Input value={'6b7c85de-de5c-439d-8fc5-5102a32000c5'}/>
                    </div>
                    <div className='flex flex-col gap-1.5 pt-10'>
                        <label className='text-white font-bold'>API T-BANK</label>
                        <Input value={'d5561634-0a4d-4872-810d-76a60d0e3019'}/>
                    </div>
                    <div className='flex flex-col pt-24'>
                        <Button>Сохранить</Button>
                    </div>
                </div>
                <div className='p-8 col-span-12 xl:col-span-4 min-h-[80vh] bg-gradient-to-tl from-zinc-900 rounded-xl border border-white/10 relative'>
                    <span className='text-3xl text-transparent bg-clip-text bg-gradient-to-t from-emerald-400 to-emerald-600'>Промокоды</span>
                    <div className='pt-5 flex flex-col'>
                        <Button onClick={() => setOpen(true)}>Создать промокод</Button>
                    </div>
                    <div className='mt-5 bg-zinc-900 rounded-xl h-[calc(100%-119px)]  overflow-x-auto'>
                        <table className='w-full'>
                            <thead className='bg-zinc-800'>
                            <tr className='h-14'>
                                <th className='px-6 py-3 text-left text-sm rounded-tl-xl font-medium text-gray-300'>Код</th>
                                <th className='px-6 py-3 text-left text-sm font-medium text-gray-300'>Кол. пополнений</th>
                                <th className='px-6 py-3 text-left text-sm rounded-tr-xl font-medium text-gray-300'>Бонус</th>
                            </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;