import React from 'react';
import { TextInput, Grid } from '@mantine/core';
import { IAppointmentData } from './types';
import { UseFormReturnType } from '@mantine/form';
import { params } from './utils';

const Biodatas = ({ data, view }: { data: UseFormReturnType<IAppointmentData>; view: boolean }): JSX.Element => (
    <Grid columns={12}>
        <Grid.Col sm={6} md={4}>
            <TextInput label="Name" {...data.getInputProps('name')} {...params(view)} />
        </Grid.Col>
        <Grid.Col sm={6} md={4}>
            <TextInput label="Last Name" {...data.getInputProps('lastName')} {...params(view)} />
        </Grid.Col>
        <Grid.Col xs={4} sm={2} md={4}>
            <TextInput label="Sex" readOnly {...data.getInputProps('sex')} />
        </Grid.Col>
        <Grid.Col xs={8} sm={4} md={4}>
            <TextInput label="Birth Date" {...data.getInputProps('birthDate')} {...params(view)} />
        </Grid.Col>
        <Grid.Col sm={6} md={4}>
            <TextInput label="Email" {...data.getInputProps('email')} {...params(view)} />
        </Grid.Col>
        <Grid.Col sm={6} md={4}>
            <TextInput label="Phone" {...data.getInputProps('phone')} {...params(view)} />
        </Grid.Col>
        <Grid.Col sm={6} md={4}>
            <TextInput label="Address" {...data.getInputProps('address')} {...params(view)} />
        </Grid.Col>
        <Grid.Col sm={6} md={4}>
            <TextInput label="Job" {...data.getInputProps('job')} {...params(view)} />
        </Grid.Col>
        <Grid.Col sm={6} md={4}>
            <TextInput label="City" {...data.getInputProps('city')} {...params(view)} />
        </Grid.Col>
    </Grid>
);

export { Biodatas };
