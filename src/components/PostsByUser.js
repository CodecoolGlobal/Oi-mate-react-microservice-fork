import React, { useEffect, useState } from "react";
import axios from "axios";
import Question from "./Question";
import { postBaseUrl } from "./urls/urls";

function PostsByUser(props) {
  const id = props.id;
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let content = "";

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${postBaseUrl}/posts-by-userId/${id}`).then((res) => {
      setQuestions(res.data);
      setIsLoading(false);
    });
  }, [id]);

  if (!isLoading) {
    console.log(props);
    content = (
      <div>
        {questions.map((question) => (
          <Question key={question.id} question={question} history={props.history} />
        ))}
      </div>
    );
  } else content = "Loading...";

  return content;
}

export default PostsByUser;
