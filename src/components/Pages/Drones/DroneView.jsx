import React, { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";

const DroneView = () => {
    const [droneConnected, setDroneConnected] = useState(false);
    const [availableDrones, setAvaiableDrones] = useState([]);

    useEffect(() => {
        const checkDroneConnection = async () => {
            try {
                const isConnected = await invoke("is_drone_connected");
                setDroneConnected(isConnected);

                if(!isConnected) {
                    const drones = await invoke("get_drones");
                    setAvaiableDrones(drones);
                }
            }
            catch (error) {
                console.error(error);
            }
        }
        checkDroneConnection();
    }, []);
    return (
        <div className="text-white p-2">
            {droneConnected ? (
                <div>ciao</div>
            ) : (
                    <div>
                        <h1>List of available drones</h1>
                        <ul>
                            {availableDrones.map((drone) => (
                                <li key={drone.id}>
                                    {drone.name} <button>Connect</button>
                                </li>
                            ))}
                        </ul>
                    </div>
            )}
        </div>
    );
}

export default DroneView;
