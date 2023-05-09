import React from 'react';
import { Document, Page, View, Text } from '@react-pdf/renderer';
import HeaderPDF from './header';
import { PDFStyles } from './styles';
import { styles, mh } from './patient.style';
import moment from 'moment';
import { FactureContent } from './facture';
import { AppointmentContent } from './appointment';

const Appointment = ({ data }: { data: any }) => (
    <View style={styles.table}>
        <Text>{moment(data.start).format('dddd DD MMMM YYYY HH:mm')}</Text>
        <Text>
            {data.practitionerName} {data.practitionerLastName}
        </Text>
        <Text>{data.kind}</Text>
    </View>
);

const Transaction = ({ data }: { data: any }) => (
    <View style={styles.table}>
        <Text>{moment(data.date).format('dddd DD MMMM YYYY HH:mm')}</Text>
        <Text>{data.amount}</Text>
        <Text>{data.method}</Text>
    </View>
);

const PatientContent = ({ data }: { data: any }) => (
    <View style={styles.patient}>
        <Text>{data.name}</Text>
        <Text>{data.lastName}</Text>
        <Text>{data.email}</Text>
        <Text>{data.phone}</Text>
        <Text>{data.address}</Text>
        <Text>{data.city}</Text>
        <Text>{data.sex}</Text>
        <Text>{data.birthDate}</Text>
        <Text>{data.job}</Text>
        <Text>{data.doctor}</Text>
        <Text>{JSON.parse(data.passif).medicalIssues}</Text>
    </View>
);

const PatientPDF = ({ data }: { data: any }) => {
    console.log(data);
    return (
        <Document title={`patient-`} author="Helix">
            <Page size="A4" style={PDFStyles.page}>
                <HeaderPDF data={{ practitionerName: '', practitionerLastName: '' }} />
                <Text style={styles.title}>Dossier Patient</Text>
                <Text style={{ ...styles.head, marginHorizontal: mh + 10 }}>LX-{data.id.toUpperCase()}</Text>
                <PatientContent data={data} />
                <View>
                    <Text>Rendez-vous</Text>
                    <View style={styles.tableHeader}>
                        <Text>Date</Text>
                        <Text>Praticien</Text>
                        <Text>Motif</Text>
                    </View>
                    {data?.appointments
                        ?.filter((app: any) => app.status !== 'pending')
                        .map((appointment: any) => (
                            <Appointment data={appointment} key={appointment.appID} />
                        ))}
                </View>
                <View>
                    <Text>Transactions</Text>
                    <View style={styles.tableHeader}>
                        <Text>Date</Text>
                        <Text>Montant</Text>
                        <Text>Mode de paiement</Text>
                    </View>
                    {data?.transactions?.map((transaction: any) => (
                        <Transaction data={transaction} key={transaction.id} />
                    ))}
                </View>
            </Page>
            {data?.appointments
                ?.filter((app: any) => app.status !== 'pending')
                .map((appointment: any) => (
                    <AppointmentContent data={appointment} key={appointment.appID} />
                ))}
            {data?.transactions?.map((transaction: any) => (
                <FactureContent
                    data={{
                        ...transaction,
                        practitionerLastName: data.practitionerLastName,
                        practitionerName: data.practitionerName,
                        patientName: data.name,
                        patientLastName: data.lastName,
                        patientAddress: data.address,
                        patientCity: data.city,
                    }}
                    key={transaction.id}
                />
            ))}
        </Document>
    );
};

export default PatientPDF;
