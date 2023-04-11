import { Routes, Route } from 'react-router-dom';
// System
import Login from './login';
import Layout from './layout';
import RequireAuth from '../../components/auth/requireAuth';
import PersistentLogin from '../../components/auth/persistentLogin';
import cnf from '../../config/config';
// Pages
import Patients from '../patients/patients';
import Home from '../home/home';
import Calendar from '../../components/calendar';
import EditAppointment from '../appointment/edit';
import Appointments from '../appointments/appointments';
import ViewAppointment from '../appointment/view';
import Accounting from '../accounting/accounting';
// Errors
import NotFound from './errors/404';
import Unauthorized from './errors/unauthorized';

const AppRouter = () => {
    const ROLES = cnf.roles;
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {/* Public */}
                <Route path="login" element={<Login />} />
                <Route path="unauthorized" element={<Unauthorized />} />
                {/* Add pages for errors */}

                {/* Protected */}
                <Route element={<PersistentLogin />}>
                    <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN, ROLES.PRACTITIONER, ROLES.SECRETARY]} />}>
                        <Route path="/" element={<Home />} />
                        <Route path="patients" element={<Patients add={false} />} />
                        <Route path="patients/add" element={<Patients add={true} />} />
                        <Route path="accounting" element={<Accounting />} />
                        <Route path="calendar" element={<Calendar />} />
                        <Route path="appointments">
                            <Route index element={<Appointments add={false} />} />
                            <Route path="add" element={<Appointments add={true} />} />
                            <Route path=":appointmentID/view" element={<ViewAppointment />} />
                        </Route>
                    </Route>
                    <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN, ROLES.PRACTITIONER]} />}>
                        <Route path="appointments/:appointmentID/edit" element={<EditAppointment />} />
                        <Route path="*" element={<NotFound />} /> {/* ?? */}
                    </Route>
                </Route>

                {/* 404 */}
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
};

export default AppRouter;
