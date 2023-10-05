import { IUsers } from '../../types/interfaces';
import { useState, useEffect } from 'react';
import setNotification from '../../components/errors/feedback-notification';
import useApplicationRoutes from '../../api/routes';

const useUsers = () => {
    const routes = useApplicationRoutes();
    const [show, setShow] = useState(false);
    const toggleModal = () => {
        setShow(!show);
        setRefresh(!refresh);
    };
    const [users, setUsers] = useState<IUsers[]>([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const res = await routes.users.getAll();
                setUsers(res.data);
            } catch (error: any) {
                if (!error?.response) setNotification(true, 'Network error');
                else if (error.response.status !== 404)
                    setNotification(true, `${error.message}: ${error.response.data.message}`);
            }
        };
        fetchAllUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refresh]);

    const disableUser = async (uid: string) => {
        try {
            const res = await routes.users.disable(uid);
            setNotification(false, res.data.message);
            setRefresh(!refresh);
        } catch (error: any) {
            if (!error?.response) setNotification(true, 'Network error');
            else setNotification(true, `${error.message}: ${error.response.data.message}`);
        }
    };

    const enableUser = async (uid: string) => {
        try {
            const res = await routes.users.enable(uid);
            setNotification(false, res.data.message);
            setRefresh(!refresh);
        } catch (error: any) {
            if (!error?.response) setNotification(true, 'Network error');
            else setNotification(true, `${error.message}: ${error.response.data.message}`);
        }
    };

    return { users, show, toggleModal, disableUser, enableUser };
};

export { useUsers };
