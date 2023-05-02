import PatientsRoute from './patients';

const useRoutes = () => {
    const patients = PatientsRoute();
    return {
        patients,
    };
};

export default useRoutes;