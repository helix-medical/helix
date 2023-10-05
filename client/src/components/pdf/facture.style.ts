import { StyleSheet } from '@react-pdf/renderer';

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

export { styles, mh };
