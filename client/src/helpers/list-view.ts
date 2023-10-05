// import { IPatient } from '../../types/interfaces';
import { keys } from '@mantine/utils';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useListView = <T>(patients: T[]) => {
    const filterData = (data: T[], search: string) => {
        const query = search.toLowerCase().trim();
        return data.filter((item) =>
            // eslint-disable-next-line array-callback-return
            keys(data[0]).some((key) => {
                if (typeof item[key] === 'string') return (item[key] as string).toLowerCase().includes(query);
            })
        );
    };

    const sortData = (data: T[], payload: { sortBy: keyof T | null; reversed: boolean; search: string }) => {
        const { sortBy } = payload;

        if (!sortBy) {
            return filterData(data, payload.search);
        }

        return filterData(
            [...data].sort((a, b) => {
                if (payload.reversed) {
                    return (b[sortBy] as string).localeCompare(a[sortBy] as string);
                }

                return (a[sortBy] as string).localeCompare(b[sortBy] as string);
            }),
            payload.search
        );
    };

    const [search, setSearch] = useState<string>('');
    const [sortedData, setSortedData] = useState<T[]>(patients);
    const [sortBy, setSortBy] = useState<keyof T | null>(null);
    const [reverseSortDirection, setReverseSortDirection] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setSortedData(sortData(patients, { sortBy, reversed: reverseSortDirection, search }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [patients]);

    const setSorting = (field: keyof T) => {
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
        reverseSortDirection,
        sortBy,
        navigate,
    };
};

export { useListView };
