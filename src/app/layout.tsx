import React, { ReactNode } from 'react';
import { AppShell } from '@mantine/core';
import HeaderWebsite from '../components/header';

const Layout = ({ children }: { children: ReactNode }) => <AppShell header={<HeaderWebsite />}>{children}</AppShell>;

export { Layout };
