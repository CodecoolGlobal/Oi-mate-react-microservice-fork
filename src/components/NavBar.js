import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { UserSession } from "../context/UserSession";
import Logo from "../images/logo.png";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import { Tooltip } from "@material-ui/core";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import NotificationList from "./NotificationList";
import SearchByHobby from "./SearchByHobby";
import SearchByUsername from "./SearchByUserName";
import DrawerToggleButton from "./DrawerToggleButton";

const NavDiv = styled.div`
  .navBar {
    background-color: #333;
    display: flex;
    flex-direction: row;
    flex:1;
    justify-content:space-between;
    min-height:80px;
  }
  .navigator-items{
    display: flex;
    align-items:center;
    flex-direction:row;
  }
 
  .logo{
  display:flex;
  position:relative;
   flex: 0.3;
   max-width:100%;
   max-height:100%;
   min-width:80px;
  }
  .logoLink{
    width:100%;
    padding:0;
    height:100%;
  }
  .logo img{
    max-width:100%;
    max-height:100%;
  }
  .navigator-items .link{
    font-size: 20px;
    float: left;
    color: #f50057;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    justify-content: flex-end;
    flex: 0.3;
  }
  .search {
    display: flex;
    // justify-content:center;
     position:relative;
         flex: 0.3;
     align-self:center;
    margin-left: 30px;
    flex-shrink:2;
    flex-direction: row;
  }
  @media (max-width:925px ){
    .search{
        display:none;
    }
  }
  .logoLink {
    // flex-grow: 2;
  }
`;

const NavBar = () => {
  const [session, setSession] = useContext(UserSession)[0];
  const username = useContext(UserSession)[1];
  let content = "";

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
      <div className="navBar">
          <div className="logo">
              <Link to="/" className="link logoLink">
                  <img  alt="" src={Logo} />
              </Link>
          </div>
          <div className="navigator-items">

              <Link className="link" to="/login">
                  Login
              </Link>
              <Link className="link" to="/registration">
                  Registration
              </Link>
          </div>
      </div>
    );
  } else {
    content = (
      <div className="navBar">
          <div className="logo">
              <Link to="/" className="link logoLink">
                  <img  alt="" src={Logo} />
              </Link>
          </div>
        <div className="search">
          <SearchByHobby />
          <SearchByUsername />
        </div>
          <div className="navigator-items">
              <div className="user">

                  <Link className="link" to={`/user/${session}`}>
                      {username}
                  </Link>
              </div>
              <div className="news-by-friends">
                <Link className="link" to="/friend-news">
                    <Tooltip title="News by friends">
                        <PeopleAltIcon color="secondary" fontSize="large"></PeopleAltIcon>
                    </Tooltip>
                </Link>
              </div>
              <div className="notification">
                  <Tooltip title="Notifications">
                      <NotificationList />
                  </Tooltip>

              </div>
              <div className="logout">

                  <Link className="link" to={""} onClick={logOut}>
                      <Tooltip title="Logout">
                          <PowerSettingsNewIcon color="secondary" fontSize="large" />
                      </Tooltip>
                  </Link>
              </div>

          </div>
          <DrawerToggleButton className="valami" />
      </div>
    );
  }

  return <NavDiv>{content}</NavDiv>;
};

export default NavBar;
