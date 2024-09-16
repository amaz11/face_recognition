import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Navigate } from 'react-router-dom';

const AdminAuthHOC = ({ children }: { children: React.ReactNode }) => {
    const { token, loading } = useContext(AuthContext)
    if (loading) {
        // Optionally, return a loading spinner or placeholder while loading
        return <div>Loading...</div>;
    }
    if (token === undefined || token.length < 10) {
        return <Navigate to={"/login"} replace />;
    }
    return children;
}

export const ISLogin = ({ children }: { children: React.ReactNode }) => {
    const { token } = useContext(AuthContext)
    if (token.length > 10) {
        return <Navigate to={"/"} replace />;

    }
    return children;

}

export default AdminAuthHOC