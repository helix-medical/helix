import React from 'react';
import { IAppointmentDataView } from '../../interfaces';
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4',
    },
});

const AppointmentPDF = ({ data }: { data: IAppointmentDataView }) => {
    return (
        <Document title={`appointment-${data.appID}`} author="Helix">
            <Page size="A4" style={styles.page}>
                <View>
                    <Text>Appointment PDF</Text>
                </View>
            </Page>
        </Document>
    );
};

export default AppointmentPDF;
