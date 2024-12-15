'use client'

import { ApexOptions } from 'apexcharts';
import React from 'react';
import dynamic from "next/dynamic"; 
import { MdTrendingUp, MdAttachMoney } from 'react-icons/md';

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const StatsPage = () => {

    const incomeDataSeries = [{
        name: 'Доходность',
        data: [500, 700, 1200, 800, 1500, 1000, 1800]
    }];
    
    const incomeDataOptions: ApexOptions = {
        chart: {
            type: 'area' as const,
            height: 350,
            background: "rgba(255,255,255,0)",
            toolbar: {
                show: false,
            },
            zoom: {
                enabled: false
            }
        },
        xaxis: {
            categories: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
            labels: {
                style: {
                    colors: 'rgba(255,255,255,0.1)', // Цвет подписей по оси X
                },
            },
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            }
        },
        yaxis: {
            labels: {
                style: {
                    colors: 'rgba(255,255,255,0.1)', // Цвет подписей по оси Y
                },
            },
        },
        grid: {
            show: false,
            yaxis: {
                lines: {
                    show: false,
                }
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'smooth',
            width: 2,
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                shadeIntensity: 1,
                opacityFrom: 0.6,
                opacityTo: 0.2,
                stops: [0, 100]
            }
        },
        colors: ['#34d399'],
        theme: {
            mode: 'dark'
        }
    };
    
    const purchaseDataSeries = [{
        name: 'Покупки',
        data: [200, 400, 1000, 600, 1200, 900, 1700]
    }];
    
    const purchaseDataOptions: ApexOptions = {
        chart: {
            type: 'bar', // Изменяем тип на "bar"
            height: 350,
            background: "rgba(255,255,255,0)", // Прозрачный фон
            toolbar: {
                show: false,
            },
        },
        xaxis: {
            categories: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
            labels: {
                style: {
                    colors: 'rgba(255,255,255,0.1)', // Цвет подписей по оси X
                },
            },
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            }
        },
        yaxis: {
            labels: {
                style: {
                    colors: 'rgba(255,255,255,0.1)', // Цвет подписей по оси Y
                },
            },
        },
        grid: {
            show: false,
        },
        dataLabels: {
            enabled: false,
        },
        plotOptions: {
            bar: {
                borderRadius: 4, // Закругленные края баров
                horizontal: false, // Вертикальные столбики
            }
        },
        fill: {
            colors: ['#34d399'], // Цвет баров
            opacity: 0.8,
        },
        colors: ['#34d399'], // Цвет баров
        theme: {
            mode: 'dark',
        }
    };
    
    const topClientsDataSeries = [{
        name: 'Покупки',
        data: [200, 400, 600, 650, 1200]
    }];
    
    const topClientsDataOptions: ApexOptions = {
        chart: {
            type: 'bar', // Изменяем тип на "bar"
            height: 350,
            background: "rgba(255,255,255,0)", // Прозрачный фон
            toolbar: {
                show: false,
            },
        },
        xaxis: {
            categories: ['Gamer**', 'Lolly234', 'Kaskader2**', 'Oracle4242', 'kkaksle2'],
            labels: {
                style: {
                    colors: 'rgba(255,255,255,0.1)', // Цвет подписей по оси X
                },
            },
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            }
        },
        yaxis: {
            show: false,
            labels: {
                style: {
                    colors: 'rgba(255,255,255,0.1)', // Цвет подписей по оси Y
                },
            },
        },
        grid: {
            show: false,
        },
        dataLabels: {
            enabled: false,
        },
        plotOptions: {
            bar: {
                borderRadius: 4, // Закругленные края баров
                horizontal: true, // Вертикальные столбики
            }
        },
        fill: {
            colors: ['#34d399'], // Цвет баров
            opacity: 0.8,
        },
        colors: ['#34d399'], // Цвет баров
        theme: {
            mode: 'dark',
        }
    };
    
    const newClientsDataSeries = [47, 53];
    
    const newClientsDataOptions: ApexOptions = {
        chart: {
            height: 300,
            width: 300,
            type: 'pie',
        },
        labels: ['Старые клиенты', 'Новые клиенты'],
        colors: ['#34d399', '#1f9369'],
        stroke: {
            width: 0
        },
        legend: {
            show: false
        }
    };
    
    const registrationDataSeries = [{
        name: 'Регистрации',
        data: [30, 50, 40, 60, 80, 70, 100] // Данные регистраций по дням
    }];
    
    const registrationDataOptions: ApexOptions = {
        chart: {
            type: 'line',
            background: "rgba(255,255,255,0)",
            height: 350,
            toolbar: {
                show: false,
            }
        },
        stroke: {
            curve: 'smooth',
            width: 4,
        },
        xaxis: {
            categories: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'], // Дни недели
            labels: {
                style: {
                    colors: 'rgba(255,255,255,0.1)', // Цвет подписей по оси X
                },
            },
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            }
        },
        yaxis: {
            show: false,
            labels: {
                style: {
                    colors: 'rgba(255,255,255,0.1)', // Цвет подписей по оси Y
                },
            },
        },
        grid: {
            show: false,
        },
        dataLabels: {
            enabled: false, // Отключаем отображение значений на графике
        },
        colors: ['#34d399'], // Цвет линии
        tooltip: {
            enabled: true,
        },
        theme: {
            mode: 'dark'
        }
    };
    

    return (
        <div className='flex flex-col lg:grid grid-cols-12 gap-x-5 gap-y-16 px-2 lg:px-10 pt-10 pb-32'>
            <div className='col-span-8 p-8 bg-gradient-to-tl from-zinc-900 rounded-xl border border-white/10 relative'>
                <p className='text-3xl text-transparent bg-clip-text bg-gradient-to-t from-emerald-400 to-emerald-600'>Доходность</p>
                <p className='text-white/80 text-sm mt-2'>за последние 7 дней</p>
                <span className='absolute top-8 right-8 text-white p-2 bg-zinc-950 rounded-xl'><MdAttachMoney className='text-2xl'/></span>
                <div className='mt-6'>
                    <Chart options={incomeDataOptions} series={incomeDataSeries} type="area" height={300}/>
                </div>
            </div>
            <div className='col-span-4 p-8 bg-gradient-to-tl from-zinc-900 rounded-xl border border-white/10 relative'>
                <p className='text-3xl text-transparent bg-clip-text bg-gradient-to-t from-emerald-400 to-emerald-600'>Покупки</p>
                <p className='text-white/80 text-sm mt-2'>за последние 7 дней</p>
                <span className='absolute top-8 right-8 text-white p-2 bg-zinc-950 rounded-xl'><MdTrendingUp className='text-2xl'/></span>
                <div className='mt-6'>
                    <Chart options={purchaseDataOptions} series={purchaseDataSeries} type="bar" height={300}/>
                </div>
            </div>
            <div className='col-span-4 p-8 bg-gradient-to-tl from-zinc-900 rounded-xl border border-white/10 relative'>
                <p className='text-3xl text-transparent bg-clip-text bg-gradient-to-t from-emerald-400 to-emerald-600'>Топ игроки</p>
                <p className='text-white/80 text-sm mt-2'>за последний месяц</p>
                <span className='absolute top-8 right-8 text-white p-2 bg-zinc-950 rounded-xl'><MdTrendingUp className='text-2xl'/></span>
                <div className='mt-6'>
                    <Chart options={topClientsDataOptions} series={topClientsDataSeries} type='bar' height={300}/>
                </div>
            </div>
            <div className='col-span-4 p-8 bg-gradient-to-tl from-zinc-900 rounded-xl border border-white/10 relative'>
                <p className='text-3xl text-transparent bg-clip-text bg-gradient-to-t from-emerald-400 to-emerald-600'>Новые пользователи</p>
                <p className='text-white/80 text-sm mt-2'>за последний месяц</p>
                <span className='absolute top-8 right-8 text-white p-2 bg-zinc-950 rounded-xl'><MdTrendingUp className='text-2xl'/></span>
                <div className='mt-6'>
                    <Chart options={newClientsDataOptions} series={newClientsDataSeries} type="pie" height={300} />
                </div>
            </div>
            <div className='col-span-4 p-8 bg-gradient-to-tl from-zinc-900 rounded-xl border border-white/10 relative'>
                <p className='text-3xl text-transparent bg-clip-text bg-gradient-to-t from-emerald-400 to-emerald-600'>Регистрации</p>
                <p className='text-white/80 text-sm mt-2'>за последние 7 дней</p>
                <span className='absolute top-8 right-8 text-white p-2 bg-zinc-950 rounded-xl'><MdTrendingUp className='text-2xl'/></span>
                <div className='mt-6'>
                    <Chart options={registrationDataOptions} series={registrationDataSeries} type="line" height={300}/>
                </div>
            </div>
        </div>
    );
};

export default StatsPage;