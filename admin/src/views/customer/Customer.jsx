import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { LiaFileContractSolid } from "react-icons/lia";
import { SlUser } from "react-icons/sl";
import styled from "styled-components";
import Account from "../../components/account/Account";
import Contract from "../../components/contract/Contract";
import Statement from "../../components/statement/Statement";
import { GrShieldSecurity } from "react-icons/gr";
import { FaRegFileLines } from "react-icons/fa6";
import Security from "../../components/security/Security";
import SelectionModal from "../../components/modals/statement/SelectionModal";

const CustomerView = () => {
  const [isActive, setIsActive] = useState("account");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const customer = location.state;

  const content = () => {
    switch (isActive) {
      case "account":
        return <Account customer={customer} />;
        break;
      case "contract":
        return <Contract />;
        break;
      case "statement":
        return <Statement />;
        break;
      case "security":
        return <Security />;
        break;
    }
  };
  return (
    <Wrapper>
      <Main>
        <Links>
          <ListItem
            style={
              isActive === "account"
                ? { backgroundColor: "hsl(243deg, 50%, 21%)", color: "#fff" }
                : {}
            }
            onClick={() => setIsActive("account")}
          >
            <SlUser />
            Account
          </ListItem>
          <ListItem
            style={
              isActive === "contract"
                ? { backgroundColor: "hsl(243deg, 50%, 21%)", color: "#fff" }
                : {}
            }
            onClick={() => setIsActive("contract")}
          >
            <LiaFileContractSolid />
            Contract Note
          </ListItem>
          <ListItem
            style={
              isActive === "statement"
                ? { backgroundColor: "hsl(243deg, 50%, 21%)", color: "#fff" }
                : {}
            }
            onClick={() => setIsActive("statement")}
          >
            <FaRegFileLines />
            Statement
          </ListItem>
          <ListItem
            style={
              isActive === "security"
                ? { backgroundColor: "hsl(243deg, 50%, 21%)", color: "#fff" }
                : {}
            }
            onClick={() => setIsActive("security")}
          >
            <GrShieldSecurity />
            Security
          </ListItem>
        </Links>
        {content()}
      </Main>
      <Portfolio>
        <CustomerInfo>
          <Avatar></Avatar>
          <Table>
            <tbody>
              <TableDataRow>
                <TableRowCell colSpan={2}>Customer Portfolio</TableRowCell>
              </TableDataRow>
              <TableDataRow>
                <TableRowCell colSpan={2}>Athanas Shauritanga</TableRowCell>
              </TableDataRow>
              <TableDataRow>
                <TableRowCell>CDS</TableRowCell>
                <TableRowCell>647482</TableRowCell>
              </TableDataRow>
              <TableDataRow>
                <TableRowCell>Shares</TableRowCell>
                <TableRowCell>56</TableRowCell>
              </TableDataRow>
              <TableDataRow>
                <TableRowCell>Status</TableRowCell>
                <TableRowCell>active</TableRowCell>
              </TableDataRow>
            </tbody>
          </Table>
        </CustomerInfo>
        <Actions>
          <Button>Set Pending</Button>
          <Button>Send Activation Email</Button>
          <Button onClick={() => setIsModalOpen(true)}>
            Print Statement (PDF)
          </Button>
        </Actions>
      </Portfolio>
      {isModalOpen && <SelectionModal />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  gap: 20px;
`;

const Main = styled.div`
  flex: 5;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const Links = styled.div`
  display: flex;
  gap: 30px;
`;

const ListItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  border-radius: 7px;
  gap: 12px;
`;

const Portfolio = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const CustomerInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 20px;
  background-color: var(--color-white);
  justify-content: center;
`;
const Avatar = styled.div`
  height: 72px;
  width: 72px;
  border-radius: 50%;
  background-color: red;
`;
const Actions = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: var(--color-white);
  gap: 10px;
`;
const Button = styled.button`
  height: 32px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;
const TableDataRow = styled.tr``;
const TableRowCell = styled.td`
  text-align: center;
  border: 0.2px solid hsl(0deg 20% 10%);
`;
export default CustomerView;
