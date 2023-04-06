import { SpotlightProvider } from '@mantine/spotlight';
import type { SpotlightAction } from '@mantine/spotlight';
import { IconHome, IconCalendar, IconSearch, IconUsers, IconCalendarCheck } from '@tabler/icons-react';

const actions: SpotlightAction[] = [
    {
        title: 'Home',
        description: 'Get to home page',
        onTrigger: () => console.log('Home'),
        icon: <IconHome size="1.2rem" />,
    },
    {
        title: 'Patients',
        description: 'Get full information about patients',
        onTrigger: () => console.log('Dashboard'),
        icon: <IconUsers size="1.2rem" />,
    },
    {
        title: 'Appointments',
        description: 'Get full information about appointments',
        onTrigger: () => console.log('Documentation'),
        icon: <IconCalendarCheck size="1.2rem" />,
    },
    {
        title: 'Calendar',
        description: 'Get full information about calendar',
        onTrigger: () => console.log('Calendar'),
        icon: <IconCalendar size="1.2rem" />,
    },
];

const Spotlight = ({ children }: { children: JSX.Element }) => {
    return (
        <SpotlightProvider
            actions={actions}
            searchIcon={<IconSearch size="1.2rem" />}
            searchPlaceholder="Search..."
            shortcut="mod + k"
            nothingFoundMessage="Nothing found..."
        >
            {children}
        </SpotlightProvider>
    );
};

export default Spotlight;
