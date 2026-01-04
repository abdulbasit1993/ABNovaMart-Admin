import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { RootState } from "../../redux/store";

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    return isAuthenticated ? children : <Navigate to="/" />;
}

export default ProtectedRoute