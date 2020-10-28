import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import FormDiv from "../style/form";
import { UserSession } from "../context/UserSession";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { postBaseUrl } from "./urls/urls";

const EditPost = (props) => {
  const session = useContext(UserSession)[0][0];
  const id = props.id;
  const [description, setDescription] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const show = props.show;
  const setShow = props.setShowModal;
  const { register, handleSubmit, setValue } = useForm();

  let content = "";

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${postBaseUrl}/${id}/${session}`).then((res) => {
      setDescription(res.data.description);
      setImagePath(res.data.imagePath);
      setValue("description", description);
      setValue("imagePath", imagePath);
      setIsLoading(false);
    });
  }, [description, handleSubmit, id, imagePath, session, setValue]);

  const postData = (data) => {
    const question = {
      description: data.description,
      imagePath: data.imagePath,
    };
    return axios.post(`${postBaseUrl}/${id}/update`, question).then((res) => {
      setShow(false);
      props.history.push(`/question/${id}`);
    });
  };

  if (!isLoading) {
    content = (
      <Modal className="myModal" show={show} onHide={() => setShow(false)}>
        <FormDiv>
          <form onSubmit={handleSubmit(postData)}>
            <input name="description" ref={register} placeholder="Description..." />
            <input name="imagePath" ref={register} placeholder="ImagePath..." />
            <input type="submit" />
          </form>
        </FormDiv>
      </Modal>
    );
  } else content = "Loading...";
  return content;
};

export default EditPost;
