import { useEffect, useState } from 'react';
import { Anamnesis } from './anamnesis';
import { AppFormProvider } from './form-context';
import { Button, Center, useMantineColorScheme } from '@mantine/core';
import { Conclusion } from './conclusion';
import { Metadata } from './metadata';
import { NavBarAppointment } from './navbar';
import { PatientMetadata } from './patient-metadata';
import { Secretary } from './secretary';
import { useAppointmentValidate } from './validate.logic';
import { useAppointmentGet } from './get.logic';
import GrantAccess from '../../components/auth/grant-access';

const Appointment = (): JSX.Element => {
  const id = window.location.href.split('/').slice(-1)[0];
  const { data, view, content } = useAppointmentGet(id);
  const { handleSubmit } = useAppointmentValidate(id, content);

  const [mainColor, setMainColor] = useState('fr-orange.4');
  const { colorScheme } = useMantineColorScheme();

  useEffect(() => {
    setMainColor(colorScheme === 'dark' ? 'fr-orange.6' : 'fr-orange.4');
  }, [colorScheme]);

  return (
    <>
      <NavBarAppointment view={view} color={mainColor} handler={() => {}} />
      <Metadata data={data} />
      <PatientMetadata form={data} color={mainColor} view={view} />
      <AppFormProvider form={content}>
        <form onSubmit={handleSubmit}>
          <GrantAccess levels={['ADMIN', 'PRACTITIONER']}>
            <Anamnesis view={view} />
            <Conclusion view={view} />
          </GrantAccess>
          <Secretary view={view} />
          {view ? null : (
            <GrantAccess levels={['ADMIN', 'PRACTITIONER']}>
              <Center>
                <Button type="submit" m="lg" color={mainColor}>
                  Valid Appointment
                </Button>
              </Center>
            </GrantAccess>
          )}
        </form>
      </AppFormProvider>
    </>
  );
};

export default Appointment;
