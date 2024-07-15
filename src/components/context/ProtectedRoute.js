import React,{ useContext} from "react";
import { Context } from "./Context";


const ProtectedRoute = ({ children, role}) => {
    const { UserRole } = useContext(Context);

    if ( UserRole === role) {
        return children;
    } else {
        return (
            <h2>You have no access to this page</h2>
        )
    }
};

export default ProtectedRoute;