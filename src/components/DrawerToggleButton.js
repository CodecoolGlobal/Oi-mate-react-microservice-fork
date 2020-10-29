import React, {useContext} from "react";
import {Dropdown} from "react-bootstrap";
import {Tooltip} from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Notification from "./Notification";
import SearchByHobby from "./SearchByHobby";
import SearchByUsername from "./SearchByUserName";
import {Link} from "react-router-dom";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import NotificationList from "./NotificationList";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import {UserSession} from "../context/UserSession";
import styled from "styled-components";


const DrawerToggleButtonDiv = styled.div`
@media (min-width: 925px) {
  
    display: none;
  
}
.burger-menu{
    display:flex;
    flex-direction:column;
    align-items:center;
    background:rgba(0,0,0,0.7);
    position:relative;
    z-index:100;    
}

.menu-item {
    padding:5px;
    margin:5px;
}
.burger-menu a {
    color:#f50057;
}


`;


const DrawerToggleButton = () => {
    const username = useContext(UserSession)[1];
    const [session, setSession] = useContext(UserSession)[0];

    let content;
    const logOut = () => {
        localStorage.setItem("session", null);
        localStorage.setItem("username", null);
        localStorage.setItem("hobbies", null);
        localStorage.removeItem("token");
        localStorage.setItem("session", null);
        setSession(localStorage.getItem("session"));
    };

    if (isNaN(session)) {
        content = (
            <Dropdown className="valami">
                <Dropdown.Toggle id="dropdownBtn">
                </Dropdown.Toggle>
                <button className="toggle-button"/>
                    <Dropdown.Menu className="burger-menu">
                        <Link className="link" to="/login">
                            Login
                        </Link>
                        <Link className="link" to="/registration">
                            Registration
                        </Link>
            </Dropdown.Menu>
            </Dropdown>
        );
    } else {
        content = (
            <Dropdown className="valami">
                <Dropdown.Toggle id="dropdownBtn">
                        <button className="toggle-button" >
                            <div className="toggle-button__line"></div>
                            <div className="toggle-button__line"></div>
                            <div className="toggle-button__line"></div>
                        </button>
                </Dropdown.Toggle>
                <Dropdown.Menu className="burger-menu">

                        <SearchByHobby/>
                        <SearchByUsername/>
                        <div className="menu-item">
                            <Link className="link" to={`/user/${session}`}>
                                {username}
                            </Link>
                        </div>
                    <div className="menu-item">
                        <Link className="link" to={""} onClick={logOut}>
                            {/*<Tooltip title="Logout">*/}
                            {/*    <PowerSettingsNewIcon color="secondary" fontSize="large"/>*/}
                            {/*</Tooltip>*/}
                            Logout
                        </Link>
                    </div>
                    {/*<Tooltip title="Notifications">*/}
                    {/*    <NotificationList/>*/}
                    {/*</Tooltip>*/}


                </Dropdown.Menu>
            </Dropdown>
        )
    }
    return <DrawerToggleButtonDiv>{content}</DrawerToggleButtonDiv>;
};
export default DrawerToggleButton;