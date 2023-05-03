import useEventsRoute from './events';
import usePatientsRoute from './patients';
import { useUsersRoute } from './users';
import { useAppointmentsRoute } from './appointments';

const useApplicationRoutes = () => {
    return {
        patients: usePatientsRoute(),
        events: useEventsRoute(),
        users: useUsersRoute(),
        appointments: useAppointmentsRoute(),
    };
};

export default useApplicationRoutes;
