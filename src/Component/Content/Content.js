import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Task from "../Task/Task";
import './Content-module.css';

const Content = () => {
    const [tabSelector, setTabSelector] = useState("Inbox");
    return(
        <>
        <div className="content">
        <Sidebar tabSelector={tabSelector} setTabSelector={setTabSelector}/>
        <Task tabSelector={tabSelector} setTabSelector={setTabSelector}/>
        </div>
        </>
    )
}

export default Content;