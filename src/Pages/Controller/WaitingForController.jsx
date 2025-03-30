import React from "react";
import { Spinner } from "react-bootstrap";

const WaitingForController = () => {
    return (
        <div className="d-flex justify-content-center align-items-center flex-column text-white gap-2">
            <Spinner animation="border"></Spinner>
            <span>Waiting for controller connection</span>
        </div>
    );
}

export default WaitingForController;
