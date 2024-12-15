import React from 'react';
import Accordion from "@/components/ui/accordion";
import assasin from '../../assets/assasin.png'
import bf from '../../assets/bf.png'
import Image from "next/image";

const Faq = () => {
    return (
        <footer className='pt-16 lg:pt-64 bg-gradient-to-b from-zinc-950 to-zinc-900 w-full '>
            <div className={'max-w-[1380px] w-full flex justify-between mx-auto px-5 gap-20 xl:gap-0 xl:px-0 flex-col-reverse items-center xl:flex-row'}>
                <div className='xl:max-w-[550px] w-full'>
                    <h4 className='text-white font-bold text-[48px]' id={'faq'}>FAQ</h4>
                    <div className='flex flex-col gap-8 xl:max-w-[550px] w-full mt-8 shrink-0'>
                        <Accordion title="Какие страны можно пополнить?">
                            Можно пополнить аккаунт для следующих стран: Россия, Казахстан, Беларусь, Армения, Грузия, Киргизия, Узбекистан, Азербайджан и Таджикистан. Обратите внимание, что для Казахстана деньги будут зачислены в Тенге по плавающему курсу, а для остальных стран СНГ — в долларах. Исключены регионы: Крым, ЛНР и ДНР.
                        </Accordion>
                        <Accordion title="Лимиты и ограничения">
                            Ограничения на минимальные суммы для всех способов зачисления – 100 рублей, 500 тенге, 116.50 долларов. Лимит на максимальное пополнение баланса Steam на один логин за 24 часа – равен 30 000 рублей <br/><br/>ВНИМАНИЕ:
                            ограничение распространяется на все способы пополнения. Если вы где-то уже пополнили ваш Steam на сумму 500$, наше пополнение может не пройти в связи с лимитом, будьте внимательны!
                        </Accordion>
                        <Accordion title="Что такое Логин?">
                            Логин — это то что вы вводите при авторизации, у каждого пользователя он уникальный, а никнейм вы можете менять по своему усмотрению. Людей с ником QWERTY может быть сотни. Не перепутайте ваш логин и никнейм.
                        </Accordion>
                        <Accordion title="Пришла сумма меньше">
                            Для пополнения нам приходится конвертировать средства в разные валюты. <br/>Иногда сумма может отличаться на 1-5% от указанной.
                        </Accordion>
                        <Accordion title="Возврат средств">
                            Если вы проигнорировали требования к аккаунту и все же попытались отправить себе средства, то они не дойдут.
                            В этом случае Вы вправе запросить возврат в ТП. <br/><br/>На Qiwi-кошелек средства будут возвращены с вычетом 50р и 7% от суммы.
                            На Карту банка средства будут возвращены с вычетом 50р и 8% от суммы.
                        </Accordion>
                    </div>
                </div>
                <div className={'xl:max-w-[550px] w-full flex flex-col items-center '}>
                    <p className='font-bold text-xl sm:text-2xl lg:text-4xl xl:text-2xl text-white text-center w-full'>Легко и без лишних сложностей.<br/>Удобное пополнение баланса <span className='bg-gradient-to-t bg-clip-text text-transparent from-emerald-500 to-emerald-900 font-bold'>Steam</span></p>
                    <div className='w-full h-[300px] sm:h-[420px] border mt-8 rounded-xl border-white/15 bg-gradient-to-t from-emerald-600/5 to-transparent relative'>
                        <Image src={assasin} alt={''} className={'absolute bottom-0 left-1/2 -translate-x-[calc(50%+20px)] sm:left-[75px] sm:translate-x-0 z-50  w-52 sm:w-min'}/>
                        <Image src={bf} alt={''} className={'absolute bottom-0 right-[50px] z-10 w-36 sm:w-min'}/>
                    </div>
                </div>
            </div>
            <div className={'max-w-[1380px] w-full flex justify-between mx-auto mt-32 pb-16 px-5 xl:px-0 gap-5 xl:gap-0 flex-col md:flex-row'}>
                <span className='text-white/80 font-bold text-center'>© 2024 BestForGamers<br/>Все права защищены.</span>
                <ul className='flex flex-col md:flex-row items-center gap-5 text-white'>
                    <li className={'font-bold text-sm cursor-pointer hover:text-emerald-500 transition-all'}>ПОЛИТИКА</li>
                    <li className={'font-bold text-sm cursor-pointer hover:text-emerald-500 transition-all'}>СОГЛАШЕНИЕ</li>
                    <li className={'font-bold text-sm cursor-pointer hover:text-emerald-500 transition-all uppercase'}>Правила возврата</li>
                    <li className={'font-bold text-sm cursor-pointer hover:text-emerald-500 transition-all'}>ТЕХ. ПОДДЕРЖКА</li>
                </ul>
            </div>
        </footer>
    );
};

export default Faq;