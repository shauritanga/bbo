import React, { useEffect, useState } from "react";
import { Modal } from "rsuite";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import styled from "styled-components";

const CreateEmployeeForm = ({ open, setOpen }) => {
  const [roles, setRoles] = useState([]);
  useEffect(() => {
    const fetchRoles = async () => {
      const response = await axios.get("http://localhost:5001/api/roles");
      setRoles(response.data);
      console.log(response.data);
    };
    fetchRoles();
  }, []);

  if (roles.length === 0) {
    return null;
  }
  return (
    <Modal backdrop="static" open={open} onClose={() => setOpen(false)}>
      <Modal.Header>
        <Modal.Title>Create Employee</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            name: "",
            email: "",
            phone: "",
            role: "",
            status: "",
          }}
          onSubmit={async (values, { setSubmitting }) => {
            await axios.post("http://localhost:5001/api/employees", values);
            setSubmitting(false);
          }}
        >
          {() => (
            <Form
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="name">Full Name</label>
                <Field
                  style={{
                    width: "100%",
                    border: "0.5px solid #ccc",
                    borderRadius: "3px",
                    padding: "8px",
                  }}
                  id="name"
                  name="name"
                  placeholder="Name"
                />
                <ErrorMessage name="name" component="div" />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="email">Email Address</label>
                <Field
                  style={{
                    width: "100%",
                    border: "0.5px solid #ccc",
                    borderRadius: "3px",
                    padding: "8px",
                  }}
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Email"
                />
                <ErrorMessage name="email" component="div" />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="phone">Phone Number</label>
                <Field
                  style={{
                    width: "100%",
                    border: "0.5px solid #ccc",
                    borderRadius: "3px",
                    padding: "8px",
                  }}
                  id="phone"
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                />
                <ErrorMessage name="phone" component="div" />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="role">Role</label>
                <Field
                  as="select"
                  name="role"
                  style={{
                    width: "100%",
                    border: "0.5px solid #ccc",
                    borderRadius: "3px",
                    padding: "8px",
                  }}
                >
                  <option value="" disabled>
                    Select a role
                  </option>
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </Field>

                <ErrorMessage name="role" component="div" />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="role">Status</label>
                <Field
                  as="select"
                  name="status"
                  style={{
                    width: "100%",
                    border: "0.5px solid #ccc",
                    borderRadius: "3px",
                    padding: "8px",
                  }}
                >
                  <option value="" disabled>
                    Select a status
                  </option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </Field>

                <ErrorMessage name="status" component="div" />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "10px",
                }}
              >
                <Button type="submit">Create</Button>
                <CancelButton type="button" onClick={() => setOpen(false)}>
                  Cancel
                </CancelButton>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};
const Button = styled.button`
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
`;

const CancelButton = styled(Button)`
  background-color: transparent;
  border: 1px solid #4caf50;
  color: #4caf50;
`;

export default CreateEmployeeForm;
