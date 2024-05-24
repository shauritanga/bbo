import React from "react";
import { RxChevronDown } from "react-icons/rx";
import styled from "styled-components";
import { getValue } from "utils/getDate";

const Select = ({ value, children, onChange, backgroundColor, width }) => {
  const displayValue = getValue(value, children);
  return (
    <Wrapper>
      <NativeSelect value={value} onChange={onChange}>
        {children}
      </NativeSelect>
      <Presentational
        style={{
          "--width": width + "px",
          "--background-color": backgroundColor,
        }}
      >
        {displayValue}
        <IconWrapper>
          <RxChevronDown />
        </IconWrapper>
      </Presentational>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: max-content;
  border: 1px solid hsl(205deg 50% 20%);
  border-radius: 7px;
`;

const NativeSelect = styled.select`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
`;

const Presentational = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: var(--width);
  background-color: var(--background-color);
  border-radius: 4px;
  padding: 12px 16px;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export default Select;
