import React, {useEffect, useState} from 'react';
import Modal from '@/components/ui/modal';
import {useSelector} from "react-redux";

interface paymentHistory {
    paymentId: string;
    amount: number;
    login: string;
    status: string;
    createdAt: string;
}


const PaymentHistoryModal = ({open, onClose}: { open: boolean, onClose: () => void }) => {
    const [paymentHistory, setPaymentHistory] = useState<paymentHistory[]>([]);

    const history = useSelector((state: {
        payments: { paymentHistory: paymentHistory[] }
    }) => state.payments.paymentHistory)

    useEffect(() => {
        if(history && history.length > 0) {
            setPaymentHistory(history)
        }
    }, [history]);

    return (
        <Modal open={open} onClose={onClose} title="История">
            <div className="space-y-4">
                {paymentHistory.length > 0 ? (
                    paymentHistory.map((payment) => (
                        <div key={payment.paymentId} className="p-4 text-white border-white/15 border rounded-lg shadow-sm">
                            <p><strong>Сумма:</strong> {payment.amount}</p>
                            <p><strong>Логин:</strong> {payment.login}</p>
                            <p><strong>Статус:</strong> {payment.status}</p>
                            <p><strong>Индентификатор:</strong> {payment.paymentId}</p>
                            <p><strong>Дата:</strong> {new Date(payment.createdAt).toLocaleString()}</p>
                        </div>
                    ))
                ) : (
                    <p className={'text-white'}>Вы еще не совершали пополнений.</p>
                )}
            </div>
        </Modal>
    );
};

export default PaymentHistoryModal;