import { useState } from "react";
import { useAuth } from "../provider/AuthProvider";
import styled from "styled-components";
import { Formik, Form, ErrorMessage, Field } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { loginAction } = useAuth();
  const navigate = useNavigate();

  return (
    <Wrapper>
      <FormWrapper>
        <FormContainer>
          <img
            src="../../alpha.png"
            alt="alpha logo"
            width={150}
            height={150}
            style={{ margin: "0 auto" }}
          />
          <h1 style={{ textAlign: "center" }}>Alpha Capital</h1>
          <Formik
            initialValues={{ email: "", password: "" }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = "Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }
              if (!values.password) {
                errors.password = "Required";
              } else if (values.password.length < 8) {
                errors.password = "Password must be at least 6 characters";
              }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              const result = await axios.post(
                "http://localhost:5001/api/v1/auth/otp",
                values
              );
              if (result.status === 200) {
                navigate("/otp", { state: { email: values.email } });
              }
              setSubmitting(false);
            }}
          >
            {({
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <Form
                // onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  width: "100%",
                  flexDirection: "column",
                  marginTop: "20px",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  // value={values.email}
                  // onChange={handleChange}
                  // onBlur={handleBlur}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    outline: "none",
                    fontSize: "16px",
                  }}
                />
                <ErrorMessage name="email" component="div" />
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  // value={values.password}
                  // onChange={handleChange}
                  // onBlur={handleBlur}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    outline: "none",
                    fontSize: "16px",
                  }}
                />
                <ErrorMessage name="password" component="div" />
                <p
                  style={{
                    color: "#007bff",
                    cursor: "pointer",
                    alignSelf: "flex-end",
                  }}
                >
                  Forgot Password?
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #007bff",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    borderRadius: "4px",
                    outline: "none",
                    fontSize: "16px",
                  }}
                >
                  {isSubmitting ? "Submitting..." : "Login"}
                </button>
              </Form>
            )}
          </Formik>
        </FormContainer>
      </FormWrapper>
    </Wrapper>
  );
};

const fieldStyles = {
  padding: "10px",
  borderRadius: "4px",
  width: "100%",
  height: "35px",
  border: "1px solid #ccc",
};

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  background-image: url("../../bg.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const FormWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: transparent;
`;

const FormContainer = styled.div`
  width: 35%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;

  border-radius: 4px;
  justify-content: center;
  height: 100%;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid hsl(0deg 0% 0%);
  background-color: hsl(243deg, 50%, 21%);
  color: hsl(250deg 50% 90%);
  height: 35px;
  padding: 10px;
  border-radius: 4px;
`;
const RememberMe = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;
const Help = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export default Login;
