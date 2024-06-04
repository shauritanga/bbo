import { useState } from "react";
import { useAuth } from "../provider/AuthProvider";
import styled from "styled-components";

const Login = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const [show, setShow] = useState(false);

  const auth = useAuth();
  const handleSubmitEvent = (e) => {
    e.preventDefault();
    if (input.username !== "" && input.password !== "") {
      auth.loginAction(input);
      return;
    }
    alert("pleae provide a valid input");
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <Wrapper>
      <Banner>
        <img src="../../large.png" style={{ width: "50%", margin: "auto" }} />
      </Banner>
      <FormWrapper>
        <Form onSubmit={handleSubmitEvent}>
          <TextInput
            type="email"
            name="username"
            id="email"
            placeholder="Email"
            onChange={handleInput}
          />
          <TextInput
            type={show ? "text" : "password"}
            name="password"
            id="password"
            placeholder="Password"
            onChange={handleInput}
          />
          <Help>
            <RememberMe>
              <input type="checkbox" name="remember" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </RememberMe>
            <a href="">Forgot password?</a>
          </Help>
          <Button type="submit">Sign in</Button>
        </Form>
      </FormWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  background-color: hsl(0deg 0% 0%);
`;

const Banner = styled.div`
  flex: 7;
  display: flex;
  background-color: hsl(0deg 0% 97%);
`;

const FormWrapper = styled.div`
  flex: 3;
  hesight: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: hsl(0deg 0% 100%);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 80%;
  margin: 50px auto;
`;
const TextInput = styled.input`
  border: 1px solid hsl(0deg 0% 90%);
  height: 35px;
  padding: 10px;
  background-color: inherit;
  border-radius: 4px;
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
