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
        description: `Bienvenue sur votre espace de travail. Vous y trouverez les informations essentielles en un coup d'œil.`,
        image: home,
    },
    {
        title: 'Patients',
        description: `Tous les dossiers médicaux de vos patients sont accessibles depuis cette page. Vous pouvez les consulter, les modifier et en créer de nouveaux.`,
        image: patients,
    },
    {
        title: 'Dossier Patient',
        description: `Vos dossiers médicaux sont organisés de cette façon. Vous pouvez les consulter, les modifier et les exporter si besoin.`,
        image: dossier,
    },
    {
        title: 'Calendrier',
        description: `Le calendrier est la page centrale de votre espace de travail. Voici celui d'Helix. Vous pouvez y ajouter des rendez-vous mais aussi vos événements personnels.`,
        image: calendar,
    },
    {
        title: 'Rendez-vous',
        description: `Prenez vos notes de rendez-vous avec Helix. Notre interface est simple et intuitive, et vous ne manquerez jamais une information importante.`,
        image: appointment,
    },
    {
        title: 'Comptabilité',
        description: `Helix vous permet de gérer votre comptabilité. Vous gardez toujours un œil sur vos paiements et vos factures.`,
        image: compta,
    },
    {
        title: 'Factures',
        description: `Qui dit comptabilité dit factures. Helix vous permet de créer des factures et de les envoyer à vos patients, en un seul click.`,
        image: facture,
    },
];

export { carouselData };
