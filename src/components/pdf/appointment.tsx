import React from 'react';
import { IAppointmentDataView } from '../../types/interfaces';
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import HeaderPDF from './header';

const styles = StyleSheet.create({
    page: {
        backgroundColor: 'white',
        color: 'black',
        fontSize: 12,
    },
});

const AppointmentPDF = ({ data }: { data: IAppointmentDataView }) => {
    return (
        <Document title={`appointment-${data.appID}`} author="Helix">
            <Page size="A4" style={styles.page}>
                <HeaderPDF data={{ doctorName: data.name, doctorLastName: data.lastName }} />
                <View>
                    <Text>Patient Data</Text>
                    <Text>{data.pName}</Text>
                    <Text>{data.pLastName}</Text>
                    <Text>{data.email}</Text>
                    <Text>{data.phone}</Text>
                </View>
            </Page>
        </Document>
    );
};

export default AppointmentPDF;
