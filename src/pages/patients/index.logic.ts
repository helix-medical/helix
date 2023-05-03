import { useState } from 'react';
import { IPatient } from '../../types/interfaces';
import usePatientsRoute from '../../api/patients';
import setNotification from '../../components/errors/feedback-notification';

const useComponentLogic = (add: boolean) => {
    const route = usePatientsRoute();
    const [patients, setPatients] = useState<IPatient[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [viewType, setViewType] = useState('grid');
    const isGrid: boolean = viewType === 'grid';

    const [refresh, setRefresh] = useState<boolean>(false);
    const [show, setShow] = useState(add);
    const toggleModal = () => {
        setShow(!show);
        setRefresh(!refresh);
    };

    const fetchAllPatients = async () => {
        try {
            const res = await route.getAll();
            setPatients(res.data);
            setError(null);
        } catch (error: any) {
            if (!error?.response) setNotification(true, 'Network error');
            else if (error.response.status !== 404)
                setNotification(true, `${error.message}: ${error.response.data.message}`);
            setError(error.response.data.message);
        }
    };

    const handleDelete = async (id: string | undefined) => {
        if (!id) return console.error('No id');
        try {
            const res = await route.delete(id);
            setNotification(false, res.data.message);
        } catch (error: any) {
            if (!error?.response) setNotification(true, 'Network error');
            else setNotification(true, `${error.message}: ${error.response.data.message}`);
        }
    };

    const changeView = () => {
        setViewType((currentState) => (currentState === 'grid' ? 'list' : 'grid'));
    };

    return {
        patients,
        error,
        fetchAllPatients,
        handleDelete,
        nbPatients: patients.length,
        isGrid,
        show,
        toggleModal,
        refresh,
        changeView,
    };
};

export default useComponentLogic;
