import React from "react";
import { Link } from "react-router-dom";


export default function DeleteButton({clickFunction}) {
    return (
        
        <button className="btn btn-danger" onClick={clickFunction}>Supprimer</button>
        
        )
}