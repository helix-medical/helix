import { Routes, Route } from 'react-router-dom';

import Patients from '../../pages/patients/patients';
import Home from './home';
import Calendar from '../../components/calendar';
import EditAppointment from '../../pages/appointment/edit';
import Appointments from '../../pages/appointments/appointments';
import ViewAppointment from '../../pages/appointment/view';
import NotFound from '../../pages/system/404';
import Account from './account';
import Admin from '../admin/admin';
import Login from './login';
import Layout from './layout';
import RequireAuth from '../../components/auth/requireAuth';
import Unauthorized from './errors/unauthorized';

const ROLES = {
    ADMIN: 2003,
    PRACTITIONER: 1998,
    SECRETARY: 1515,
};

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {/* Public */}
                <Route path="login" element={<Login />} />
                <Route path="unauthorized" element={<Unauthorized />} />
                {/* Add pages for errors */}

                {/* Protected */}
                <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN, ROLES.PRACTITIONER, ROLES.SECRETARY]} />}>
                    <Route path="/" element={<Home />} />
                    <Route path="account" element={<Account />} />
                </Route>
                <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN, ROLES.PRACTITIONER]} />}>
                    <Route path="patients" element={<Patients />} />
                    <Route path="calendar" element={<Calendar />} />
                    <Route path="appointments">
                        <Route index element={<Appointments />} />
                        <Route path=":appointmentID/edit" element={<EditAppointment />} />
                        <Route path=":appointmentID/view" element={<ViewAppointment />} />
                        <Route path="*" element={<NotFound />} /> {/* ?? */}
                    </Route>
                </Route>
                <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
                    <Route path="admin" element={<Admin />} />
                </Route>

                {/* 404 */}
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
};

export default AppRouter;
