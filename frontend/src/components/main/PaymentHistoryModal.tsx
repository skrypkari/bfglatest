import React, { useEffect, useState } from 'react';
import Modal from '@/components/ui/modal';
import axiosInstance from '@/config/axiosInstance';

const PaymentHistoryModal = ({ open, onClose }: { open: boolean, onClose: () => void }) => {
  const [paymentHistory, setPaymentHistory] = useState([]);

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        const response = await axiosInstance.get('/payments/history');
        setPaymentHistory(response.data);
      } catch (error) {
        console.error('Error fetching payment history:', error);
      }
    };

    if (open) {
      fetchPaymentHistory();
    }
  }, [open]);

  return (
    <Modal open={open} onClose={onClose} title="Payment History" className="max-w-md">
      <div className="space-y-4">
        {paymentHistory.length > 0 ? (
          paymentHistory.map((payment) => (
            <div key={payment.paymentId} className="p-4 border rounded-lg shadow-sm">
              <p><strong>Amount:</strong> {payment.amount}</p>
              <p><strong>Login:</strong> {payment.login}</p>
              <p><strong>Status:</strong> {payment.status}</p>
              <p><strong>Payment ID:</strong> {payment.paymentId}</p>
              <p><strong>Created At:</strong> {new Date(payment.createdAt).toLocaleString()}</p>
            </div>
          ))
        ) : (
          <p>No payment history available.</p>
        )}
      </div>
    </Modal>
  );
};

export default PaymentHistoryModal;