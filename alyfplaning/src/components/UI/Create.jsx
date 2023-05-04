import React from "react";
import { Link } from "react-router-dom";


export default function CreateButton({clickFunction}) {
    return (
        
        <button className="btn btn-outline-success" onClick={clickFunction}>Terminer</button>
        
        )
}