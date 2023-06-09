// import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const initialValues = {
    title: "",
    postText: "",
    username: "",
  };
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("you must input a title"),
    postText: Yup.string().required(),
    username: Yup.string().min(3).max(15).required(),
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
          <label htmlFor="title">Title: </label>
          <ErrorMessage name="title" component="span" />
          <Field
            className="inputCreatePost"
            name="title"
            id="title"
            placeholder="(EX. Title...)"
          />
          <label htmlFor="postText">Post: </label>
          <ErrorMessage name="postText" component="span" />
          <Field
            className="inputCreatePost"
            name="postText"
            id="postText"
            placeholder="(EX. post...)"
          />
          <label htmlFor="username">username: </label>
          <ErrorMessage name="username" component="span" />
          <Field
            className="inputCreatePost"
            name="username"
            id="username"
            placeholder="(EX. John123...)"
          />
          <button type="submit">Create Post</button>
        </Form>
      </Formik>
    </div>
  );
};

export default CreatePost;
