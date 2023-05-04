import React from "react";
import { Link } from "react-router-dom";


export default function DeleteButton({btnName, btnLink}) {
    return (
        
        <Link to={btnLink} className="btn btn-light" style={{backgroundColor:"#4945b7", color:"#fff"}}> {btnName}</Link>
        
        )
}
