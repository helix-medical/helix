import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                {/* After this, the pages are protected */}
                <Route index element={<Home />} />
                <Route path="/patients" element={<Patients />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/appointments">
                    <Route index element={<Appointments />} />
                    <Route path=":appointmentID/edit" element={<EditAppointment />} />
                    <Route path=":appointmentID/view" element={<ViewAppointment />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
                <Route path="/account" element={<Account />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
