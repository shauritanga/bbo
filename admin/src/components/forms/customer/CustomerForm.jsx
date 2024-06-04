import { Button, Input, InputGroup, Modal } from "rsuite";
import styled from "styled-components";
import Select from "react-select";
import { countries } from "../../../utils/countries";
import React, { useState } from "react";
import EyeIcon from "@rsuite/icons/legacy/Eye";
import EyeSlashIcon from "@rsuite/icons/legacy/EyeSlash";

const CustomerForm = ({ open, setOpen, size, title }) => {
  const [country, setCountry] = useState({
    value: "Tanzania",
    label: "Tanzania",
  });
  const [category, setCategory] = useState({
    value: "Personal",
    label: "Personal",
  });
  const [idType, setIdType] = useState({
    value: "Passport",
    label: "Passport",
  });
  const [phoneNumber, setPhoneNumber] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [email, setEmail] = useState("");
  const [visible, setVisible] = React.useState(false);
  const [cdsAccount, setCdsAccount] = useState("");

  const handleFormSubmit = () => {
    const { _id: customerId } = customer.find((c) => c.name === client) || {};
    const { _id: securityId } = security.find((s) => s.name === holding) || {};
    const postData = {
      customer: customerId,
      security: securityId,
      type: action,
      volume,
      price,
      fees,
      amount,
      total,
    };
    fetch("http://localhost:5001/api/orders", {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .then((data) => setOpen(false))
      .catch((error) => console.log(error));
  };

  const customStyles = {
    control: (base) => ({
      ...base,
      height: 42,
      width: 340,
      minHeight: 35,
    }),
    menuPortal: (base) => ({
      ...base,
      zIndex: 9999,
    }),
  };

  //=============OPTION VALUES===========================
  const ids = [
    { value: "Passport", label: "Passport" },
    { value: "Driver's License", label: "Driver's License" },
    { value: "National ID", label: "National ID" },
    { value: "Voter's ID", label: "Voter's ID" },
    {
      value: "Certificate of Incorporation",
      label: "Certificate of Incorporation",
    },
  ];

  const categoryOptions = [
    { value: "Personal", label: "Personal" },
    { value: "Business", label: "Business" },
    { value: "Government", label: "Government" },
  ];

  //============= END OPTION VALUES===========================
  return (
    <Modal
      backdrop="static"
      open={open}
      setOpen={setOpen}
      size={size}
      onClose={() => setOpen(false)}
    >
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ width: "100%" }}>
        <Form>
          <FormRow>
            <FormGroup>
              <label htmlFor="cds">CDS Account</label>
              <TextInput
                id="cds"
                type="text"
                value={cdsAccount}
                placeholder="CDS Account Number"
                onChange={(e) => setCdsAccount(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="customer">Customer</label>
              <TextInput
                id="customer"
                type="text"
                placeholder="Customer Name"
              />
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <label htmlFor="bank">Bank Name</label>
              <TextInput id="bank" type="text" placeholder="Bank Name" />
            </FormGroup>
            <FormGroup>
              <label htmlFor="account">Account Number</label>
              <TextInput
                id="account"
                type="text"
                placeholder="Account Number"
              />
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <label htmlFor="category">Category</label>
              <Select
                className="basic-single"
                classNamePrefix="select"
                menuPortalTarget={document.body}
                menuPosition={"fixed"}
                isClearable={true}
                isSearchable={true}
                value={category}
                name="category"
                options={categoryOptions}
                styles={customStyles}
                onChange={(option) => {
                  setCategory(option);
                }}
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="countries">Country</label>
              <Select
                className="basic-single"
                classNamePrefix="select"
                menuPortalTarget={document.body}
                menuPosition={"fixed"}
                isClearable={true}
                isSearchable={true}
                value={country}
                name="country"
                options={countries}
                styles={customStyles}
                onChange={(option) => setCountry(option)}
              />
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <label htmlFor="phone">Phone</label>
              <TextInput
                id="phone"
                type="text"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="id">Select ID</label>
              <Select
                className="basic-single"
                classNamePrefix="select"
                menuPortalTarget={document.body}
                menuPosition={"fixed"}
                isClearable={true}
                isSearchable={true}
                value={idType}
                name="id"
                options={ids}
                styles={customStyles}
                onChange={(option) => {
                  setIdType(option);
                }}
              />
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <label htmlFor="idnumber">ID Number</label>
              <TextInput
                id="idnumber"
                type="text"
                placeholder="ID Number"
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="email">Email</label>
              <TextInput
                id="email"
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <label htmlFor="password">Password</label>
              <InputGroup inside style={{ width: "340px" }}>
                <Input type={visible ? "text" : "password"} id="password" />
                <InputGroup.Button onClick={() => setVisible(!visible)}>
                  {visible ? <EyeIcon /> : <EyeSlashIcon />}
                </InputGroup.Button>
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <label htmlFor="confirm">Confirm Password</label>
              <InputGroup inside style={{ width: "340px" }}>
                <Input type={visible ? "text" : "password"} id="confirm" />
                <InputGroup.Button onClick={() => setVisible(!visible)}>
                  {visible ? <EyeIcon /> : <EyeSlashIcon />}
                </InputGroup.Button>
              </InputGroup>
            </FormGroup>
          </FormRow>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            handleFormSubmit();
          }}
          appearance="primary"
        >
          Ok
        </Button>
        <Button
          onClick={() => {
            setOpen(false);
          }}
          appearance="subtle"
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const TextInput = styled.input`
  width: 340px;
  height: 42px;
  min-height: 35px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

export default CustomerForm;
