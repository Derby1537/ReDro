import React, { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { Button, Spinner } from "react-bootstrap";
import magGlass from "../../assets/mag_glass.svg";
import './droneView.css';

const DroneView = () => {
    const [droneConnected, setDroneConnected] = useState(false);
    const [availableDrones, setAvaiableDrones] = useState([]);
    const [loading, setLoading] = useState(false);

    const checkDroneConnection = async () => {
        try {
            setLoading(true);
            const isConnected = await invoke("is_drone_connected");
            setDroneConnected(isConnected);

            if(isConnected) {
                setLoading(false);
                return;
            }

            if(!isConnected) {
                const drones = await invoke("get_drones");
                setLoading(false);
                console.log(drones);
                setAvaiableDrones(drones);
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        checkDroneConnection();
    }, []);
    return (
        <div className="text-white p-2">
            {droneConnected ? (
                <div>ciao</div>
            ) : (
                    <div>
                        <div className="d-flex justify-content-between">
                            <h1>List of available drones</h1>
                            {!loading ? (
                                <Button 
                                    className="search-button" 
                                    onClick={() => checkDroneConnection()} 
                                >
                                    <img src={magGlass} alt="magGlass" width={"25"}/>
                                </Button>
                            ):(
                                    <Button className="search-button" disabled>
                                        <Spinner animation="border" size="sm"></Spinner>
                                    </Button>
                            )} 
                        </div>
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
