import { View, Text, StyleSheet } from '@react-pdf/renderer';
import React from 'react';
import cnf from '../../config/config';

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

interface IProps {
    data: {
        doctorName: string;
        doctorLastName: string;
    };
}

const HeaderPDF = ({ data }: IProps) => {
    return (
        <View style={styles.header}>
            <View style={styles.cabinet}>
                <Text style={styles.head}>CABINET</Text>
                <Text>{cnf.cabinet.name}</Text>
                <Text>{cnf.cabinet.address}</Text>
                <Text>{cnf.cabinet.city}</Text>
                <Text>{cnf.cabinet.website}</Text>
            </View>
            <View style={styles.osteo}>
                <Text style={styles.head}>OSTÉOPATHE</Text>
                <Text>
                    {data.doctorName} {data.doctorLastName}
                </Text>
                <Text>{cnf.cabinet.email}</Text>
                <Text>{cnf.cabinet.phone}</Text>
            </View>
        </View>
    );
};

export default HeaderPDF;
