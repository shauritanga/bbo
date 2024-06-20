import axios from "axios";
import SignUp from "components/signup/SignUp";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import React,{useState} from "react";
import styled from "styled-components";


const Login = () => {
  const [active, setActive] = useState("login");
  const navigate = useNavigate();

  return (
    <Wrapper>
      <FormWrapper>
        <img src="../../alpha.png" width={100} height={100} />
        <h4>ALPHA CAPITAL</h4>
        <p></p>
        {active === "login" ? (
          <Formik
            initialValues={{ email: "", password: "" }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = "Required";
              } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
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
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  width: "300px",
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
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
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
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
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
                <p
                  style={{ color: "#007bff", cursor: "pointer" }}
                  onClick={() => setActive("register")}
                >
                  Register with us
                </p>
              </Form>
            )}
          </Formik>
        ) : <SignUp />}
      </FormWrapper>
      <Banner></Banner>
    </Wrapper>
  );
};

const fieldStyle = {
  width: "100%",
  padding: "9px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  outline: "none",
  fontSize: "14px",
};
const errorStyle = {
  color: "red",
  fontSize: "12px",
  marginTop: "5px",
};

const Wrapper = styled.div`
  display: flex;
  height:100vh;
  background-image:url("../../bg.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const Banner = styled.div`
  position:relative;
  width:60%;
  height:100vh;
  display: flex;
  flex-direction: column;
`;

const FormWrapper = styled.div`
  width:40%
  height:100vh;
  margin:auto;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FormControl = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 10px;
`;

export default Login;
