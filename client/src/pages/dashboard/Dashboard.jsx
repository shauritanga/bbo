import React, { useEffect } from "react";
import styled from "styled-components";
import { useAuth } from "provider/AuthProvider";
import { GoGraph } from "react-icons/go";
import { LiaCoinsSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";
import { FaInstagram, FaLinkedin, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { fetchOrders, setCounter, setSearchTerm } from "reducers/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import Select from "components/select/Select";

const Dashboard = () => {
  const { orders, status, error, filters } = useSelector(
    (state) => state.orders
  );
  const dispatch = useDispatch();
  const { user, token } = useAuth();
  const userObject = JSON.parse(user);

  useEffect(() => {
    dispatch(fetchOrders({ sort: "all", id: userObject._id }));
  }, [dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (status === "error") {
    return <div>Error: {error}</div>;
  }

  const filteredOrders = orders.slice(0, filters.counter).filter((order) => {
    const matchesQuery =
      !filters.searchTerm ||
      order.security?.name
        .toLowerCase()
        .includes(filters.searchTerm.toLowerCase());
    return matchesQuery;
  });

  const time = new Date().toLocaleTimeString("en-UK", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const moment = parseInt(time.split(":")[0]);
  const totalShare = orders.reduce(
    (prev, curr) => prev + parseInt(curr.volume),
    0
  );

  const newOrder = orders.filter(
    (order) => order.status.toLowerCase() === "new"
  ).length;

  const groupOrdersBySecurity = (orders) => {
    const grouped = {};
    orders.forEach((order) => {
      const securityName = order.security?.name; // Optional chaining for safety
      if (securityName) {
        if (!grouped[securityName]) {
          grouped[securityName] = { name: securityName, totalVolume: 0 };
        }
        grouped[securityName].totalVolume += parseInt(order.volume);
      }
    });
    return Object.values(grouped); // Convert object to array
  };
  const groupedData = groupOrdersBySecurity(orders);

  return (
    <Wrapper>
      <Statistic>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h4>Statistics</h4>
          <span>latest</span>
        </div>
        <div style={{ display: "flex", gap: "100px" }}>
          <Share
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                backgroundColor: "hsl(0, 0%, 90%)",
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <GoGraph color="#00b894" size={20} />
            </div>
            <div>
              <h4 style={{ lineHeight: 1.5, fontSize: "16px" }}>
                {totalShare}
              </h4>
              <p>Shares</p>
            </div>
            <Summary>
              <Table style={{ borderCollapse: "collapse" }}>
                <tbody>
                  {groupedData.map((group, index) => (
                    <tr key={index}>
                      <td style={{ border: "1px solid #ccc", color: "#333" }}>
                        {group.name}
                      </td>
                      <td style={{ border: "1px solid #ccc", color: "#333" }}>
                        {group.totalVolume}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Summary>
          </Share>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <div
              style={{
                backgroundColor: "hsl(0, 0%, 90%)",
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <LiaCoinsSolid color="#00b7ff" size={20} />
            </div>
            <div>
              <h4>{`6,789,900 TZS`}</h4>
              <p>Wallet</p>
            </div>
          </div>
        </div>
      </Statistic>
      <Status>
        <h4>
          {moment > 0 && moment < 12 && "Good Morning!"}
          {moment >= 12 && moment < 17 && "Good Afternoon!"}
          {moment >= 17 && moment < 21 && "Good Evening!"}
          {moment >= 21 && moment < 24 && "Good Night!"}
        </h4>
        <p>{userObject.name}</p>
        <p>
          Account Status: <span>{userObject.status}</span>
        </p>
      </Status>
      <Social>
        <p style={{ fontSize: "18px" }}>Our Social Media</p>
        <SocialItem>
          <div
            style={{
              height: "40px",
              width: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#ccc",
              borderRadius: "5px",
            }}
          >
            <FaWhatsapp color="#656281" size={20} />
          </div>
          <span style={{ color: "#656281", fontSize: "18px" }}>Whatsapp</span>
        </SocialItem>
        <SocialItem>
          <div
            style={{
              height: "40px",
              width: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#ccc",
              borderRadius: "5px",
            }}
          >
            <FaInstagram color="#656281" size={20} />
          </div>
          <span style={{ color: "#656281", fontSize: "18px" }}>Instagram</span>
        </SocialItem>
        <SocialItem>
          <div
            style={{
              height: "40px",
              width: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#ccc",
              borderRadius: "5px",
            }}
          >
            <FaTwitter color="#656281" size={20} />
          </div>
          <span style={{ color: "#656281", fontSize: "18px" }}>Twitter</span>
        </SocialItem>
        <SocialItem>
          <div
            style={{
              height: "40px",
              width: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#ccc",
              borderRadius: "5px",
            }}
          >
            <FaLinkedin color="#656281" size={20} />
          </div>

          <span style={{ color: "#656281", fontSize: "18px" }}>LinkedIn</span>
        </SocialItem>
      </Social>
      <Portfolio>
        <p>Portfolio</p>
      </Portfolio>
      <Orders>
        <Action>
          <Select
            value={filters.counter}
            width={80}
            onChange={(e) => dispatch(setCounter(e.target.value))}
            border={"ccc"}
          >
            <option value="10">10</option>
            <option value="20">25</option>
            <option value="25">50</option>
          </Select>
          <TextInput
            value={filters.searchTerm}
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            placeholder="Search"
          />
        </Action>
        <Table>
          <TableHead>
            <TableHeaderRow>
              <TableHeader>Date</TableHeader>
              <TableHeader>Security</TableHeader>
              <TableHeader>amount</TableHeader>
              <TableHeader>volume</TableHeader>
              <TableHeader>price</TableHeader>
              <TableHeader>Status</TableHeader>
            </TableHeaderRow>
          </TableHead>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableBodyRow key={order._id}>
                <TableData>{order.orderId}</TableData>
                <TableData>{order.security?.name}</TableData>
                <TableData>{order.total}</TableData>
                <TableData>{order.volume}</TableData>
                <TableData>{order.price}</TableData>
                <TableData>{order.status}</TableData>
              </TableBodyRow>
            ))}
          </TableBody>
        </Table>
      </Orders>
    </Wrapper>
  );
};

const Summary = styled.div`
  position: absolute;
  top: -60px;
  left: 50px;
  botoom: 10;
  display: none;
  width: 200px;
  height: fit-content;
  padding: 10px;
  background-color: #fff;
  filter: drop-shadow(0px 2px 5px rgba(18, 16, 45, 0.2));
`;

const Share = styled.div`
  &:hover div:last-of-type {
    display: block;
  }
`;

const Wrapper = styled.div`
  max-width: 1392px;
  margin: 0 auto;
  display: grid;
  gap: 30px;
  grid-template-columns: repeat(4, minmax(300px, 500px));
  grid-template-rows: repeat(4, 160px);
  color: #060610;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, minmax(250px, 400px));
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(200px, 300px));
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(5, 150px);
    margin: 10px;
  }
`;

const Statistic = styled.div`
  @media (max-width: 600px) {
    grid-column: 1/2;
  }
  background-color: #656281;
  color: #f5f5f5;
  grid-column: 2/5;
  border-radius: 5px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  filter: drop-shadow(0px 2px 5px rgba(18, 16, 45, 0.2));
`;
const Status = styled.div`
  @media (max-width: 600px) {
    grid-column: 1/2;
  }
  background-color: #f5f5f5;
  grid-column: 1/2;
  grid-row: 1/2;
  padding: 20px;
  border-radius: 5px;
  filter: drop-shadow(0px 2px 5px rgba(18, 16, 45, 0.2));
  p {
    margin-bottom: 10px;
    font-size: 20px;
  }
  p:last-child {
    margin-top: 20px;
    span {
      color: #00b894;
      font-weight: bold;
    }
  }

  h4 {
    color: #656281;
    font-size: 20px;
  }
`;
const Social = styled.div`
  @media (max-width: 600px) {
    grid-column: 1/2;
  }
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 20px;
  background-color: #f5f5f5;
  grid-column: 1/2;
  grid-row: 2/4;
  filter: drop-shadow(0px 2px 5px rgba(18, 16, 45, 0.2));
`;
const SocialItem = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  margin-bottom: 20px;
`;

const Portfolio = styled.div`
  @media (max-width: 600px) {
    grid-column: 1/2;
  }
  background-color: #f5f5f5;
  grid-column: 1/2;
  filter: drop-shadow(0px 2px 5px rgba(18, 16, 45, 0.2));
`;
const Orders = styled.div`
  @media (max-width: 600px) {
    grid-column: 1/2;
  }
  background-color: #f5f5f5;
  grid-column: 2/5;
  grid-row: 2/5;
  border-radius: 5px;
  filter: drop-shadow(0px 2px 8px rgba(74, 70, 132, 0.4));
`;

const Action = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 5px;
  margin: 10px;
`;
const TextInput = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #f5f5f5;
  outline: none;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;
const TableHead = styled.thead``;

const TableHeader = styled.th`
  padding: 10px;
  text-align: left;
  text-transform: uppercase;
  color: #555;
`;
const TableBody = styled.tbody``;
const TableHeaderRow = styled.tr`
  border: 1px solid #ccc;
`;
const TableBodyRow = styled.tr`
  border: 1px solid #ccc;
`;
const TableData = styled.td`
  padding: 10px;
  text-align: left;
  text-transform: uppercase;
  color: #555;
`;

export default Dashboard;
