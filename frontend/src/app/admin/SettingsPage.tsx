import React, { useState, useEffect } from 'react';
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import axiosInstance from '@/config/axiosInstance';

const SettingsPage = () => {
    const [open, setOpen] = useState(false);
    const [settings, setSettings] = useState({
        siteName: '',
        comissionRate: '',
        playWalletApiKey: '',
        tinkoffApiKey: ''
    });
    const [promoCode, setPromoCode] = useState({
        code: '',
        maxRedemptions: '',
        bonus: ''
    });
    const [errors, setErrors] = useState({});
    const [promoCodeErrors, setPromoCodeErrors] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await axiosInstance.get('/admin/settings');
                setSettings(response.data);
            } catch (error) {
                console.error('Error fetching settings:', error);
            }
        };

        fetchSettings();
    }, []);

    const validateSettings = () => {
        const newErrors = {};
        if (!settings.siteName) newErrors.siteName = 'Site name is required';
        if (!settings.comissionRate) newErrors.comissionRate = 'comissionRate is required';
        if (!settings.playWalletApiKey) newErrors.playWalletApiKey = 'PlayWallet API is required';
        if (!settings.tinkoffApiKey) newErrors.tinkoffApiKey = 'T-BANK API is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validatePromoCode = () => {
        const newErrors = {};
        if (!promoCode.code) newErrors.code = 'Promo code code is required';
        if (!promoCode.maxRedemptions) newErrors.maxRedemptions = 'Max redemptions is required';
        if (!promoCode.bonus) newErrors.bonus = 'Bonus is required';
        setPromoCodeErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSaveSettings = async () => {
        if (!validateSettings()) return;

        setLoading(true);
        try {
            await axiosInstance.put('/admin/settings', settings);
            alert('Settings updated successfully');
        } catch (error) {
            console.error('Error updating settings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreatePromoCode = async () => {
        if (!validatePromoCode()) return;

        setLoading(true);
        try {
            await axiosInstance.post('/admin/promocode', promoCode);
            alert('Promo code created successfully');
            setOpen(false);
        } catch (error) {
            console.error('Error creating promo code:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='min-h-screen px-2 xl:px-10 pt-10 pb-32'>
            <Modal open={open} title={'Создать промокод'} onClose={() => { setOpen(false) }}>
                <div className='space-y-6'>
                    <div className='flex flex-col gap-1.5'>
                        <label className='text-white font-bold'>Название промокода</label>
                        <Input value={promoCode.code} onChange={(e) => setPromoCode({ ...promoCode, code: e })} />
                        {promoCodeErrors.code && <p className='text-red-500'>{promoCodeErrors.code}</p>}
                    </div>
                    <div className='flex flex-col gap-1.5'>
                        <label className='text-white font-bold'>Максимум пополнений</label>
                        <Input value={promoCode.maxRedemptions} onChange={(e) => setPromoCode({ ...promoCode, maxRedemptions: e })} />
                        {promoCodeErrors.maxRedemptions && <p className='text-red-500'>{promoCodeErrors.maxRedemptions}</p>}
                    </div>
                    <div className='flex flex-col gap-1.5'>
                        <label className='text-white font-bold'>Бонус</label>
                        <Input value={promoCode.bonus} onChange={(e) => setPromoCode({ ...promoCode, bonus: e })} />
                        {promoCodeErrors.bonus && <p className='text-red-500'>{promoCodeErrors.bonus}</p>}
                    </div>
                    <div className='flex flex-col'>
                        <Button onClick={handleCreatePromoCode} disabled={loading}>Создать</Button>
                    </div>
                </div>
            </Modal>
            <div className='flex flex-col xl:grid grid-cols-12 gap-12'>
                <div className='p-8 col-span-12 xl:col-span-8 min-h-[80vh] bg-gradient-to-tl from-zinc-900 rounded-xl border border-white/10 relative'>
                    <span className='text-3xl text-transparent bg-clip-text bg-gradient-to-t from-emerald-400 to-emerald-600'>Настройки сайта</span>
                    <div className='flex flex-col gap-1.5 pt-10'>
                        <label className='text-white font-bold'>Название сайта</label>
                        <Input value={settings.siteName} onChange={(e) => setSettings({ ...settings, siteName: e })} />
                        {errors.siteName && <p className='text-red-500'>{errors.siteName}</p>}
                    </div>
                    <div className='flex flex-col gap-1.5 pt-10'>
                        <label className='text-white font-bold'>Комиссия</label>
                        <Input value={settings.comissionRate} onChange={(e) => setSettings({ ...settings, comissionRate: e })} />
                        {errors.comissionRate && <p className='text-red-500'>{errors.comissionRate}</p>}
                    </div>
                    <div className='flex flex-col gap-1.5 pt-10'>
                        <label className='text-white font-bold'>API PlayWallet</label>
                        <Input value={settings.playWalletApiKey} onChange={(e) => setSettings({ ...settings, playWalletApiKey: e })} />
                        {errors.playWalletApiKey && <p className='text-red-500'>{errors.playWalletApiKey}</p>}
                    </div>
                    <div className='flex flex-col gap-1.5 pt-10'>
                        <label className='text-white font-bold'>API T-BANK</label>
                        <Input value={settings.tinkoffApiKey} onChange={(e) => setSettings({ ...settings, tinkoffApiKey: e })} />
                        {errors.tinkoffApiKey && <p className='text-red-500'>{errors.tinkoffApiKey}</p>}
                    </div>
                    <div className='flex flex-col pt-24'>
                        <Button onClick={handleSaveSettings} disabled={loading}>Сохранить</Button>
                    </div>
                </div>
                <div className='p-8 col-span-12 xl:col-span-4 min-h-[80vh] bg-gradient-to-tl from-zinc-900 rounded-xl border border-white/10 relative'>
                    <span className='text-3xl text-transparent bg-clip-text bg-gradient-to-t from-emerald-400 to-emerald-600'>Промокоды</span>
                    <div className='pt-5 flex flex-col'>
                        <Button onClick={() => setOpen(true)}>Создать промокод</Button>
                    </div>
                    <div className='mt-5 bg-zinc-900 rounded-xl h-[calc(100%-119px)] overflow-x-auto'>
                        <table className='w-full'>
                            <thead className='bg-zinc-800'>
                                <tr className='h-14'>
                                    <th className='px-6 py-3 text-left text-sm rounded-tl-xl font-medium text-gray-300'>Код</th>
                                    <th className='px-6 py-3 text-left text-sm font-medium text-gray-300'>Кол. пополнений</th>
                                    <th className='px-6 py-3 text-left text-sm rounded-tr-xl font-medium text-gray-300'>Бонус</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Render promo codes here */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;