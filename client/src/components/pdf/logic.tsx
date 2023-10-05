import moment from 'moment';
import setNotification from '../errors/feedback-notification';
import { useEffect, useState } from 'react';
import useApplicationRoutes from '../../api/routes';
import Facture from './facture';
import saveAs from 'file-saver';
import { pdf } from '@react-pdf/renderer';

const useViewPDF = (id: string, type: string) => {
    const routes = useApplicationRoutes();
    const [data, setData] = useState<any>();

    const title = type === 'facture' ? `Facture n°${data?.factureNumber}` : `Dossier Patient n°${id.toUpperCase()}`;

    const handleDownload = () => {
        if (type === 'facture') {
            pdf(<Facture data={data} id={id} />)
                .toBlob()
                .then((blob) =>
                    saveAs(blob, `${moment(data.date).format('YYYYMMDD')}-facture-${data.factureNumber}.pdf`)
                );
            setNotification(false, 'Facture téléchargée');
        }
    };

    useEffect(() => {
        const fetchFactureData = async () => {
            try {
                const res = await routes.accounting.getFacture(id);
                setData(res.data[0]);
                setData((prev: any) => ({
                    ...prev,
                    factureNumber:
                        moment(prev.date).format('YYYYMM') + '-' + prev.factureID.toString().padStart(3, '0'),
                }));
            } catch (error: any) {
                if (!error?.response) setNotification(true, 'Network error');
                else setNotification(true, `${error.message}: ${error.response.data.message}`);
            }
        };
        const fetchPatientData = async () => {
            try {
                const resPat = await routes.patients.getOne(id);
                setData(resPat.data[0]);
                const resApp = await routes.appointments.getByPatient(id);
                setData((prev: any) => ({ ...prev, appointments: resApp.data }));
                const resTra = await routes.accounting.getByPatient(id);
                setData((prev: any) => ({ ...prev, transactions: resTra.data }));
            } catch (error: any) {
                if (!error?.response) setNotification(true, 'Network error');
                else setNotification(true, `${error.message}: ${error.response.data.message}`);
            }
        };
        if (type === 'facture') fetchFactureData();
        else if (type === 'patient') fetchPatientData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return { data, handleDownload, title };
};

export { useViewPDF };
