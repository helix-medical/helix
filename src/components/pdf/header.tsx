import { View, Text, StyleSheet } from '@react-pdf/renderer';
import React from 'react';

const styles = StyleSheet.create({
    cabinet: {
        fontSize: 12,
        marginTop: 20,
        textAlign: 'left',
        color: 'black',
        marginLeft: 20,
    },
    osteo: {
        fontSize: 12,
        marginTop: 20,
        textAlign: 'right',
        color: 'black',
        marginRight: 20,
    },
    head: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
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
        <View style={styles.head}>
            <View style={styles.cabinet}>
                <Text>Cabinet d'Ostéopathie Grande Place</Text>
                <Text>1 rue de la Grande Place</Text>
                <Text>Adresse à rajouter</Text>
            </View>
            <View style={styles.osteo}>
                <Text>
                    {data.doctorName} {data.doctorLastName}
                </Text>
                <Text>IMPLEMENT TEL</Text>
                <Text>IMPLEMENT MAIL</Text>
            </View>
        </View>
    );
};

export default HeaderPDF;
