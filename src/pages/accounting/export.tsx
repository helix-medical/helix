import React, { useEffect, useRef, useState } from 'react';
import { Button, Center, Modal, Text, TextInput, useMantineTheme } from '@mantine/core';
import { ITransactions } from '../../interfaces';
import { CSVLink } from 'react-csv';
import { SegmentedControl } from '@mantine/core';
import moment from 'moment';
import cnf from '../../config/config';
import setNotification from '../system/errors/feedback-notif';
import api from '../../config/api';

const header = ['Transaction ID', 'Date', 'Amount', 'Method', 'Patient'];

const ModalExport = ({ period, open, handler }: { period: string; open: boolean; handler: any }) => {
    const [view, setView] = useState(period === 'all' ? 'year' : period);
    const [transactions, setTransactions] = useState<ITransactions[]>([]);
    const [startDate, setStartDate] = useState('1998-12-17');
    const csvLink = useRef(null);
    const endDate = moment().format(cnf.formatDate);
    const theme = useMantineTheme();

    useEffect(() => {
        switch (view) {
            case 'week':
                setStartDate(moment().subtract(7, 'days').format(cnf.formatDate));
                break;
            case 'month':
                setStartDate(moment().subtract(1, 'months').format(cnf.formatDate));
                break;
            case 'semester':
                setStartDate(moment().subtract(6, 'months').format(cnf.formatDate));
                break;
            case 'year':
                setStartDate(moment().subtract(1, 'years').format(cnf.formatDate));
                break;
        }
    }, [view]);

    useEffect(() => {
        const fetchAllTransactions = async () => {
            try {
                const res = await api.get(`/accounting/${startDate}/${endDate}`);
                setTransactions(
                    res.data.map((transaction: ITransactions) => [
                        transaction.uid,
                        transaction.date,
                        transaction.amount,
                        transaction.method,
                        `${transaction.patientName} ${transaction.patientLastName}`,
                    ])
                );
            } catch (error: any) {
                if (!error?.response) setNotification(true, 'Network error');
                else setNotification(true, `${error.message}: ${error.response.data.message}`);
            }
        };
        fetchAllTransactions();
    }, [startDate, endDate]);

    const handleClick = () => {
        if (csvLink.current) {
            const node: any = csvLink.current;
            node.link.click();
        }
    };

    return (
        <Modal.Root opened={open} onClose={handler}>
            <Modal.Overlay
                color={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
                opacity={0.55}
                blur={3}
            />
            <Modal.Content>
                <Modal.Header>
                    <Modal.Title>
                        <Text fz="xl" fw={700}>
                            Export transactions
                        </Text>
                    </Modal.Title>
                    <Modal.CloseButton />
                </Modal.Header>
                <Modal.Body>
                    <Text fz="md" fw={700}>
                        Choose period to export:
                    </Text>
                    <SegmentedControl
                        data={[
                            { label: 'Week', value: 'week' },
                            { label: 'Month', value: 'month' },
                            { label: 'Semester', value: 'semester' },
                            { label: 'Year', value: 'year' },
                        ]}
                        value={view}
                        color="teal"
                        onChange={(value) => setView(value)}
                        fullWidth
                        mt="sm"
                    />
                    <TextInput
                        label="Start date"
                        readOnly
                        value={moment(startDate).format(cnf.formatDatePretty)}
                        mt="sm"
                    />
                    <TextInput label="End date" readOnly value={moment(endDate).format(cnf.formatDatePretty)} mt="sm" />
                    <CSVLink
                        data={transactions}
                        headers={header}
                        filename={`transactions-${view}.csv`}
                        ref={csvLink as any}
                        target="_blank"
                        style={{ display: 'none' }}
                    ></CSVLink>
                    <Center>
                        <Button mt="lg" color="teal" onClick={handleClick}>
                            Export
                        </Button>
                    </Center>
                </Modal.Body>
            </Modal.Content>
        </Modal.Root>
    );
};

const ExportAccounting = ({ period }: { period: string }): JSX.Element => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button color="teal" radius="sm" onClick={() => setOpen(!open)}>
                Export
            </Button>
            <ModalExport open={open} period={period} handler={() => setOpen(!open)} />
        </>
    );
};

export default ExportAccounting;
