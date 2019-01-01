import React from 'react'
import styled from 'styled-components' 
import { useNavigate } from 'react-router-dom'

const Start = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
        <Left>
            <img src='../../public/alpha.png' alt='alpha' width={200} height={200}/>
            <p style={{textAlign:"center"}}>Hi <br/>Welcome to <br/>ALPHA CAPITAL brokerage</p>
            <div style={{display:"flex", gap:"200px"}}>
              <div>
                <span>Locate us</span>
              </div>
              <div>
                <span>Contact us</span>
              </div>
            </div>
          <button style={{
            marginTop:"24px",
            padding:"10px",
            width:"250px",
            border:"none",
            borderRadius:"5px",
            cursor:"pointer"
            }}

            onClick={() => navigate("/login")}
            >
              Get Started
            </button>
        </Left>
        <Right>b</Right>
    </Wrapper>
  )
}


const Wrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: red;
`

const Left = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  flex: 1;
  height: 100vh;
  background-color: blue;
`

const Right = styled.div`
  flex: 1;
  height: 100vh;
  background-color: green;
`


export default Start