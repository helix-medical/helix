import { useForm, isNotEmpty } from '@mantine/form';
import useApplicationRoutes from '../../api/routes';
import setNotification from '../../components/errors/feedback-notification';

const useUserCreate = (handleClose: () => void) => {
    const routes = useApplicationRoutes();

    const form = useForm({
        initialValues: {
            name: '',
            lastName: '',
            role: '',
            password: '',
        },

        validate: {
            name: (value) => (value.length < 2 ? 'Name must be at least 2 chars' : null),
            lastName: (value) => (value.length < 2 ? 'Last name must be at least 2 chars' : null),
            role: isNotEmpty('Role is required'),
            password: isNotEmpty('Password is required'),
        },
    });

    const handleClick = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if (form.validate().hasErrors) return;
        try {
            const res = await routes.users.create(form.values);
            setNotification(false, res.data.message);
            form.reset();
            handleClose();
        } catch (error: any) {
            if (!error?.response) setNotification(true, 'Network error');
            else setNotification(true, `${error.message}: ${error.response.data.message}`);
        }
    };

    return { form, handleClick };
};

export { useUserCreate };
