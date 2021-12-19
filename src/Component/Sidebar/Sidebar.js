import React from "react";
import { FaInbox, FaCalendarAlt, FaCalendar } from 'react-icons/fa';
import './Sidebar-module.css';

const Sidebar = (props) => {

    const { tabSelector, setTabSelector } = props;
    return (
        <div className="sidebar">
            <div onClick={()=>setTabSelector("Inbox")} 
            className={ tabSelector === "Inbox" ? "active" : ""}  >
                <FaInbox className="icon" />
                Inbox
            </div>
            <div onClick={()=> setTabSelector("Today")} 
            className={ tabSelector === "Today" ? "active" : ""} >
                <FaCalendarAlt className="icon" />
                Today
            </div>
            <div onClick={()=> setTabSelector("Next_7")} 
            className={ tabSelector === "Next_7" ? "active" : ""} >
                <FaCalendar className="icon" />
                Next 7 Days
            </div>
        </div>
    )
}

export default Sidebar;