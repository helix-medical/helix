import { Outlet } from 'react-router-dom';
import HeaderApp from '../../components/header';

const Layout = () => {
    return (
        <>
            <HeaderApp />
            <div className="body">
                <Outlet />
            </div>
        </>
    );
};

export default Layout;
