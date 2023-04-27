import React from 'react';
import { SpotlightProvider } from '@mantine/spotlight';
import type { SpotlightAction } from '@mantine/spotlight';
import {
    IconHome,
    IconCalendar,
    IconSearch,
    IconUsers,
    IconCalendarCheck,
    IconCalendarPlus,
    IconUsersPlus,
    IconCoins,
} from '@tabler/icons-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Spotlight = ({ children }: { children: JSX.Element }) => {
    const navigate = useNavigate();
    const [query, setQuery] = useState<string>('');
    const actions: SpotlightAction[] =
        query === 'patients'
            ? [
                  {
                      title: 'View Patients',
                      description: 'Get full information about patients',
                      onTrigger: () => navigate('/patients'),
                      keywords: ['patients', 'patient', 'view'],
                      icon: <IconUsers size="1.2rem" />,
                  },
                  {
                      title: 'Add Patient',
                      description: 'Add new patient',
                      onTrigger: () => navigate('/patients/add'),
                      keywords: ['patients', 'patient', 'add'],
                      icon: <IconUsersPlus size="1.2rem" />,
                  },
              ]
            : query === 'appointments'
            ? [
                  {
                      title: 'View Appointments',
                      description: 'Get full information about appointments',
                      onTrigger: () => navigate('/appointments'),
                      keywords: ['appointments', 'appointment', 'view'],
                      icon: <IconUsers size="1.2rem" />,
                  },
                  {
                      title: 'Add Appointment',
                      description: 'Add new appointment',
                      onTrigger: () => navigate('/appointments/add'),
                      keywords: ['appointments', 'appointment', 'add'],
                      icon: <IconCalendarPlus size="1.2rem" />,
                  },
              ]
            : [
                  {
                      title: 'Home',
                      description: 'Get to home page',
                      onTrigger: () => navigate('/'),
                      icon: <IconHome size="1.2rem" />,
                  },
                  {
                      title: 'Patients',
                      description: 'Get full information about patients',
                      onTrigger: () => setQuery('patients'),
                      icon: <IconUsers size="1.2rem" />,
                      closeOnTrigger: false,
                  },
                  {
                      title: 'Appointments',
                      description: 'Get full information about appointments',
                      onTrigger: () => setQuery('appointments'),
                      icon: <IconCalendarCheck size="1.2rem" />,
                      closeOnTrigger: false,
                  },
                  {
                      title: 'Calendar',
                      description: 'Get full information about calendar',
                      onTrigger: () => navigate('/calendar'),
                      icon: <IconCalendar size="1.2rem" />,
                  },
                  {
                      title: 'Accounting',
                      description: 'Get full information about accounting',
                      onTrigger: () => navigate('/accounting'),
                      icon: <IconCoins size="1.2rem" />,
                  },
              ];

    return (
        <SpotlightProvider
            query={query}
            actions={actions}
            searchIcon={<IconSearch size="1.2rem" />}
            searchPlaceholder="Search..."
            shortcut={['mod + k', '/']}
            onQueryChange={setQuery}
            nothingFoundMessage="Nothing found..."
        >
            {children}
        </SpotlightProvider>
    );
};

export default Spotlight;
