import './styles/main.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import style from './styles/app.module.css'

import Patients from './pages/patients/patients';
import Update from './pages/patients/update';
import Home from './pages/home';
import Header from './components/main/header';
import Calendar from './components/calendar';
import EditAppointment from './pages/appointment/edit';
import Appointments from './pages/appointments/appointments';
import ViewAppointment from './pages/appointment/view';
import NotFound from './pages/system/404';
import Account from './pages/account';

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
