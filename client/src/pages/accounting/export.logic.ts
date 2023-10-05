import { ITransactions } from './types';
import { useState, useRef, useEffect } from 'react';
import cnf from '../../config/config';
import moment from 'moment';
import setNotification from '../../components/errors/feedback-notification';
import useApplicationRoutes from '../../api/routes';

const useTransactionsExport = (period: string) => {
    const routes = useApplicationRoutes();
    const [view, setView] = useState(period === 'all' ? 'year' : period);
    const [transactions, setTransactions] = useState<ITransactions[]>([]);
    const [startDate, setStartDate] = useState('1998-12-17 00:00');
    const csvLink = useRef(null);
    const endDate = moment().format(cnf.formatDateTime);

    useEffect(() => {
        switch (view) {
            case 'week':
                setStartDate(moment().subtract(7, 'days').format(cnf.formatDateTime));
                break;
            case 'month':
                setStartDate(moment().subtract(1, 'months').format(cnf.formatDateTime));
                break;
            case 'semester':
                setStartDate(moment().subtract(6, 'months').format(cnf.formatDateTime));
                break;
            case 'year':
                setStartDate(moment().subtract(1, 'years').format(cnf.formatDateTime));
                break;
        }
    }, [view]);

    useEffect(() => {
        const fetchAllTransactions = async () => {
            try {
                const res = await routes.accounting.getByDates(startDate, endDate);
                setTransactions(
                    res.data.map((transaction: ITransactions) => [
                        transaction.uid,
                        transaction.date,
                        transaction.amount,
                        transaction.method,
                        `${transaction.patientName} ${transaction.patientLastName}`,
                    ])
                );
            } catch (error: any) {
                if (!error?.response) setNotification(true, 'Network error');
                else setNotification(true, `${error.message}: ${error.response.data.message}`);
            }
        };
        fetchAllTransactions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startDate, endDate]);

    const handleExport = () => {
        if (csvLink.current) {
            const node: any = csvLink.current;
            node.link.click();
        }
    };

    return { transactions, view, setView, handleExport, csvLink, startDate, endDate };
};

export { useTransactionsExport };
