import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Registration = () => {
  const initialValues = {
    userName: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    userName: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(4).max(20).required(),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/auth", data).then(() => {
      console.log(data);
    });
  };
  return (
    <div className="registrationPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label htmlFor="userNameReg">Username: </label>
          <ErrorMessage name="userName" component="span" />
          <Field
            autoComplete="off"
            className="inputCreatePost"
            name="userName"
            id="userNameReg"
            placeholder="(EX. John123...)"
          />
          <label htmlFor="passwordReg">Password: </label>
          <ErrorMessage name="password" component="span" />
          <Field
            type="password"
            autoComplete="off"
            className="inputCreatePost"
            name="password"
            id="passwordReg"
            placeholder="Your password..."
          />
          <button type="submit">Register</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Registration;
