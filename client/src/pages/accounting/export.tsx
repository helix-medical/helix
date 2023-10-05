import { Button, Center, Modal, Text, TextInput } from '@mantine/core';
import { CSVLink } from 'react-csv';
import { SegmentedControl } from '@mantine/core';
import { useTransactionsExport } from './export.logic';
import cnf from '../../config/config';
import ModalOverlay from '../../components/modal-overlay';
import moment from 'moment';
import { useState } from 'react';

const header = ['Transaction ID', 'Date', 'Amount', 'Method', 'Patient'];

const ModalExport = ({ period, open, handler }: { period: string; open: boolean; handler: any }) => {
    const { view, setView, startDate, endDate, transactions, csvLink, handleExport } = useTransactionsExport(period);

    return (
        <Modal.Root opened={open} onClose={handler}>
            <Modal.Overlay {...ModalOverlay} />
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
                        <Button mt="lg" color="teal" onClick={handleExport}>
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
            {open ? <ModalExport open={open} period={period} handler={() => setOpen(!open)} /> : null}
        </>
    );
};

export default ExportAccounting;
