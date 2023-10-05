import moment from 'moment';
import { useState, useEffect } from 'react';
import useApplicationRoutes from '../../api/routes';
import setNotification from '../../components/errors/feedback-notification';
import cnf from '../../config/config';
import { ITransactions } from './types';

const useTransactions = () => {
    const routes = useApplicationRoutes();
    const [transactions, setTransactions] = useState<ITransactions[]>([]);
    const [view, setView] = useState('all');
    const [showFacture, setShowFacture] = useState(false);
    const [id, setId] = useState<string>('');

    useEffect(() => {
        const fetchAllTransactions = async (period: string) => {
            const now = new Date();
            let startDate: string = '1998-12-17';
            const endDate = moment(now).format(cnf.formatDateTime);
            switch (period) {
                case 'week':
                    startDate = moment(now).subtract(7, 'days').format(cnf.formatDateTime);
                    break;
                case 'month':
                    startDate = moment(now).subtract(1, 'months').format(cnf.formatDateTime);
                    break;
            }
            try {
                const res = await routes.accounting.getByDates(startDate, endDate);
                setTransactions(res.data);
            } catch (error: any) {
                if (!error?.response) setNotification(true, 'Network error');
                else if (error.response.status !== 404)
                    setNotification(true, `${error.message}: ${error.response.data.message}`);
            }
        };
        fetchAllTransactions(view);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [view]);

    const handleClick = (id: string) => {
        setId(id);
        setShowFacture(true);
    };

    const toggleModal = () => {
        setShowFacture(!showFacture);
    };

    return { transactions, view, setView, showFacture, id, handleClick, toggleModal };
};

export { useTransactions };
