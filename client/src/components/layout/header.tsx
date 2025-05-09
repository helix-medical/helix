// import { Container, Text, UnstyledButton } from '@mantine/core';
// import { useDisclosure } from '@mantine/hooks';
// import { useNavigate } from 'react-router-dom';
// import useLogout from '../../hooks/use-logout';
// import classes from './styles.module.css';
//
// const links = [
//   { label: 'Patients', link: '/patients' },
//   { label: 'Rendez-vous', link: '/calendar' },
//   { label: 'Comptabilité', link: '/accounting' },
// ];
//
// const HeaderApp = () => {
//   const [opened, { toggle }] = useDisclosure(false);
//   const logout = useLogout();
//   const navigate = useNavigate();
//
//   const goToLink = (link: string) => {
//     navigate(link);
//     if (opened) toggle();
//   };
//
//   const items = links.map((link) => {
//     return (
//       <UnstyledButton onClick={() => goToLink(link.link)} key={link.link} className={classes.link}>
//         <Text size="lg" fw={500}>
//           {link.label}
//         </Text>
//       </UnstyledButton>
//     );
//   });
//
//   return (
//     <>
//       <Container fluid className={classes.inner}>
//         {/*<Group>*/}
//         {/*  <Burger opened={opened} onClick={toggle} size="sm" className={classes.burger} />*/}
//         {/*  <UnstyledButton onClick={() => goToLink('/')} className={classes.link}>*/}
//         {/*    <Group>*/}
//         {/*      <Avatar src={logo} size="md" />*/}
//         {/*      <Title order={1}>Helix</Title>*/}
//         {/*    </Group>*/}
//         {/*  </UnstyledButton>*/}
//         {/*</Group>*/}
//         {/*<Group gap="lg" className={classes.links}>*/}
//         {/*  {items}*/}
//         {/*</Group>*/}
//         {/*<Group>*/}
//         {/*  <Tooltip label="Notifications" color="orange" withArrow>*/}
//         {/*    <ActionIcon color="orange" variant="light" size="lg" component="button" onClick={() => {}} disabled>*/}
//         {/*      <IconBell size="1.2rem" />*/}
//         {/*    </ActionIcon>*/}
//         {/*  </Tooltip>*/}
//         {/*  <Tooltip label="Open Spotlight" color="green" withArrow>*/}
//         {/*    <ActionIcon color="green" variant="light" size="lg" onClick={spotlight.open}>*/}
//         {/*      <IconSearch size="1.2rem" />*/}
//         {/*    </ActionIcon>*/}
//         {/*  </Tooltip>*/}
//         {/*  <ToggleTheme />*/}
//         {/*  <Tooltip label="Logout" color="red" withArrow>*/}
//         {/*    <ActionIcon color="red" variant="light" size="lg" component="button" onClick={logout}>*/}
//         {/*      <IconPower size="1.2rem" />*/}
//         {/*    </ActionIcon>*/}
//         {/*  </Tooltip>*/}
//         {/*</Group>*/}
//       </Container>
//       {/*<DrawerApp open={opened} toggle={toggle} items={items} />*/}
//     </>
//   );
// };
//
// export { HeaderApp };
