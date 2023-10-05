import { IAppointmentDataView } from '../../types/interfaces';
import { Document, Page, View, Text } from '@react-pdf/renderer';
import HeaderPDF from './header';
import { styles } from './appointment.style';

const AppointmentContent = ({ data }: { data: any }) => (
    <Page size="A4" style={styles.page}>
        <HeaderPDF data={{ practitionerName: data.name, practitionerLastName: data.lastName }} osteo />
        <View>
            <Text>Patient Data</Text>
            <Text>{data.pName}</Text>
            <Text>{data.pLastName}</Text>
            <Text>{data.email}</Text>
            <Text>{data.phone}</Text>
        </View>
    </Page>
);

const AppointmentPDF = ({ data }: { data: IAppointmentDataView }) => (
    <Document title={`appointment-${data.appID}`} author="Helix">
        <AppointmentContent data={data} />
    </Document>
);

export default AppointmentPDF;
export { AppointmentContent };
