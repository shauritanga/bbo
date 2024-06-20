import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useAuth } from "../../provider/AuthProvider";
import axios from "axios";

const Otp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state;
  const { loginAction } = useAuth();

  return (
    <div>
      <p>One time password sent to {email}</p>
      <Formik
        initialValues={{ otp: "", email }}
        onSubmit={async (values, { setSubmitting }) => {
          const result = await axios.post(
            "http://localhost:5001/api/v1/auth/verify-otp",
            values
          );
          if (result.status === 200) {
            loginAction(result.data.email);
          }
          setSubmitting(false);
        }}
      >
        {({ values, errors, touched, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Field type="text" name="otp" />
            <ErrorMessage name="otp" />
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Otp;
