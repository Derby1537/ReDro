import React, { useEffect, useState } from "react";
import controller from "../../assets/controller.png";
import './controller.css';
import { listen } from "@tauri-apps/api/event";
import { invoke } from "@tauri-apps/api/core";
import ControllerLayout from "./ControllerLayout";
import WaitingForController from "./WaitingForController";

const ControllerView = () => {
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

    const [pressedButtons, setPressedButtons] = useState([]);
    const [axises, setAxises] = useState({
        LeftStickX : 0,
        LeftStickY : 0,
        RightStickX : 0,
        RightStickY : 0,
        LeftTrigger2 : 0,
        RightTrigger2 : 0,
    })

    useEffect(() => {
        const unlistenPressed = listen("button_pressed", (event) => {
            setPressedButtons((prev) => [...prev, event.payload]);
        });

        const unlistenReleased = listen("button_released", (event) => {
            setPressedButtons((prev) => prev.filter((btn) => btn !== event.payload));
        })

        const unlistenTrigger = listen("button_changed", (event) => {
            const payload = event.payload.split(' ');
            const button = payload[0], value = payload[1];

            setAxises((prev) => ({
                ...prev,
                [button]: value,
            }));
        });

        const unlistenAxis = listen("axis_changed", (event) => {
            const payload = event.payload.split(' ');
            const axis = payload[0], value = payload[1];

            setAxises((prev) => ({
                ...prev,
                [axis]: value,
            }));
        });


        return () => {
            unlistenPressed.then((unsub) => unsub());
            unlistenReleased.then((unsub) => unsub());
            unlistenTrigger.then((unsub) => unsub());
            unlistenAxis.then((unsub) => unsub());
        }
    }, [])

    return (
        <div className="w-100 h-100 d-flex">
            {controllerConnected ? (
                <div>
                    <ControllerLayout pressedButtons={pressedButtons} axis={axises}/>
                    <div className="text-light p-2">
                        <h1>Commands</h1>
                    </div>
                </div>
            ):(
                    <WaitingForController/>
            )}
        </div>
    );
}

export default ControllerView;
