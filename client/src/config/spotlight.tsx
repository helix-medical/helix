import { Spotlight, SpotlightActionData, SpotlightActionGroupData } from '@mantine/spotlight';
import {
  IconCalendar,
  IconCalendarPlus,
  IconCoins,
  IconHome,
  IconSearch,
  IconUsers,
  IconUsersPlus,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

const HelixSpotlight = () => {
  const navigate = useNavigate();

  const actions: (SpotlightActionGroupData | SpotlightActionData)[] = [
    {
      group: 'Patients',
      actions: [
        {
          id: 'view-patients',
          label: 'View Patients',
          description: 'Get full information about patients',
          onClick: () => navigate('/patients'),
          leftSection: <IconUsers size="1.2rem" />,
        },
        {
          id: 'add-patient',
          label: 'Add Patient',
          description: 'Add new patient',
          onClick: () => navigate('/patients/add'),
          leftSection: <IconUsersPlus size="1.2rem" />,
        },
      ],
    },
    {
      group: 'Appointments',
      actions: [
        {
          id: 'view-appointments',
          label: 'View Appointments',
          description: 'Get full information about appointments',
          onClick: () => navigate('/appointments'),
          leftSection: <IconUsers size="1.2rem" />,
        },
        {
          id: 'add-appointment',
          label: 'Add Appointment',
          description: 'Add new appointment',
          onClick: () => navigate('/appointments/add'),
          leftSection: <IconCalendarPlus size="1.2rem" />,
        },
      ],
    },
    {
      group: 'Main',
      actions: [
        {
          id: 'go-home',
          label: 'Go to Home',
          description: 'Get to home page',
          onClick: () => navigate('/'),
          leftSection: <IconHome size="1.2rem" />,
        },
        {
          id: 'view-calendar',
          label: 'Calendar',
          description: 'Get full information about calendar',
          onClick: () => navigate('/calendar'),
          leftSection: <IconCalendar size="1.2rem" />,
        },
        {
          id: 'view-accounting',
          label: 'Accounting',
          description: 'Get full information about accounting',
          onClick: () => navigate('/accounting'),
          leftSection: <IconCoins size="1.2rem" />,
        },
      ],
    },
  ];

  return (
    <Spotlight
      actions={actions}
      shortcut={['mod + k', '/']}
      searchProps={{ leftSection: <IconSearch size="1.2rem" />, placeholder: 'Search in Helix' }}
      nothingFound="Nothing found..."
      highlightQuery
    />
  );
};

export default HelixSpotlight;
