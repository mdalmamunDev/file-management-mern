import React, { createContext, useContext } from "react";
import moment from 'moment'

// Create context
const GlobalContext = createContext();

// Provider component
export const GlobalProvider = ({ children }) => {
    const APP_NAME = "MyMERNApp";
    const BASE_URL_B = "http://localhost:3000";
    
    const formatDate = (date) => {
        return new Date(date).toISOString().split("T")[0];
    };

    const urlGenerate = (url = false, urlSuffix = false) => {
        return `${BASE_URL_B}${url ? `/${url}` : ""}${urlSuffix ? `/${urlSuffix}` : ""}`;
    };

    const timeAgo = (timestamp) => {
        return moment(timestamp).fromNow(true); // Returns without "ago"
      };

    return (
        <GlobalContext.Provider value={{ APP_NAME, urlGenerate, formatDate, timeAgo }}>
            {children}
        </GlobalContext.Provider>
    );
};

// Custom hook to use context
export const useGlobal = () => useContext(GlobalContext);
