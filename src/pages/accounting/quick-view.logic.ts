import { ISum } from "./types";
import { useState, useEffect } from "react";
import cnf from "../../config/config";
import moment from "moment";
import setNotification from "../../components/errors/feedback-notification";
import useApplicationRoutes from "../../api/routes";

const useQuickView = () => {
    const routes = useApplicationRoutes();
    const now = moment().format(cnf.formatDateTime);
    const lastMonth = moment().subtract(1, 'months').format(cnf.formatDateTime);
    const lastWeek = moment().subtract(7, 'days').format(cnf.formatDateTime);
    const initDate = moment('1998-12-17').format(cnf.formatDateTime);

    const [sumMonth, setSumMonth] = useState<ISum>();
    const [sumWeek, setSumWeek] = useState<ISum>();
    const [sumAll, setSumAll] = useState<ISum>();

    useEffect(() => {
        const getSumMonth = async () => {
            try {
                const res = await routes.accounting.getSumByDates(lastMonth, now);
                setSumMonth(res.data);
            } catch (error: any) {
                if (error.response.status !== 404)
                    setNotification(true, `${error.message}: ${error.response.data.message}`);
            }
        };
        const getSumWeek = async () => {
            try {
                const res = await routes.accounting.getSumByDates(lastWeek, now);
                setSumWeek(res.data);
            } catch (error: any) {
                if (error.response.status !== 404)
                    setNotification(true, `${error.message}: ${error.response.data.message}`);
            }
        };
        const getSumAll = async () => {
            try {
                const res = await routes.accounting.getSumByDates(initDate, now);
                setSumAll(res.data);
            } catch (error: any) {
                if (error.response.status !== 404)
                    setNotification(true, `${error.message}: ${error.response.data.message}`);
            }
        };
        getSumMonth();
        getSumWeek();
        getSumAll();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { sumMonth, sumWeek, sumAll };
};

export { useQuickView };
