import home from '../../assets/home.png';
import patients from '../../assets/patients.png';
import calendar from '../../assets/calendar.png';
import facture from '../../assets/facture.png';
import dossier from '../../assets/dossier-patient.png';
import compta from '../../assets/compta.png';
import appointment from '../../assets/appointment-view.png';

const carouselData = [
    {
        title: 'Homepage',
        description: '--------------------------',
        image: home,
    },
    {
        title: 'Patients',
        description: '--------------------------',
        image: patients,
    },
    {
        title: 'Dossier Patient',
        description: '--------------------------',
        image: dossier,
    },
    {
        title: 'Calendar',
        description: '--------------------------',
        image: calendar,
    },
    {
        title: 'Appointment view',
        description: '--------------------------',
        image: appointment,
    },
    // {
    //     title: 'List view',
    //     description: '--------------------------',
    //     image: '',
    // },
    {
        title: 'Transactions',
        description: '--------------------------',
        image: compta,
    },
    {
        title: 'Factures',
        description: '--------------------------',
        image: facture,
    },
];

export { carouselData };
