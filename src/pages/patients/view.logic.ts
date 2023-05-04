import { useForm, isEmail, isNotEmpty } from '@mantine/form';
import useSecureAPI from '../../hooks/use-secure-api';
import setNotification from '../../components/errors/feedback-notification';
import { useState } from 'react';

const useComponentLogic = (patientInput: any, toggleModal: () => void) => {
    const api = useSecureAPI();
    const handleClose = () => toggleModal();
    const passif = JSON.parse(patientInput.passif);
    const [update, setUpdate] = useState(false);

    const form = useForm({
        initialValues: {
            name: patientInput.name,
            lastName: patientInput.lastName,
            birthDate: patientInput.birthDate,
            sex: patientInput.sex,
            email: patientInput.email,
            city: patientInput.city,
            medicalIssues: passif.medicalIssues,
            address: patientInput.address,
            phone: patientInput.phone,
            doctor: patientInput.doctor,
            job: patientInput.job,
        },

        validate: {
            name: (value) => (value.length < 2 ? 'Name must be at least 2 chars' : null),
            lastName: (value) => (value.length < 2 ? 'Last name must be at least 2 chars' : null),
            birthDate: (value) => (value.length !== 10 ? 'Birth date must be at `DD/MM/YYYY` format' : null),
            sex: (value) => (value !== 'F' && value !== 'M' ? 'Sex must be at `M` or `F`' : null),
            email: isEmail('Email must be valid'),
            city: (value) => (value.length < 2 ? 'City must be at least 2 chars' : null),
            address: isNotEmpty('Address is required'),
            phone: (value) => (value.length < 10 ? 'Phone must be at least 10 chars' : null),
            job: isNotEmpty('Job is required'),
        },
    });

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
                    lastAppointments: passif.lastAppointments,
                }),
            };
            try {
                const res = await api.put(`/patients/${patientInput.id}`, finalPatient);
                setNotification(false, res.data.message);
            } catch (err: any) {
                if (!err?.response) setNotification(true, 'Network error');
                else setNotification(true, `${err.message}: ${err.response.data.message}`);
            }
        }
        setUpdate(!update);
    };

    return {
        form,
        handleUpdate,
        update,
        handleClose,
        passif,
    };
};

export { useComponentLogic };
