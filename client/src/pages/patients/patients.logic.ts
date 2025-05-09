import { useEffect, useState } from 'react';
import setNotification from '../../components/errors/feedback-notification';
import useApplicationRoutes from '../../api/routes';
import { IPatientListView } from './types';

const usePatients = (add: boolean) => {
  const routes = useApplicationRoutes();
  const [patients, setPatients] = useState<IPatientListView[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [viewType, setViewType] = useState('grid');
  const isGrid: boolean = viewType === 'table';

  const [refresh, setRefresh] = useState<boolean>(false);
  const [show, setShow] = useState(add);
  const toggleModal = () => {
    setShow(!show);
    setRefresh(!refresh);
  };

  useEffect(() => {
    const fetchAllPatients = async () => {
      try {
        const res = await routes.patients.getAll();
        setPatients(res.data);
        setError(null);
      } catch (error: any) {
        if (!error?.response) setNotification(true, 'Network error');
        else if (error.response.status !== 404)
          setNotification(true, `${error.message}: ${error.response.data.message}`);
        setError(error.response.data.message);
      }
    };
    fetchAllPatients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  const changeView = () => {
    setViewType((currentState) => (currentState === 'grid' ? 'list' : 'grid'));
  };

  return {
    patients,
    error,
    nbPatients: patients.length,
    isGrid,
    show,
    toggleModal,
    changeView,
  };
};

export { usePatients };
