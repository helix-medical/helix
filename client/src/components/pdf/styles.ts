import { StyleSheet } from '@react-pdf/renderer';

const PDFStyles = StyleSheet.create({
    viewer: {
        width: '100%',
        height: 720,
    },
    page: {
        backgroundColor: 'white',
        color: 'black',
        fontSize: 14,
        fontFamily: 'Helvetica',
    },
});

export { PDFStyles };
