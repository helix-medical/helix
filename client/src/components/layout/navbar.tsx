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
  IconClipboardText,
  IconCurrencyBitcoin,
  IconLogout,
  IconSearch,
  IconSettings,
  IconUsersGroup,
} from '@tabler/icons-react';
import classes from './styles.module.css';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import packageJson from '../../../package.json';
import useLogtoUserInfo from '../../hooks/use-orgs-data.ts';

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
    />
  );
};

const HelixNavbar = () => {
  const navigate = useNavigate();
  const { user, fullUserInfo, signOut } = useLogtoUserInfo();

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
        <Text ta="center">{fullUserInfo?.organization_data?.[0]?.name ?? ''}</Text>
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
            <Indicator position="bottom-end" color="green" size={10}>
              {user?.picture ? (
                <Avatar src={user?.picture} radius="md" />
              ) : (
                <Avatar name={user?.name ?? ''} color="initials" radius="md" />
              )}
            </Indicator>
            <div style={{ flex: 1 }}>
              <Text size="sm" fw={500}>
                {user?.name}
              </Text>

              <Text c="dimmed" size="xs">
                {user?.email}
              </Text>
            </div>

            <Tooltip label="Logout" color="red" withArrow>
              <ActionIcon
                color="red"
                variant="light"
                size="lg"
                component="button"
                onClick={() => signOut('http://localhost:3000/login')}
              >
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
