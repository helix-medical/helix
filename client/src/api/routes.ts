import { useAccountingRoute } from './accounting';
import { useAppointmentsRoute } from './appointments';
import { useEventsRoute } from './events';
import { usePatientsRoute } from './patients';
import { useUnsecuredRoute } from './unsecured';
import { useUsersRoute } from './users';

const useApplicationRoutes = () => {
    return {
        accounting: useAccountingRoute(),
        appointments: useAppointmentsRoute(),
        events: useEventsRoute(),
        patients: usePatientsRoute(),
        unsecured: useUnsecuredRoute(),
        users: useUsersRoute(),
    };
};

export default useApplicationRoutes;
