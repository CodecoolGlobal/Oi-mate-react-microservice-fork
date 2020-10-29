import React from "react";
import QuestionsList from "./QuestionsList";
import QuestionAndAnswer from "./QuestionAndAnswers";
import NavBar from "./NavBar";
import {useState} from "react";
import Login from "./Login";
import { Route } from "react-router-dom";
import Register from "./Registration";
import UserPage from "./UserPage";
import Settings from "./Settings";
import ProtectedRoute from "../helpers/Protected.route";
import AxiosConfig from "../AxiosConfig";
import { ChatHelperProvider } from "../context/ChatHelper";
import QuestionsBySearchResult from "./QuestionsBySearchResult";

function Main() {
    const [sideDrawerOpen, setsideDrawerOpen] = useState(false);



  return (
    <div className="Main" style={{height: '100%'}}>
      <NavBar/>
      <Route exact path="/login" component={Login} />
      <Route exact path="/registration" component={Register} />
      <ProtectedRoute exact path="/user/:id" component={UserPage} />
      <ProtectedRoute exact path="/settings" component={Settings} />
      <ChatHelperProvider>
        <ProtectedRoute exact path="/questionsBySearchResult" component={QuestionsBySearchResult} />
        <ProtectedRoute exact path="/question/:id" component={QuestionAndAnswer} />
        <ProtectedRoute exact path={["/", "/hobby-news", "/friend-news"]} component={QuestionsList} />
      </ChatHelperProvider>
    </div>
  );
}

export default Main;
