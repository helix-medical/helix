import { useEffect, useState } from 'react';
import useApplicationRoutes from '../../api/routes';
import setNotification from '../../components/errors/feedback-notification';
import { useAppForm } from './form-context';
import { isEmail, isNotEmpty, useForm } from '@mantine/form';
import cnf from '../../config/config';

const useAppointmentGet = (id: string) => {
    const routes = useApplicationRoutes();
    const [view, setView] = useState(false);

    const data = useForm({
        initialValues: {
            address: '',
            appID: id,
            birthDate: '',
            city: '',
            date: '',
            doctor: '',
            email: '',
            job: '',
            kind: '',
            lastAppointments: [''],
            lastName: '',
            medicalIssues: '',
            name: '',
            patientID: '',
            phone: '',
            practitionerLastName: '',
            practitionerName: '',
            sex: '',
        },

        validate: {
            address: isNotEmpty('Address is required'),
            birthDate: isNotEmpty('Birth date is required'),
            city: isNotEmpty('City is required'),
            email: isEmail('Email is not valid'),
            job: isNotEmpty('Job is required'),
            lastName: isNotEmpty('Last name is required'),
            name: isNotEmpty('Name is required'),
            phone: isNotEmpty('Phone is required'),
        },
    });

    const content = useAppForm({
        initialValues: {
            anamnesis: {
                reasons: '',
                symptoms: '',
                knownDiseases: '',
            },
            conclusion: {
                diagnosis: '',
                treatment: '',
                observations: '',
            },
            payment: {
                amount: cnf.defaultAmount,
                method: cnf.defaultPaymentMethod,
            },
        },

        validate: {
            anamnesis: {
                reasons: isNotEmpty('Reasons are required (if none, type `-`)'),
                symptoms: isNotEmpty('Symptoms are required (if none, type `-`)'),
                knownDiseases: isNotEmpty('Antécédents sur la zone are required (if none, type `-`)'),
            },
            conclusion: {
                diagnosis: isNotEmpty('Diagnosis is required (if none, type `-`)'),
                treatment: isNotEmpty('Treatment is required (if none, type `-`)'),
                observations: isNotEmpty('Conseils are required (if none, type `-`)'),
            },
            payment: {
                amount: isNotEmpty('Amount is required'),
                method: isNotEmpty('Method is required'),
            },
        },
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await routes.appointments.getForView(id);
                content.setValues({
                    anamnesis: {
                        reasons: JSON.parse(res.data[0].content).reasons,
                        symptoms: JSON.parse(res.data[0].content).symptoms,
                        knownDiseases: JSON.parse(res.data[0].content).knownDiseases,
                    },
                    conclusion: {
                        diagnosis: JSON.parse(res.data[0].content).diagnosis,
                        treatment: JSON.parse(res.data[0].content).treatment,
                        observations: JSON.parse(res.data[0].content).observations,
                    },
                    payment: {
                        amount: JSON.parse(res.data[0].content).amount,
                        method: JSON.parse(res.data[0].content).method,
                    },
                });
                data.setValues({
                    appID: id,
                    date: res.data[0].date,
                    kind: res.data[0].kind,
                    patientID: res.data[0].patientId,
                    practitionerName: res.data[0].pName,
                    practitionerLastName: res.data[0].pLastName,
                    email: res.data[0].email,
                    birthDate: res.data[0].birthDate,
                    sex: res.data[0].sex,
                    city: res.data[0].city,
                    name: res.data[0].name,
                    lastName: res.data[0].lastName,
                    doctor: res.data[0].doctor,
                    job: res.data[0].job,
                    phone: res.data[0].phone,
                    address: res.data[0].address,
                    medicalIssues: JSON.parse(res.data[0].passif).medicalIssues,
                    lastAppointments: JSON.parse(res.data[0].passif).lastAppointments,
                });
                setView(res.data[0].status === 'finished');
            } catch (error: any) {
                if (!error?.response) setNotification(true, 'Network error');
                else setNotification(true, `${error.message}: ${error.response.data.message}`);
            }
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return { data, view, content };
};

export { useAppointmentGet };
