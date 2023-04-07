// Home page

import styled from "styled-components";
import MainNavbar from "./components/Navbars/MainNavbar.js";
import { useNavigate } from "react-router-dom";
import TitleContext from "./contexts/TitleContext.js";
import { useContext } from "react";

function App() {
  const { title } = useContext(TitleContext)
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/playground");
  };

  return (
    <div>
      <MainNavbar/>
      <HomeStyled>

        <div className="content">
          <h1>Welcome to {title}</h1>
          <p>{title} is an open source API that enables automated data anonymization</p>
          <button className="tryNow" onClick={handleClick}>Try it out</button>
        </div>
      </HomeStyled>
    </div>
  );
}

const HomeStyled = styled.div`
  display:flex; 
  justify-content:center;
  align-items:center;
  height:90vh;
  
  .content {
    text-align: center;
    width: 50%;
    h1 {
      font-weight: 600;
      font-size: 2.5rem;
    }
    p {
      font-size: 2rem;
    }
  }

  .tryNow {
    background-color: #5436DA;
    color: white;
    height: 50px;
    width: 125px;
    border: none;
    font-weight: 600;
    margin-top: 1rem;
    transition: background-color 0.3s;
    border-radius: 10px;
  }

  .tryNow:hover {
      background-color: #442CB1;
  }

`
export default App;
