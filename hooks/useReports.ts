import useSWR from 'swr';

import { fetcher } from '../utils/fetcher';

export const useReports = () => {
    const { data, error, mutate, isValidating } = useSWR('/api/reports', fetcher);

    return {
        reports: data,
        error,
        mutate,
        isValidating
    };
};
