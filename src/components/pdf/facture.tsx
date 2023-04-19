import React from 'react';
import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import moment from 'moment';
import cnf from '../../config/config';
import HeaderPDF from './header';

const styles = StyleSheet.create({
    page: {
        backgroundColor: 'white',
        color: 'black',
        fontSize: 12,
    },
    header: {
        fontSize: 12,
        marginTop: 20,
        textAlign: 'center',
        color: 'grey',
    },
    table: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        border: '1px solid black',
        marginHorizontal: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    patient: {
        border: '1px solid black',
        marginHorizontal: 20,
        paddingHorizontal: 10,
        marginBottom: 20,
        width: '50%',
    },
    main: {
        marginTop: 20,
        textAlign: 'center',
        color: 'blue',
        marginBottom: 20,
    },
});

const Facture = ({ id, data }: { id: string; data: any }) => {
    return (
        <Document title={`facture-${id}`} author="Helix">
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text>Facture</Text>
                </View>
                <HeaderPDF data={{ doctorName: data.doctorName, doctorLastName: data.doctorLastName }} />
                <View style={styles.main}>
                    <Text>Facture {id}</Text>
                    <Text>{moment().format(cnf.formatDateTimePretty)}</Text>
                </View>
                <View style={styles.patient}>
                    <Text style={{ fontSize: 10 }}>Patient:</Text>
                    <Text>
                        {data.patientName} {data.patientLastName}
                    </Text>
                    <Text>{data.patientAddress}</Text>
                    <Text>{data.patientCity}</Text>
                </View>
                <View style={styles.table}>
                    <Text>Prestation du {moment(data.date).format(cnf.formatDatePretty)}</Text>
                    <Text>Tarif</Text>
                </View>
                <View style={styles.table}>
                    <Text>Consultation d'Ostéopathie {data.id}</Text>
                    <Text>{data.amount}€</Text>
                </View>
                <View style={styles.table}>
                    <Text>Total</Text>
                    <Text>{data.amount}€</Text>
                </View>
                <View style={styles.table}>
                    <Text>Méthode</Text>
                    <Text>{data.method}</Text>
                </View>
            </Page>
        </Document>
    );
};

export default Facture;
