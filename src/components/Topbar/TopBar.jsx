import React from "react";
import Logo from "../../assets/Logo.svg"
import "./topbar.css"

const Topbar = () => {
    return (
        <div className="top-bar">
            <img src={Logo} alt="Logo" width={50}/> ReDro
        </div>
    );
}

export default Topbar;
