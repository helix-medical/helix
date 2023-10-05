import { createFormContext } from '@mantine/form';
import { IAppointmentContent } from './types';

export const [AppFormProvider, useAppFormContext, useAppForm] = createFormContext<IAppointmentContent>();
