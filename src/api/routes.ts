import useEventsRoute from './events';
import usePatientsRoute from './patients';

const useApplicationRoutes = () => {
    return {
        patients: usePatientsRoute(),
        events: useEventsRoute(),
    };
};

export default useApplicationRoutes;
