import Select from 'components/select/Select';
import React, { useEffect, useState } from 'react'
import { Button, Modal, Notification, toaster } from 'rsuite';
import { addOrder } from 'reducers/orderSlice';
import { useDispatch } from 'react-redux';
import { useAuth } from 'provider/AuthProvider';
import styled from 'styled-components';
import { calculateFees } from 'utils/commission';

const OrderForm = ({ open, setOpen, size, title }) => {
    const [security, setSecurity] = useState([]);
    const [holding, setHolding] = useState("");
    const [client, setClient] = useState("");
    const [volume, setVolume] = useState(0);
    const [price, setPrice] = useState(0);
    const [type, setType] = useState("");
    const [action, setAction] = useState("");
    const { user} = useAuth();
    const dispatch = useDispatch();
    const userObject = JSON.parse(user);

  
    useEffect(() => {
      fetch("http://localhost:5001/api/securities")
        .then((response) => response.json())
        .then((data) => setSecurity(data))
        .catch((error) => console.log(error));
    }, []);
  
    if (!security) {
      return;
    }
  
  
    const handleFormSubmit = () => {
      const { _id: securityId } = security.find((s) => s.name === holding) || {};
      const postData = {
        customer: userObject._id,
        security: securityId,
        volume,
        price,
        amount,
        type:"buy",
        total:totalConsideration,
        balance: volume,
      };
      dispatch(addOrder(postData));
      setOpen(false);
    
    };
  
    //calculated values
    
    const amount = parseInt(volume)* parseInt(price);
    const {totalCharges, totalConsideration} = calculateFees(amount);

    // const fees = amount * 0.023;
    // const total = amount + fees;
  
    return (
      <Modal
        backdrop="static"
        open={open}
        onClose={() => setOpen(false)}
        size={size}
      >
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ width: "100%" }}>
          <Form>
            <FormRow>
                <FormGroup>
                <label htmlFor="customer">Security</label>
                  <Select
                    width={340}
                    value={holding}
                    onChange={(event) => setHolding(event.target.value)}
                  >
                    <option value="" disabled>
                      Select Security
                    </option>
                    {Array.isArray(security) &&
                      security.map((item) => (
                        <option key={item._id} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                  </Select>
                </FormGroup>
              <FormGroup>
                <label htmlFor="volume">Volume</label>
                <TextInput
                  id="volume"
                  type="number"
                  onChange={(event) => setVolume(event.target.value)}
                />
              </FormGroup>
            </FormRow>
            <FormRow>
              <FormGroup>
                <label htmlFor="price">Price</label>
                <TextInput
                  id="price"
                  type="number"
                  onChange={(event) => setPrice(event.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="amount">Amount(TZS)</label>
                <TextInput id="amount" type="number" value={totalConsideration} />
              </FormGroup>
            </FormRow>
            <FormRow>
              <FormGroup>
                <label htmlFor="action">Action</label>
                <TextArea></TextArea>
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
  width: 100%;
  flex-direction: column;
  gap: 8px;
`;
const TextInput = styled.input`
  width: 340px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 7px;
  font-size: 16px;
  outline: none;
`;
const TextArea = styled.textarea`
    width:100%;
    height:80px;
    padding:10px;
    border:1px solid #ccc;
    border-radius:7px;
    font-size:16px;
    resize:none;
    outline:none;
`;



export default OrderForm;