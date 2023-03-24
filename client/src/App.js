import './styles/main.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import style from './styles/app.module.css'

import Patients from './components/pages/patients';
import Update from './components/pages/update';
import Home from './components/pages/home';
import Header from './components/main/header';
import Calendar from './components/calendar';
import EditAppointment from './components/pages/editAppointment';
import Appointments from './components/pages/appointments';
import ViewAppointment from './components/pages/viewAppointment';
import NotFound from './components/pages/404';
import Account from './components/pages/account';

function App() {
  return (
    <div className={style.app}>
      <Header />
      <div className='body'>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/:id/update" element={<Update />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/appointments/:appointmentID/edit" element={<EditAppointment />} />
            <Route path='/appointments' element={<Appointments />} />
            <Route path="/appointments/:appointmentID/view" element={<ViewAppointment />} />
            <Route path="/account" element={<Account />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
