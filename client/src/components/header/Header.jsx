import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { LiaCoinsSolid, LiaFileContractSolid } from "react-icons/lia";
import { LuFileText } from "react-icons/lu";
import styled from "styled-components";
import LoginUser from "components/client/LoginUser";


const Header = () => {
  const [isActive, setIsActive] = useState("");
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    setIsActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Wrapper>
      <TopWrapper>
        <TopHeadder>
          <h3>ALPHA CAPITAL</h3>
          <LoginUser />
        </TopHeadder>
      </TopWrapper>
      <NavBar>
        <ListItem
          style={{
            backgroundColor:
              isActive === "dashboard" ? "#656281" : "transparent",
          }}
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          <RxDashboard />
          <span>Dashboard</span>
        </ListItem>
        <ListItem
          style={{
            backgroundColor:
              isActive === "buy" ? "#656281" : "transparent",
          }}
          onClick={() => {
            navigate("/buy");
          }}
        >
          <IoBagHandleOutline />
          <span>Buy Shares</span>
        </ListItem>
        <ListItem
          style={{
            backgroundColor:
              isActive === "sell" ? "#656281" : "transparent",
          }}
          onClick={() => {
            navigate("/sell");
          }}
        >
          <LiaCoinsSolid />
          <span>Sell Shares</span>
        </ListItem>
        <ListItem
          style={{
            backgroundColor:
              isActive === "contract-note" ? "#656281" : "transparent",
          }}
          onClick={() => {
            navigate("/contract-note");
          }}
        >
          <LiaFileContractSolid />
          <span>Contract Notes</span>
        </ListItem>
        <ListItem
          style={{
            backgroundColor:
              isActive === "statement" ? "#656281" : "transparent",
          }}
          onClick={() => {
            navigate("/statement");
          }}
        >
          <LuFileText />
          <span>Statement</span>
        </ListItem>
        <Spacer />
      </NavBar>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: #201e50;
`;
const TopHeadder = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1300px;
  margin: 0 auto;
  color: hsl(205 50% 60%);
  padding: 10px 0;
`;

const Client = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  height: 42px;
  width: 42px;
  border-radius: 50%;
`;

const NavBar = styled.div`
  display: flex;
  max-width: 1300px;
  margin: 0 auto;
  background-color: transparent;
  padding: 10px;
  color: #f5f5f5;
`;

const ListItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 4px;
  &:hover {
    background-color: red;
    color: hsl(205 50% 90%);
  }
`;

const TopWrapper = styled.div`
  background-color: transparent;
  border-bottom: 0.05px solid hsl(205 50% 75%);
`;
const Spacer = styled.div`
  width: 10%;
`;
export default Header;
