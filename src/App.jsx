import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Topbar from "./components/Topbar/TopBar";
import SidebarMenu from "./components/Sidebar/SidebarMenu";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DroneView from "./Pages/Drones/DroneView";
import ControllerView from "./Pages/Controller/ControllerView";
import { DroneProvider } from "./Contexts/DroneContext";

function App() {

    return (
        <DroneProvider>
            <Router>
                <div className="d-flex flex-column h-100">
                    <Topbar/>
                    <div className="flex-grow-1 d-flex">
                        <SidebarMenu/>
                        <div className="flex-grow-1">
                            <Routes>
                                <Route path="/" element={<DroneView/>}/>
                                <Route path="/controller" element={<ControllerView/>}/>
                            </Routes>
                        </div>
                    </div>
                </div>
            </Router>
        </DroneProvider>
    );
}

export default App;
