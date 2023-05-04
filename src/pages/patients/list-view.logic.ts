import { useEffect, useState } from 'react';
import { IPatient } from '../../types/interfaces';
import { keys } from '@mantine/utils';

const useListView = (patients: any) => {
    const filterData = (data: IPatient[], search: string) => {
        const query = search.toLowerCase().trim();
        return data.filter((item) => keys(data[0]).some((key) => item[key].toLowerCase().includes(query)));
    };

    const sortData = (
        data: IPatient[],
        payload: { sortBy: keyof IPatient | null; reversed: boolean; search: string }
    ) => {
        const { sortBy } = payload;

        if (!sortBy) {
            return filterData(data, payload.search);
        }

        return filterData(
            [...data].sort((a, b) => {
                if (payload.reversed) {
                    return b[sortBy].localeCompare(a[sortBy]);
                }

                return a[sortBy].localeCompare(b[sortBy]);
            }),
            payload.search
        );
    };

    const [search, setSearch] = useState<string>('');
    const [sortedData, setSortedData] = useState(patients);
    const [sortBy, setSortBy] = useState<keyof IPatient | null>(null);
    const [reverseSortDirection, setReverseSortDirection] = useState(false);
    const [show, setShow] = useState(false);
    const [patient, setPatient] = useState<IPatient>({} as IPatient);
    const toggleModal = () => setShow(!show);

    useEffect(() => {
        setSortedData(sortData(patients, { sortBy, reversed: reverseSortDirection, search }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [patients]);

    const setSorting = (field: keyof IPatient) => {
        const reversed = field === sortBy ? !reverseSortDirection : false;
        setReverseSortDirection(reversed);
        setSortBy(field);
        setSortedData(sortData(patients, { sortBy: field, reversed, search }));
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        setSearch(value);
        setSortedData(sortData(patients, { sortBy, reversed: reverseSortDirection, search: value }));
    };

    return {
        sortedData,
        setSorting,
        handleSearchChange,
        search,
        show,
        toggleModal,
        setPatient,
        reverseSortDirection,
        patient,
        sortBy,
    };
};

export { useListView };
