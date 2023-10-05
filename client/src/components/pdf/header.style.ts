import { StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    cabinet: {
        textAlign: 'left',
    },
    osteo: {
        alignItems: 'flex-end',
    },
    header: {
        margin: 50,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontSize: 14,
        color: 'black',
    },
    head: {
        fontSize: 10,
        color: 'grey',
        fontWeight: 'bold',
        marginBottom: 3,
    },
});

export { styles };
