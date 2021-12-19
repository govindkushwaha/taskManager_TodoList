import React from "react";
import './Header-module.css';
import logo from '../../todo.png';
const Header = () =>{

    return(
        <>
        <div className="header">
            <div className="logo"> <img src={logo} alt="logo"></img></div>
        <h1> Task Manager</h1>
        </div>
       
        </>
    )
}

export default Header;