import { Kbd, Text } from '@mantine/core';
import {
    IconUsersGroup,
    IconCalendar,
    IconFileEuro,
    IconBrandOpenSource,
    IconGauge,
    IconUserShield,
} from '@tabler/icons-react';

const featuresData = [
    {
        title: 'Gestion des Patients',
        description: (
            <Text>
                Vous pouvez gérer tous vos patients, leurs dossiers, leurs antécédents directement depuis la page{' '}
                <Kbd>Patients</Kbd>.
            </Text>
        ),
        icon: IconUsersGroup,
    },
    {
        title: 'Gestion des Consultations',
        description: (
            <Text>
                Avec le calendrier, vous avez une vision claire sur votre emploi du temps, et vous pouvez facilement
                ajouter un rendez-vous quand vous êtes disponibles.
            </Text>
        ),
        icon: IconCalendar,
    },
    {
        title: 'Gestion des Factures',
        description: (
            <Text>
                Gérez vos factures directement dans l'application. Vous pouvez directement les imprimer ou les envoyer
                par mail à vos patients.
            </Text>
        ),
        icon: IconFileEuro,
    },
    {
        title: 'Open source',
        description: (
            <Text>
                Helix est un logiciel libre, ce qui signifie que vous pouvez l'utiliser gratuitement, et même le
                modifier. C'est un gage de transparence et de sécurité.
            </Text>
        ),
        icon: IconBrandOpenSource,
    },
    {
        title: 'Rapide',
        description: (
            <Text>
                Helix est conçu pour être rapide et réactif. C'est une application directement dans votre navigateur,
                qui ne nécessite pas d'installation. Vous pouvez l'utiliser sur n'importe quel appareil.
            </Text>
        ),
        icon: IconGauge,
    },
    {
        title: 'Confidentiel',
        description: (
            <Text>
                Helix est designé pour être entièrement RGPD-compatible. Les données des patients ne sortent pas de
                votre cabinet, et seuls les praticiens peuvent y avoir accès.
            </Text>
        ),
        icon: IconUserShield,
    },
];

export { featuresData };
