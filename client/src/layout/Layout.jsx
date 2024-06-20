import Header from "components/header/Header";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Navigate, Outlet } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "provider/AuthProvider";

const Layout = () => {
  const { user, token } = useAuth();
  if (!token && !user) {
    return <Navigate to="/start" />;
  }
  return (
    <Wrapper>
      <Header />
      <Outlet />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export default Layout;
