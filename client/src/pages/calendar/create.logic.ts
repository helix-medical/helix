// import { isNotEmpty, useForm } from '@mantine/form';
// import useApplicationRoutes from '../../api/routes';
// import { useEffect, useState } from 'react';
// import setNotification from '../../components/errors/feedback-notification';
// import moment from 'moment';
// import cnf from '../../config/config';
//
// const useComponentLogic = (handler: () => void) => {
//     const routes = useApplicationRoutes();
//     const [patients, setPatients] = useState<any[]>([]);
//     const [practitioners, setPractitioners] = useState<any[]>([]);
//
//     const form = useForm({
//         initialValues: {
//             patientId: '',
//             date: '',
//             practitioner: '',
//             kind: '',
//             type: 'appointment',
//         },
//
//         validate: {
//             patientId: isNotEmpty('Patient is required'),
//             date: isNotEmpty('Date is required'),
//             practitioner: isNotEmpty('Practitioner is required'),
//             kind: isNotEmpty('Kind is required'),
//         },
//     });
//
//     const getPatients = async () => {
//         try {
//             const response = await routes.patients.getForAppointment();
//             setPatients(
//                 response.data.map((patient: any) => ({
//                     label: `${patient.name} ${patient.lastName}`,
//                     value: patient.id,
//                 }))
//             );
//         } catch (error: any) {
//             if (!error?.response) setNotification(true, 'Network error');
//             else setNotification(true, `${error.message}: ${error.response.data.message}`);
//         }
//     };
//
//     const getPractitioners = async () => {
//         try {
//             const response = await routes.users.getPractitioners();
//             setPractitioners(
//                 response.data.map((practitioner: any) => ({
//                     label: `${practitioner.name} ${practitioner.lastName}`,
//                     value: practitioner.uid,
//                 }))
//             );
//         } catch (error: any) {
//             if (!error?.response) setNotification(true, 'Network error');
//             else setNotification(true, `${error.message}: ${error.response.data.message}`);
//         }
//     };
//
//     useEffect(() => {
//         getPatients();
//         getPractitioners();
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, []);
//
//     const handleSubmit = async (e: { preventDefault: () => void }) => {
//         e.preventDefault();
//         if (form.validate().hasErrors) return;
//         const patient = patients.find((patient: any) => patient.value === form.values.patientId) as any;
//         const event = {
//             title: `${patient?.label}`,
//             start: moment(form.values.date).format(cnf.formatDateTime),
//             end: moment(form.values.date).add(cnf.durationAppointment, 'minutes').format(cnf.formatDateTime),
//             calendar: form.values.practitioner,
//         };
//         console.log(event);
//         try {
//             const index = await routes.events.create(event);
//             let res = await routes.appointments.create({
//                 patientId: form.values.patientId,
//                 kind: form.values.kind,
//                 event: index.data.id,
//             });
//             await routes.events.addAppointment(index.data.id, {
//                 appId: res.data.id,
//                 patientId: form.values.patientId,
//             });
//             setNotification(false, index.data.message);
//             handler();
//         } catch (error: any) {
//             if (!error?.response) setNotification(true, 'Network error');
//             else setNotification(true, `${error.message}: ${error.response.data.message}`);
//         }
//     };
//
//     return {
//         form,
//         patients,
//         practitioners,
//         handleSubmit,
//     };
// };
//
// export default useComponentLogic;
