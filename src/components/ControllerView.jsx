import React, { useEffect, useState } from "react";
import controller from "../assets/controller.png";
import './../components/controller.css';
import { listen } from "@tauri-apps/api/event";

const ControllerView = () => {
    const [pressedButtons, setPressedButtons] = useState([]);

    useEffect(() => {
        const unlistenPressed = listen("button_pressed", (event) => {
            console.log("Pulsante rilasciato: ", event.payload);
            setPressedButtons((prev) => [...prev, event.payload]);
        });

        const unlistenReleased = listen("button_released", (event) => {
            console.log("Pulsante rilasciato: ", event.payload);
            setPressedButtons((prev) => prev.filter((btn) => btn !== event.payload));
        })

        return () => {
            unlistenPressed.then((unsub) => unsub());
            unlistenReleased.then((unsub) => unsub());
        }
    }, [])

    return (
        <div className="d-flex justify-content-center align-items-center flex-column text-white">
            <div className="w-100 h-75 position-relative">
                <img src={controller} className="w-100" alt="controller"/ >

                <div id="south-button" className="button face-button" style={{ display: pressedButtons.includes("South") ? "block":"none" }}></div>
                <div id="north-button" className="button face-button"style={{ display: pressedButtons.includes("North") ? "block":"none" }}></div>
                <div id="west-button" className="button face-button"style={{ display: pressedButtons.includes("West") ? "block":"none" }}></div>
                <div id="east-button" className="button face-button"style={{ display: pressedButtons.includes("East") ? "block":"none" }}></div>

                <div id="south-d-pad" className="button d-pad-button"style={{ display: pressedButtons.includes("DPadDown") ? "block":"none" }}></div>
                <div id="north-d-pad" className="button d-pad-button"style={{ display: pressedButtons.includes("DPadUp") ? "block":"none" }}></div>
                <div id="west-d-pad" className="button d-pad-button"style={{ display: pressedButtons.includes("DPadLeft") ? "block":"none" }}></div>
                <div id="east-d-pad" className="button d-pad-button"style={{ display: pressedButtons.includes("DPadRight") ? "block":"none" }}></div>

                <div id="left-shoulder" className="button shoulder-button"style={{ display: pressedButtons.includes("LeftTrigger") ? "block":"none" }}></div>
                <div id="right-shoulder" className="button shoulder-button"style={{ display: pressedButtons.includes("RightTrigger") ? "block":"none" }}></div>

                <div id="start-button" className="button front-button"style={{ display: pressedButtons.includes("Start") ? "block":"none" }}></div>
                <div id="select-button" className="button front-button"style={{ display: pressedButtons.includes("Select") ? "block":"none" }}></div>

                <div id="left-stick" className="button stick"style={{ display: pressedButtons.includes("LeftThumb") ? "block":"none" }}></div>
                <div id="right-stick" className="button stick"style={{ display: pressedButtons.includes("RightThumb") ? "block":"none" }}></div>

            </div>
            Controller collegato
        </div>
    );
}

export default ControllerView;
