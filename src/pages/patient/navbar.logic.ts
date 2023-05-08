import { useNavigate } from 'react-router-dom';
import setNotification from '../../components/errors/feedback-notification';
import useApplicationRoutes from '../../api/routes';
import { useState } from 'react';
import { UseFormReturnType } from '@mantine/form';
import { IPatient } from './types';

const usePatientNavBar = (form: UseFormReturnType<IPatient>) => {
    const navigate = useNavigate();
    const routes = useApplicationRoutes();
    const [update, setUpdate] = useState(false);

    const handleDelete = async (id: string) => {
        console.log(id);
        if (!id) return console.error('No id');
        try {
            const res = await routes.patients.delete(id);
            setNotification(false, res.data.message);
            navigate('/patients');
        } catch (error: any) {
            if (!error?.response) setNotification(true, 'Network error');
            else setNotification(true, `${error.message}: ${error.response.data.message}`);
        }
    };

    const handleUpdate = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if (update) {
            if (form.validate().hasErrors) return;

            const finalPatient = {
                name: form.values.name,
                lastName: form.values.lastName,
                birthDate: form.values.birthDate,
                sex: form.values.sex,
                email: form.values.email,
                city: form.values.city,
                address: form.values.address,
                phone: form.values.phone,
                doctor: form.values.doctor,
                job: form.values.job,
                passif: JSON.stringify({
                    medicalIssues: form.values.medicalIssues,
                    lastAppointments: form.values.lastAppointments,
                }),
            };

            console.log(finalPatient);
            try {
                const res = await routes.patients.update(form.values.id, finalPatient);
                setNotification(false, res.data.message);
            } catch (err: any) {
                if (!err?.response) setNotification(true, 'Network error');
                else setNotification(true, `${err.message}: ${err.response.data.message}`);
            }
        }
        setUpdate(!update);
    };

    return { handleDelete, handleUpdate, update };
};

export { usePatientNavBar };
