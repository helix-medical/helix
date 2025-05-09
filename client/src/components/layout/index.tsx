import { AppShell } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import HelixNavbar from './navbar';

const Layout = () => {
  // const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  // const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(false);

  return (
    <AppShell
      // header={{ height: rem(60) }}
      padding="md"
      navbar={{
        width: 300,
        breakpoint: 'xs',
        //   collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
    >
      <AppShell.Header>{/*<HeaderApp />*/}</AppShell.Header>
      <AppShell.Navbar>
        <HelixNavbar />
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
        {/*<Button onClick={toggleDesktop} visibleFrom="sm">*/}
        {/*  Toggle navbar*/}
        {/*</Button>*/}
        {/*<Button onClick={toggleMobile} hiddenFrom="sm">*/}
        {/*  Toggle navbar*/}
        {/*</Button>*/}
      </AppShell.Main>
    </AppShell>
  );
};

export default Layout;
