import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import WaitingForController from "./components/WaitingForController";
import 'bootstrap/dist/css/bootstrap.min.css';
import ControllerView from "./components/ControllerView";

function App() {
    const [controllerConnected, setControllerConnected] = useState("");

    const checkControllerState = async () => {
        try {
            const newState = await invoke("is_controller_connected");
            setControllerConnected(newState);
        }
        catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        checkControllerState();
        
        const interval = setInterval(() => {
            checkControllerState();
        }, 2000);

        return () => clearInterval(interval);
    }, []);


    return (
        <main className="d-flex justify-content-center align-items-center h-100">
            {controllerConnected ? (
                <ControllerView/>
            ) : (
                <WaitingForController/>
                )}
        </main>
    );
}

export default App;
