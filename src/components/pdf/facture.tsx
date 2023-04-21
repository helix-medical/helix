import React from 'react';
import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import moment from 'moment';
import HeaderPDF from './header';
import cnf from '../../config/config';

const mh = 50;

const styles = StyleSheet.create({
    page: {
        backgroundColor: 'white',
        color: 'black',
        fontSize: 14,
        fontFamily: 'Helvetica',
    },
    table: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: mh,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    sum: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '20%',
        marginHorizontal: mh,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginVertical: 5,
        alignSelf: 'flex-end',
        backgroundColor: '#E6FCF5',
    },
    patient: {
        backgroundColor: '#f0f0f0',
        marginHorizontal: mh,
        padding: 10,
        marginVertical: 20,
        width: '43%',
    },
    title: {
        marginHorizontal: 50,
        marginTop: 20,
        color: '#12B886',
        fontWeight: 'bold',
        fontFamily: 'Helvetica-Bold',
        fontSize: 24,
    },
    head: {
        fontSize: 10,
        color: 'grey',
        fontWeight: 'bold',
        marginBottom: 5,
    },
    legal: {
        marginHorizontal: mh,
        padding: 10,
        marginTop: 270,
        textAlign: 'center',
        fontSize: 10,
        color: 'grey',
    },
});

const Facture = ({ id, data }: { id: string; data: any }) => {
    return (
        <Document title={`facture-${data.factureNumber}`} author="Helix">
            <Page style={styles.page}>
                <HeaderPDF data={{ doctorName: data.doctorName, doctorLastName: data.doctorLastName }} />
                <Text style={styles.title}>NOTE D'HONORAIRES</Text>
                <Text style={{ ...styles.head, marginHorizontal: mh + 10 }}>LX-{data.factureNumber}</Text>
                <View style={styles.patient}>
                    <Text style={styles.head}>PATIENT</Text>
                    <Text>
                        {data.patientName} {data.patientLastName}
                    </Text>
                    <Text>{data.patientAddress}</Text>
                    <Text>{data.patientCity}</Text>
                </View>
                <View style={{ ...styles.table, borderBottom: '1px solid #12B886' }}>
                    <Text>Prestation du {moment(data.date).format('DD/MM/YYYY')}</Text>
                    <Text>Tarif</Text>
                </View>
                <View style={styles.table}>
                    <Text>Consultation d'Ostéopathie</Text>
                    <Text>{data.amount}.00€</Text>
                </View>
                <View style={styles.sum}>
                    <Text>Total</Text>
                    <Text>{data.amount}.00€</Text>
                </View>
                <View style={styles.legal} fixed>
                    <Text>
                        Note d'honoraires n°: {data.factureNumber}, émise le:{' '}
                        {moment(data.date).format('DD/MM/YYYY[ à ]HH:mm')}
                    </Text>
                    <Text>N°SIRET: {cnf.cabinet.siret}</Text>
                    <Text>Le paiement de cette facture vaut acceptation des conditions générales de vente.</Text>
                    <Text>
                        Membre d'une association agréée, le règlement par chèque ou carte bancaire est accepté. TVA non
                        applicable en vertu de l'article 261 du Code Général des Impôts.
                    </Text>
                </View>
            </Page>
        </Document>
    );
};

export default Facture;
