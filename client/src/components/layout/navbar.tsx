import {
  ActionIcon,
  AppShell,
  Avatar,
  Code,
  Divider,
  Group,
  Indicator,
  NavLink,
  ScrollArea,
  Text,
  TextInput,
  Title,
  Tooltip,
  UnstyledButton,
} from '@mantine/core';
import {
  IconCalendarWeek,
  IconChevronUp,
  IconClipboardText,
  IconCurrencyBitcoin,
  IconLogout,
  IconMail,
  IconSearch,
  IconSettings,
  IconUsersGroup,
} from '@tabler/icons-react';
import classes from './styles.module.css';
import { useNavigate } from 'react-router-dom';
import useLogout from '../../hooks/use-logout.ts';
import logo from '../../assets/logo.png';
import packageJson from '../../../package.json';

interface ILink {
  label: string;
  link: string;
  icon: React.FC<any>;
  color: string;
  desc: string;
}

const links: ILink[] = [
  { label: 'Patients', link: '/patients', icon: IconUsersGroup, color: 'yellow', desc: 'Gérer les patients' },
  {
    label: 'Rendez-vous',
    link: '/appointments',
    icon: IconClipboardText,
    color: 'orange',
    desc: 'Voir les rendez-vous',
  },
  {
    label: 'Comptabilité',
    link: '/accounting',
    icon: IconCurrencyBitcoin,
    color: 'teal',
    desc: 'Gérer la comptabilité',
  },
  { label: 'Calendrier', link: '/calendar', icon: IconCalendarWeek, color: 'blue', desc: 'Gérer le calendrier' },
];

const MenuItem = (item: ILink) => {
  const { label, link, icon: Icon, color, desc } = item;
  const navigate = useNavigate();

  return (
    <NavLink
      key={link}
      label={
        <Text size="lg" fw={500}>
          {label}
        </Text>
      }
      leftSection={<Icon size="2rem" />}
      description={desc}
      component="button"
      onClick={() => navigate(link)}
      color={color}
      variant="subtle"
      active={window.location.pathname.includes(link)}
      disabled={link === '/calendar'}
    />
  );
};

const HelixNavbar = () => {
  const logout = useLogout();
  const navigate = useNavigate();
  return (
    <>
      <AppShell.Section>
        <UnstyledButton onClick={() => navigate('/')} className={classes.link}>
          <Group>
            <Avatar src={logo} size="md" />
            <Title order={1}>Helix</Title>
            <Code>v{packageJson.version}</Code>
          </Group>
        </UnstyledButton>
        <TextInput
          rightSection={<IconSearch size="1.2rem" />}
          className={classes.textsearch}
          placeholder="Rechercher un patient"
          disabled
        />
        {links.map((link) => MenuItem(link))}
        <Divider my="sm" />
      </AppShell.Section>
      <AppShell.Section grow component={ScrollArea}></AppShell.Section>
      <AppShell.Section>
        <NavLink
          disabled
          label={<Text size="md">Inbox</Text>}
          rightSection={<IconChevronUp size="1.2rem" />}
          leftSection={
            <Indicator processing size={10}>
              <IconMail size="1.2rem" />
            </Indicator>
          }
        />
        <NavLink
          label={<Text size="md">Administration</Text>}
          leftSection={<IconSettings size="1.2rem" />}
          active={window.location.pathname === '/settings'}
          color="red"
          variant="subtle"
          component="button"
          onClick={() => navigate('/settings')}
        />
        <Divider />
        <UnstyledButton className={classes.user}>
          <Group>
            <Avatar
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-4.png"
              radius="xl"
            />

            <div style={{ flex: 1 }}>
              <Text size="sm" fw={500}>
                Maivy Ostéo
              </Text>

              <Text c="dimmed" size="xs">
                marie.de-place@osteo.bzh
              </Text>
            </div>

            <Tooltip label="Logout" color="red" withArrow>
              <ActionIcon color="red" variant="light" size="lg" component="button" onClick={logout}>
                <IconLogout size="1.2rem" />
              </ActionIcon>
            </Tooltip>
          </Group>
        </UnstyledButton>
      </AppShell.Section>
    </>
  );
};

export default HelixNavbar;
