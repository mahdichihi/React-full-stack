// import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const initialValues = {
    title: "",
    postText: "",
    userName: "",
  };
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("you must input a title"),
    postText: Yup.string().required(),
    userName: Yup.string().min(3).max(15).required(),
  });
  const onSubmit = (data) => {
    axios.post("http://localhost:3001/posts", data).then((response) => {
      navigate("/");
    });
  };

  const navigate = useNavigate();

  return (
    <div className="createPostPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label htmlFor="inputCreatePost">Title: </label>
          <ErrorMessage name="title" component="span" />
          <Field
            id="inputCreatePost"
            name="title"
            placeholder="(EX. Title...)"
          />
          <label htmlFor="inputCreatePost">Post: </label>
          <ErrorMessage name="postText" component="span" />
          <Field
            id="inputCreatePost"
            name="postText"
            placeholder="(EX. post...)"
          />
          <label htmlFor="inputCreatePost">username: </label>
          <ErrorMessage name="userName" component="span" />
          <Field
            id="inputCreatePost"
            name="userName"
            placeholder="(EX. John123...)"
          />
          <button type="submit">Create Post</button>
        </Form>
      </Formik>
    </div>
  );
};

export default CreatePost;
