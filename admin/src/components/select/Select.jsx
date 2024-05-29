import React from "react";
import styled from "styled-components";
import { getChildren } from "../../utils/getChildren";
import { BiChevronDown } from "react-icons/bi";

const Select = ({ value, children, onChange, width, ...delegate }) => {
  const displayValue = getChildren(value, children);
  let appliedWidth = {};
  if (width) {
    appliedWidth = { width: width + "px" };
  } else {
    appliedWidth = { flex: 1 };
  }

  return (
    <Wrapper style={appliedWidth}>
      <NativeSelect {...delegate} value={value} onChange={onChange}>
        {children}
      </NativeSelect>
      <Presentational>
        {displayValue}
        <IconWrapper>
          <BiChevronDown />
        </IconWrapper>
      </Presentational>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
`;
const NativeSelect = styled.select`
  position: absolute;
  height: 100%;
  width: 100%;
  opacity: 0;
`;

const Presentational = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid grey;
  border-radius: 7px;
  color: grey;
  padding: 10px;
`;
const IconWrapper = styled.div``;
export default Select;
