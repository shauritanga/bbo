import React from "react";
import styled from "styled-components";
import { MdOutlineSell } from "react-icons/md";

const Card = ({ icon, title, subtitle, quantity }) => {
  return (
    <Wrapper>
      <DetailsWrapper>
        <Title>{title}</Title>
        <Quantity>{quantity}</Quantity>
        <Typography>{subtitle}</Typography>
      </DetailsWrapper>
      <IconWrapper>{icon}</IconWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-radius: 5px;
  flex: 1 0 250px;
  min-width: 250px;
  background-color: hsl(205 50% 15%);
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 4px;
  background-color: hsl(205deg 50% 18%);
`;
const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Title = styled.p`
  font-size: 1.2rem;
`;

const Quantity = styled.span`
  font-size: 1.5rem;
  color: hsl(205deg 20% 70%);
`;

const Typography = styled.p`
  font-size: 0.89rem;
  color: hsl(205deg 20% 60%);
`;
export default Card;
