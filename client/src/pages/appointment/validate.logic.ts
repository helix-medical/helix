import { useNavigate } from 'react-router-dom';
import useApplicationRoutes from '../../api/routes';
import setNotification from '../../components/errors/feedback-notification';
import moment from 'moment';
import cnf from '../../config/config';
import { UseFormReturnType } from '@mantine/form';
import { IAppointmentContent } from './types';

const useAppointmentValidate = (id: string, form: UseFormReturnType<IAppointmentContent>) => {
    const routes = useApplicationRoutes();
    const navigate = useNavigate();

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if (form.validate().hasErrors) return;

        try {
            let res = await routes.accounting.create({
                amount: form.values.payment.amount,
                method: form.values.payment.method,
                appointment: id,
                date: moment().format(cnf.formatDateTime),
            });

            const appointmentFinal = {
                content: JSON.stringify({
                    ...form.values.anamnesis,
                    ...form.values.conclusion,
                }),
                payment: res.data.id,
            };

            res = await routes.appointments.pushContent(id, appointmentFinal);
            setNotification(false, res.data.message);
            navigate('/appointments');
        } catch (error: any) {
            if (!error?.response) setNotification(true, 'Network error');
            else setNotification(true, `${error.message}: ${error.response.data.message}`);
        }
    };

    return { handleSubmit };
};

export { useAppointmentValidate };
