import React, { useEffect, useState } from "react";
import styled from "styled-components";

function Security({ backgroundColor }) {
  const [securities, setSecurities] = useState(null);
  const [query, setQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:3000/api/securities", {
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      console.log(result);
      setSecurities(result);
    }
    fetchData();
  }, []);
  const searchedResults = securities?.filter((security) =>
    security.name.toLowerCase().includes(query)
  );

  console.log(searchedResults);

  const renderedSecurities = query === "" ? securities : searchedResults;
  return (
    <Wrapper>
      <Action style={{ "--background-color": backgroundColor }}>
        <TextInput
          type="text"
          value={query}
          placeholder="Searching..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button onClick={() => setIsModalOpen(true)}>Add Security</Button>
      </Action>
      <TableWrapper style={{ "--background-color": backgroundColor }}>
        <thead>
          <TableRowHeader>
            <TableHeader>Security</TableHeader>
            <TableHeader>Number</TableHeader>
            <TableHeader>Price</TableHeader>
          </TableRowHeader>
        </thead>
        <tbody>
          {searchedResults?.map((security) => (
            <tr>
              <td>{security.name}</td>
              <td>{security.number}</td>
              <td>{security.price}</td>
            </tr>
          ))}
        </tbody>
      </TableWrapper>
      {isModalOpen && (
        <Modal>
          <FormWrapper>
            <Label>
              <span>Security</span>
              <TextInput style={{ minWidth: "400px" }} placeholder="Name" />
            </Label>
            <Label>
              <span>Number</span>
              <TextInput style={{ minWidth: "400px" }} placeholder="Number" />
            </Label>
            <Label>
              <span>Prcie</span>
              <TextInput style={{ minWidth: "400px" }} placeholder="Price" />
            </Label>
          </FormWrapper>
        </Modal>
      )}
    </Wrapper>
  );
}
const Wrapper = styled.div`
  display: flex;
  flex: 1;
  gap: 30px;
  flex-direction: column;
`;

const Action = styled.div`
  display: flex;
  background-color: var(--background-color);
  padding: 10px 20px;
`;
const TextInput = styled.input`
  height: 32px;
  width: var(--width);
  background-color: inherit;
  border: 0.5px solid hsl(0deg 0% 70%);
  border-radius: 4px;
  margin-right: auto;
  color: inherit;
  padding: 10px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: hsl(0deg 0% 95%);
  height: 31px;
  border-radius: 4px;
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: hsl(0deg 0% 75%);
  }
`;

const TableWrapper = styled.table`
  background-color: var(--background-color);
  border-collapse: collapse;
  width: 100%;
`;

const TableRowHeader = styled.tr``;
const TableHeader = styled.th``;
const Modal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: hsla(0deg, 0%, 70%, 0.4);
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  padding: 30px;
  gap: 30px;
  background-color: hsl(0deg 0% 90%);
`;
const Label = styled.label`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 8px;
  color: hsl(0deg 0% 0%);
`;

export default Security;
