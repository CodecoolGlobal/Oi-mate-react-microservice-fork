import React, { useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserSession } from "../context/UserSession";
import EditComment from "./EditComment";
import { Dropdown } from "react-bootstrap";
import MoreHorizontIcon from "@material-ui/icons/MoreHoriz";
import { commentBaseUrl } from "./urls/urls";

const AnswerDiv = styled.div`
  display: flex;
  flex-direction: row;
  background: #262626f7;
  border-radius: 10px;
  width: 100%;
  color: white;
  padding: 15px;
  margin-bottom: 5px;
  margin-top: 5px;
  font-size: 15px;
  position: relative;
  .img {
    width: 150px;
    height: 150px;
    border-radius: 5px;
  }
  .content {
    flex-direction: column;
    margin-left: 10px;
    display: flex;
    margin-top: -10px;
  }

  .footer {
    position: absolute;
    right: 0px;
    top: -3px;
  }
`;

const Answer = (props) => {
  const [answer, setAnswer] = useState(props.answer);
  const [deleted, setDeleted] = useState(false);
  const username = props.answer.user.username;
  const [showEditComment, setShowEditComment] = useState(false);
  const setRefresh = props.setRefresh;
  const userProfilePicture = props.answer.user.profilePicture;
  const session = useContext(UserSession)[0];
  let content = "";

  const deleteAnswer = (e) => {
    e.preventDefault();
    axios.get(`${commentBaseUrl}/${answer.id}/remove`);
    setAnswer(null);
    setDeleted(true);
  };

  if (!deleted) {
    content = (
      <AnswerDiv>
        <div className="commentHeader">
          <Link to={`/user/${session}`} className="linkToProfile">
            <div className="profile">
              <img src={userProfilePicture} alt="profilePicture" className="profilePicture" />
            </div>
          </Link>
        </div>
        <div className="content">
          <p className="userName">{username}</p>
          <p className="description">{answer.description}</p>
          {answer.imagePath !== "" ? <img src={answer.imagePath} alt="" className="img" /> : " "}
        </div>
        <div className="footer">
          {parseInt(session) === answer.user.id ? (
            <Dropdown>
              <Dropdown.Toggle id="dropdownBtn">
                <MoreHorizontIcon />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={deleteAnswer}>Delete</Dropdown.Item>
                <Dropdown.Item onClick={() => setShowEditComment(true)}>Edit</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            ""
          )}
          {showEditComment === true ? <EditComment id={answer.id} show={showEditComment} setShowModal={setShowEditComment.bind(this)} setRefresh={setRefresh.bind(this)} /> : ""}
        </div>
      </AnswerDiv>
    );
  } else content = "";

  return content;
};

export default Answer;
