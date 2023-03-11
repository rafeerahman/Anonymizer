// Home page

import styled from "styled-components";
import MainNavbar from "./components/Navbars/MainNavbar.js";

function App() {
  return (
    <div>
      <MainNavbar/>
      <HomeStyled>

        <div className="content">
          <h1>Welcome to uoft-anonymize</h1>
          <p>uoft-anonymize is an open source API that enables automated data anonymization</p>
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
    }
    p {
      font-size: 20px;
    }
  }

`
export default App;
