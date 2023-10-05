import { StyleSheet } from '@react-pdf/renderer';

const mh = 50;

const styles = StyleSheet.create({
    table: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: mh,
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: 10,
    },
    tableHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: mh,
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#E6FCF5',
    },
    patient: {
        backgroundColor: '#f0f0f0',
        marginHorizontal: mh,
        padding: 10,
        marginVertical: 20,
    },

    title: {
        marginHorizontal: mh,
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
});

export { styles, mh };
