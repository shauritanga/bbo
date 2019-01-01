import React from 'react'
import { Formik, Form, Field, ErrorMessage} from 'formik';
import styled from 'styled-components';
import axios from 'axios';



const SignUp = () => {
  return (
    <Formik initialValues={{ 
        name: "", 
        email: "", 
        dob: "", 
        phone: "", 
        password: "", 
        identity: "",
        identity_no: "",
        terms:""
        }}

        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = "Required";
          } else if (values.name.length < 3) {
            errors.name = "Name must be at least 3 characters";
          } else if (values.name.length > 20) {
            errors.name = "Name must be less than 20 characters";
          }
          if (!values.email) {
            errors.email = "Required";
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
            errors.email = "Invalid email address";
          }

          if (!values.dob) {
            errors.dob = "Required";
          } else if (!/^\d{4}-\d{2}-\d{2}$/.test(values.dob)) {
            errors.dob = "Invalid date format";
          }

          if (!values.phone) {
            errors.phone = "Required";
          } else if (!/^[+0-9]{3}\d{10}$/.test(values.phone)) {
            errors.phone = "Invalid phone number";
          }
          if(!values.identity){
            errors.identity = "Required";
          } 
          if(!values.identity_no){
            errors.identity_no = "Required";
          } else if(values.identity_no.length < 10){
            errors.identity_no = "ID number must be at least 10 characters";
          } else if(values.identity_no.length > 20){
            errors.identity_no = "ID number must be at least 10 characters";
          }

          if(!values.password){
            errors.password = "Required";
          } else if(values.password.length < 8){
            errors.password = "Password must be at least 8 characters";
          }
          return errors;

        }}
        onSubmit={async(values, { setSubmitting }) => {
         await axios.post("http://localhost:5001/api/v1/auth/signup/clients", values);
         alert("SignUp Successful");
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
              marginTop: "20px",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <FormControl>
              <Field
                type="text"
                name="name"
                style={
                  fieldStyle
                }
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Your Name"
              />
              <ErrorMessage name="name" component="div" style={errorStyle} />
            </FormControl>
            <FormControl>
            <Field 
              style={fieldStyle} 
              type="email" 
              name="email" 
              onBlur={handleBlur} 
              onChange={handleChange} 
              value={values.email}
              placeholder="Email Address"

               />
            <ErrorMessage name="email" component="div" style={errorStyle}  />
            </FormControl>
            <FormControl>
            <Field
              type="tel"
              name="phone"
              placeholder="+255629593331"
              style={fieldStyle}
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <ErrorMessage name="phone" component="div" style={errorStyle}  />
            </FormControl>
            <FormControl>
            <Field
              type="date"
              name="dob"
              placeholder="Date of Birth"
              value={values.dob}
              onChange={handleChange}
              onBlur={handleBlur}
              style={fieldStyle}
            />
            <ErrorMessage name="dob" component="div" style={errorStyle}  />
            </FormControl>
            <FormControl>
            <Field
              as="select"
              name="identity"
              style={
                fieldStyle
              }
              placeholder="Select ID Type"
              value={values.id}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="" disabled>
                Select ID Type
              </option>
              <option value="passport no">Passport No</option>
              <option value="national id">National ID</option>
              <option value="driving license">Driving License ID</option>
            </Field>
            <ErrorMessage name="id" component="div" style={errorStyle} />
            </FormControl>
            <FormControl>
            <Field 
            style={fieldStyle} 
            type="text" 
            name="identity_no" 
            onBlur={handleBlur} 
            onChange={handleChange} 
            value={values.identity_no} 
            placeholder="ID No" />
            <ErrorMessage name="identity_no" component="div" style={errorStyle} />
            </FormControl>
            <FormControl>
            <Field 
            style={fieldStyle} 
            type="password" 
            name="password" 
            onBlur={handleBlur} 
            onChange={handleChange} 
            value={values.password}
            placeholder="Password" />
            <ErrorMessage name="password" component="div" style={errorStyle} />
            </FormControl>
            <div>
              <Field type="checkbox" name="terms"/>
            </div>
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #007bff",
                backgroundColor: "#007bff",
                color: "#fff",
                borderRadius: "4px",
                outline: "none",
                fontSize: "16px",
                cursor: "pointer",
              }}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </Form>
        )}
      </Formik>
  )
}

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

  const FormControl = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 10px;
`;

export default SignUp