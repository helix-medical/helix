import { View, Text } from '@react-pdf/renderer';
import React from 'react';
import cnf from '../../config/config';
import { styles } from './header.style';

interface IProps {
    data: {
        practitionerName: string;
        practitionerLastName: string;
    };
    osteo?: boolean;
}

const HeaderPDF = ({ data, osteo }: IProps) => (
    <View style={styles.header}>
        <View style={styles.cabinet}>
            <Text style={styles.head}>CABINET</Text>
            <Text>{cnf.cabinet.name}</Text>
            <Text>{cnf.cabinet.address}</Text>
            <Text>{cnf.cabinet.city}</Text>
            <Text>{cnf.cabinet.website}</Text>
        </View>
        {osteo ? (
            <View style={styles.osteo}>
                <Text style={styles.head}>OSTÉOPATHE</Text>
                <Text>
                    {data.practitionerName} {data.practitionerLastName}
                </Text>
                <Text>{cnf.cabinet.email}</Text>
                <Text>{cnf.cabinet.phone}</Text>
            </View>
        ) : null}
    </View>
);

export default HeaderPDF;
