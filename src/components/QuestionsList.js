import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Question from "./Question";
import axios from "axios";
import { UserSession } from "../context/UserSession";
import PostModal from "./PostModal";
import SideNarBar from "./SideNavBar";
import { ChatHelperContext } from "../context/ChatHelper";
import Chat from "./Chat";
import { MessageContextProvider } from "../context/MessageContext";
import { postBaseUrl } from "./urls/urls";

const Container = styled.div`
.feed {
    flex-grow: 0.4;
  }
  .chatSide {
    flex: 0.2;
  }
  @media (max-width:960px ){
     .chatSide{
     flex:0;
     } 
     .feed{
     flex:1;}
    }
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  

`;

const QuestionsList = (props) => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showChat, setShowChat] = useContext(ChatHelperContext);
  const session = useContext(UserSession)[0][0];
  let content = "";

  useEffect(() => {
    setIsLoading(true);
    let url;
    if (props.match.path === "/" || props.match.path === "/hobby-news") {
      url = `${postBaseUrl}/hobby-news/${session}`;
    } else {
      url = `${postBaseUrl}/friend-news/${session}`;
    }
    console.log(url);
    axios.get(url).then((res) => {
      console.log(res.data);
      setQuestions(res.data);
      setIsLoading(false);
    });
  }, [props.match.path, session]);

  if (!isLoading) {
    content = (
      <Container className="col">
        <SideNarBar />
        <div className="feed">
          <PostModal className="postModal" isLoading={isLoading} session={session} history={props.history} />
          {questions.map((question) => (
            <Question key={question.postId} question={question} history={props.history} />
          ))}
        </div>
        <div className="chatSide">
          <MessageContextProvider>
            <Chat show={showChat} setShowChat={setShowChat.bind(this)} />
          </MessageContextProvider>
        </div>
      </Container>
    );
  } else content = "Loading";
  return content;
};

export default QuestionsList;
