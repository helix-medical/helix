import { useState } from 'react';
import useApplicationRoutes from '../../api/routes';
import setNotification from '../../components/errors/feedback-notification';

const useToolbarLogic = () => {
    const routes = useApplicationRoutes();
    const [calendars, setCalendars] = useState<{ value: string; label: string }[]>([]);

    const fetchCalendars = async () => {
        try {
            const res = await routes.users.getPractitioners();
            setCalendars([
                { value: 'all', label: 'All' },
                ...res.data.map((user: any) => ({ value: user.id, label: `${user.name} ${user.lastName}` })),
            ]);
        } catch (err: any) {
            setNotification(true, err.response.data.message);
        }
    };

    return {
        calendars,
        fetchCalendars,
    };
};

export { useToolbarLogic };
