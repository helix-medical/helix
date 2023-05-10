import React, { useEffect, useState } from 'react';
import NavBarAppointment from './navbar';
import { useMantineTheme } from '@mantine/core';
import Metadata from './metadata';
import { useAppointment } from './logic';

const Appointment = (): JSX.Element => {
    const [mainColor, setMainColor] = useState('fr-orange.4');
    const { data, view } = useAppointment('');
    const theme = useMantineTheme();
    useEffect(() => {
        setMainColor(theme.colorScheme === 'dark' ? 'fr-orange.6' : 'fr-orange.4');
    }, [theme.colorScheme]);

    return (
        <>
            <NavBarAppointment view={view} color={mainColor} handler={() => {}} />
            <Metadata appointment={data as any} /> {/* REMOVE ANY */}
        </>
    );
};

export default Appointment;
