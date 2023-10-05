import { Document, Page, Text, View } from '@react-pdf/renderer';
import moment from 'moment';
import HeaderPDF from './header';
import cnf from '../../config/config';
import { styles, mh } from './facture.style';

const FactureContent = ({ data }: { data: any }) => (
    <Page style={styles.page}>
        <HeaderPDF
            data={{ practitionerName: data.practitionerName, practitionerLastName: data.practitionerLastName }}
            osteo
        />
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
                Note d'honoraires n°: {data.factureNumber}, émise le: {moment(data.date).format('DD/MM/YYYY[ à ]HH:mm')}
            </Text>
            <Text>N°SIRET: {cnf.cabinet.siret}</Text>
            <Text>Le paiement de cette facture vaut acceptation des conditions générales de vente.</Text>
            <Text>
                Membre d'une association agréée, le règlement par chèque ou carte bancaire est accepté. TVA non
                applicable en vertu de l'article 261 du Code Général des Impôts.
            </Text>
        </View>
    </Page>
);

//@ts-expect-error
const Facture = ({ id, data }: { id: string; data: any }) => (
    <Document title={`facture-${data.factureNumber}`} author="Helix">
        <FactureContent data={data} />
    </Document>
);

export default Facture;
export { FactureContent };
