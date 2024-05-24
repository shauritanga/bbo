import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { LiaCoinsSolid, LiaFileContractSolid } from "react-icons/lia";
import { LuFileText } from "react-icons/lu";
import styled from "styled-components";

const Header = () => {
  const [isActive, setIsActive] = useState("");
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    setIsActive(pathname.substring(1));
  }, [pathname]);

  console.log(isActive);
  return (
    <Wrapper>
      <TopWrapper>
        <TopHeadder>
          <h3>ALPHA CAPITAL</h3>
          <Client>AS</Client>
        </TopHeadder>
      </TopWrapper>
      <NavBar>
        <Spacer />
        <ListItem
          style={{
            backgroundColor:
              isActive === "dashboard" ? "hsl(205 50% 17%)" : "inherit",
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
              isActive === "buy" ? "hsl(205 50% 17%)" : "inherit",
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
              isActive === "sell" ? "hsl(205 50% 17%)" : "inherit",
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
              isActive === "contract-note" ? "hsl(205 50% 17%)" : "inherit",
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
              isActive === "statement" ? "hsl(205 50% 17%)" : "inherit",
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

const Wrapper = styled.div``;
const TopHeadder = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  margin: 0 auto;
  color: hsl(205 50% 60%);
  padding: 10px;
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
  background-color: hsl(205 50% 15%);
  padding: 10px;
  color: hsl(205 50% 60%);
`;

const ListItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 4px;
  &:hover {
    background-color: hsl(205 50% 17%);
    color: hsl(205 50% 90%);
  }
`;

const TopWrapper = styled.div`
  background-color: hsl(205 50% 15%);
  border-bottom: 0.05px solid hsl(205 50% 75%);
`;
const Spacer = styled.div`
  width: 10%;
`;
export default Header;
