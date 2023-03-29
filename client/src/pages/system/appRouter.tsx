import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
} from 'react-router-dom';

import Patients from '../../pages/patients/patients';
import Home from '../../pages/home';
import Calendar from '../../components/calendar';
import EditAppointment from '../../pages/appointment/edit';
import Appointments from '../../pages/appointments/appointments';
import ViewAppointment from '../../pages/appointment/view';
import NotFound from '../../pages/system/404';
import Account from '../../pages/account';
import Admin from "./admin";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/patients" element={<Patients />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/appointments/:appointmentID/edit" element={<EditAppointment />} />
                <Route path='/appointments' element={<Appointments />} />
                <Route path="/appointments/:appointmentID/view" element={<ViewAppointment />} />
                <Route path="/account" element={<Account />} />
                <Route path='/admin' element={<Admin />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;