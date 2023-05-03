import useEventsRoute from './events';
import usePatientsRoute from './patients';
import { useUsersRoute } from './users';

const useApplicationRoutes = () => {
    return {
        patients: usePatientsRoute(),
        events: useEventsRoute(),
        users: useUsersRoute(),
    };
};

export default useApplicationRoutes;
