import './styles/App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Patients from './components/pages/patients';
import Update from './components/pages/update';
import Home from './components/pages/home';
import Header from './components/header';
import Calendar from './components/calendar';
import Appointment from './components/pages/appointment';

function App() {
  return (
    <div className="App">
      <Header />
      <div className='body'>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/update/:id" element={<Update />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/appointment" element={<Appointment />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
