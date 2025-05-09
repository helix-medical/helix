import { Route, Routes } from 'react-router-dom';
// System
import Login from './login';
import Layout from '../../components/layout';
import RequireAuth from '../../components/auth/require-auth';
import PersistentLogin from '../../components/auth/persistent-login';
import cnf from '../../config/config';
// Pages
import Accounting from '../accounting';
import Appointment from '../appointment';
import Appointments from '../appointments';
import Home from '../home';
import Patient from '../patient';
import Patients from '../patients';
// Errors
import NotFound from '../../components/errors/404';
import Unauthorized from '../../components/errors/unauthorized';
import AdminPanel from '../admin';
import Callback from '../logto';

const AppRouter = () => {
  const ROLES = cnf.roles;
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public */}
        <Route path="/logto" element={<Callback />} />
        <Route path="login" element={<Login />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        {/* Add pages for errors */}

        {/* Protected */}
        <Route element={<PersistentLogin />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN, ROLES.PRACTITIONER, ROLES.SECRETARY]} />}>
            <Route path="/" element={<Home />} />
            <Route path="patients">
              <Route index element={<Patients add={false} />} />
              <Route path="add" element={<Patients add={true} />} />
              <Route path=":patientID" element={<Patient />} />
            </Route>
            <Route path="accounting" element={<Accounting />} />
            {/*<Route path="calendar" element={<Calendar />} />*/}
            <Route path="settings" element={<AdminPanel />} />
            <Route path="appointments">
              <Route index element={<Appointments add={false} />} />
              <Route path="add" element={<Appointments add={true} />} />
              <Route path=":appointmentID" element={<Appointment />} />
            </Route>
          </Route>
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
