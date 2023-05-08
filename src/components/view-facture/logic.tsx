import moment from 'moment';
import setNotification from '../errors/feedback-notification';
import { useEffect, useState } from 'react';
import useApplicationRoutes from '../../api/routes';
import Facture from '../pdf/facture';
import saveAs from 'file-saver';
import { pdf } from '@react-pdf/renderer';

const useViewFacture = (id: string) => {
    const routes = useApplicationRoutes();
    const [data, setData] = useState<any>();

    const handleDownload = () => {
        pdf(<Facture data={{ ...data, factureNumber }} id={id} />)
            .toBlob()
            .then((blob) => saveAs(blob, `${moment(data.date).format('YYYYMMDD')}-facture-${factureNumber}.pdf`));
        setNotification(false, 'Facture téléchargée');
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await routes.accounting.getFacture(id);
                setData(res.data[0]);
            } catch (error: any) {
                if (!error?.response) setNotification(true, 'Network error');
                else setNotification(true, `${error.message}: ${error.response.data.message}`);
            }
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const factureNumber = data && moment(data.date).format('YYYYMM') + '-' + data.factureID.toString().padStart(3, '0');

    return { data, factureNumber, handleDownload };
};

export { useViewFacture };
