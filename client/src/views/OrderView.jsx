import React, { useState } from "react";
import styled from "styled-components";

const OrderView = () => {
  const [active, setActive] = useState("details");
  return (
    <Wrapper>
      <p style={{marginBottom:"10px",fontSize:"16px",color:"#656281"}}>Order Details</p>
      <TableWrapper>
        <Header>
          <Button
            style={{
              backgroundColor: active === "details" ? "#201e50" : "transparent",
              color: active === "details" ? "white" : "",
              filter:
                active === "details"
                  ? "drop-shadow(0px 2px 8px rgba(74, 70, 132, 0.4))"
                  : "none",
            }}
            onClick={() => setActive("details")}
          >
            Details
          </Button>
          <Button
            style={{
              backgroundColor:
                active === "contract" ? "#201e50" : "transparent",
              color: active === "contract" ? "white" : "",

              filter:
                active === "contact"
                  ? "drop-shadow(0px 2px 8px rgba(74, 70, 132, 0.4))"
                  : "none",
            }}
            onClick={() => setActive("contract")}
          >
            Contract Note
          </Button>
        </Header>
        {active === "details" ? (
          <DetailsTable>
            <Table>
              <thead>
                <tr>
                  <TableHaeader colSpan={2}>contract notes</TableHaeader>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <TableData>TYPE</TableData>
                  <TableData>BUY</TableData>
                </tr>
                <tr>
                  <TableData>DATE</TableData>
                  <TableData>20-02-2024</TableData>
                </tr>
                <tr>
                  <TableData>VOLUME</TableData>
                  <TableData>100</TableData>
                </tr>
                <tr>
                  <TableData>PRICE</TableData>
                  <TableData>500</TableData>
                </tr>
                <tr>
                  <TableData>TOTAL</TableData>
                  <TableData>50,000</TableData>
                </tr>
                <tr>
                  <TableData>COMMISSION</TableData>
                  <TableData>{50000 * 0.02366}</TableData>
                </tr>
                <tr>
                  <TableData>PAYOUT</TableData>
                  <TableData>{50000+50000 * 0.02366}</TableData>
                </tr>
              </tbody>
            </Table>
          </DetailsTable>
        ) : (
          <ContactNoteTable>
            <Table>
              <thead>
                <tr>
                  <TableHaeader colSpan={6}>contract notes</TableHaeader>
                </tr>
                <tr>
                  <TableHaeader>date</TableHaeader>
                  <TableHaeader>slip no.</TableHaeader>
                  <TableHaeader>price</TableHaeader>
                  <TableHaeader>executed</TableHaeader>
                  <TableHaeader>amount</TableHaeader>
                  <TableHaeader>action</TableHaeader>
                </tr>
              </thead>
              <tbody>
               
              </tbody>
            </Table>
          </ContactNoteTable>
        )}
      </TableWrapper>
    </Wrapper>
  );
};
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;
const TableHaeader = styled.th`
  text-transform: uppercase;
  text-align: left;
  padding: 10px;
  border: 1px solid #ccc;
`;
const TableData = styled.td`
  text-transform: uppercase;
  text-align: left;
  padding: 10px;
  border: 1px solid #ccc;
`;
const Wrapper = styled.div`
  width: 1392px;
  margin: 0 auto;
`;
const TableWrapper = styled.div`
  width: 100%;
`;
const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;
const DetailsTable = styled.div`
  padding: 10px;
  background-color: #fff;
  width: 100%;
  border-radius: 5px;
  filter: drop-shadow(0px 2px 8px rgba(74, 70, 132, 0.4));
`;
const ContactNoteTable = styled.div`
  padding: 10px;
  background-color: #fff;
  width: 100%;
  border-radius: 5px;
  filter: drop-shadow(0px 2px 8px rgba(74, 70, 132, 0.4));
`;
const Button = styled.button`
  flex: 1;
  padding: 10px;
  background-color: transparent;
  border-radius: 7px;
  transition: all 0.3s ease-in-out;
  &:hover {
    color: #00b7ff;
  }
`;
export default OrderView;
