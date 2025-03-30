import { invoke } from "@tauri-apps/api/core";
import React, { createContext, useContext, useEffect, useState } from "react";

const DroneContext = createContext();

export const DroneProvider = ({ children }) => {
    const [droneConnected, setDroneConnected] = useState(false);

    const checkDroneConnected = async () => {
        try {
            const isConnected = await invoke("is_drone_connected");
            setDroneConnected(isConnected);
        }
        catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        checkDroneConnected();
        const interval = setInterval(checkDroneConnected, 5000);
        return () => clearInterval(interval);
    }, []);
    
    return (
    <DroneContext.Provider value={{droneConnected}}>
        {children}
    </DroneContext.Provider>
    )
}

export const useDrone = () => useContext(DroneContext);
