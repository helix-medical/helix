import { UseFormReturnType } from '@mantine/form';
import { IAppointmentData } from './types';
import useApplicationRoutes from '../../api/routes';
import setNotification from '../../components/errors/feedback-notification';

const useAppointmentPatient = (form: UseFormReturnType<IAppointmentData>) => {
    const routes = useApplicationRoutes();

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if (form.validate().hasErrors) return;

        const patient = {
            name: form.values.name,
            lastName: form.values.lastName,
            birthDate: form.values.birthDate,
            sex: form.values.sex,
            email: form.values.email,
            city: form.values.city,
            doctor: form.values.doctor,
            job: form.values.job,
            address: form.values.address,
            phone: form.values.phone,
            passif: JSON.stringify({
                medicalIssues: form.values.medicalIssues,
                lastAppointments: form.values.lastAppointments,
            }),
        };

        try {
            const res = await routes.patients.update(form.values.patientID, patient);
            setNotification(false, res.data.message);
        } catch (error: any) {
            if (!error?.response) setNotification(true, 'Network error');
            else setNotification(true, `${error.message}: ${error.response.data.message}`);
        }
    };

    return { handleSubmit };
};

export { useAppointmentPatient };
