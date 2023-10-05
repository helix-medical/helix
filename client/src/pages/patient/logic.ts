import { useEffect, useState } from 'react';
import { isEmail, isNotEmpty, useForm } from '@mantine/form';
import useApplicationRoutes from '../../api/routes';
import { IAppointment, IPatient, ITransaction } from './types';

const usePatient = (id: string) => {
    const routes = useApplicationRoutes();
    const [appointments, setAppointments] = useState<IAppointment[]>([]);
    const [transactions, setTransactions] = useState<ITransaction[]>([]);

    const form = useForm<IPatient>({
        initialValues: {
            id: id,
            name: '',
            lastName: '',
            birthDate: '',
            sex: '',
            email: '',
            city: '',
            medicalIssues: '',
            lastAppointments: [],
            address: '',
            phone: '',
            doctor: '',
            job: '',
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

    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const response = await routes.patients.getOne(id);
                form.setValues({
                    id: id,
                    name: response.data[0].name,
                    lastName: response.data[0].lastName,
                    birthDate: response.data[0].birthDate,
                    sex: response.data[0].sex,
                    email: response.data[0].email,
                    city: response.data[0].city,
                    medicalIssues: JSON.parse(response.data[0].passif).medicalIssues,
                    address: response.data[0].address,
                    phone: response.data[0].phone,
                    doctor: response.data[0].doctor,
                    job: response.data[0].job,
                    lastAppointments: JSON.parse(response.data[0].passif).lastAppointments,
                });
            } catch (error) {
                console.log(error);
            }
        };

        const fetchPatientAppointments = async () => {
            try {
                const response = await routes.appointments.getByPatient(id);
                setAppointments(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchPatientTransactions = async () => {
            try {
                const response = await routes.accounting.getByPatient(id);
                setTransactions(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPatient();
        fetchPatientAppointments();
        fetchPatientTransactions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return { form, appointments, transactions };
};

export { usePatient };
