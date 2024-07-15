import React, { createContext, useState } from 'react'

const Context = createContext();

const Provider = ({ children }) => {
    const [userRole, setUserRole ] = useState(null);

    return (
        <Context.Provider value={ {userRole,setUserRole}}>
            { children }
        </Context.Provider>
    )
};

export { Context, Provider };