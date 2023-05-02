import { isEmail, isNotEmpty, useForm } from '@mantine/form';
import setNotification from '../../components/errors/feedback-notif';
import usePatientsRoute from '../../api/patients';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import cnf from '../../config/config';

const useComponentLogic = (handleClose: () => void) => {
    const navigate = useNavigate();
    const route = usePatientsRoute();

    const form = useForm({
        initialValues: {
            name: '',
            lastName: '',
            birthDate: '',
            sex: '',
            email: '',
            city: '',
            address: '',
            phone: '',
            doctor: '',
            job: '',
            passif: JSON.stringify({
                medicalIssues: '',
                lastAppointments: ['0'],
            }),
        },

        validate: {
            name: (value) => (value.length < 2 ? 'Name must be at least 2 chars' : null),
            lastName: (value) => (value.length < 2 ? 'Last name must be at least 2 chars' : null),
            sex: (value) => (value !== 'F' && value !== 'M' ? 'Sex must be at `M` or `F`' : null),
            birthDate: isNotEmpty('Birth date is required'),
            email: isEmail('Invalid email'),
            city: (value) => (value.length < 2 ? 'City must be at least 2 chars' : null),
            address: isNotEmpty('Address is required'),
            phone: (value) => (value.length < 10 ? 'Phone must be at least 10 chars' : null),
            job: isNotEmpty('Job is required'),
        },
    });

    const handleClick = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if (form.validate().hasErrors) return;
        const patient = {
            ...form.values,
            birthDate: moment(form.values.birthDate).format(cnf.formatDate),
        };
        console.log(patient);
        try {
            const res = await route.create(patient);
            setNotification(false, res.data.message);
            form.reset();
            handleClose();
            navigate('/patients');
        } catch (error: any) {
            console.log(error);
            if (!error?.response) setNotification(true, 'Network error');
            else setNotification(true, `${error.message}: ${error.response.data.message}`);
        }
    };

    return {
        form,
        handleClick,
    };
};

export default useComponentLogic;
