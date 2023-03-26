import React from 'react'
import styled from 'styled-components'
import InfoModal from './InfoModal';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export default function AutoButton({useAuto, setUseAuto}){
    return (
        <>
          <Row>
            <Col>
              <Buttons>
                <label className="custom-example">
                  <input
                    id="toggle-check"
                    type="checkbox"
                    checked={useAuto}
                    onChange={() => {
                      setUseAuto(!useAuto);
                    }}
                  />
                  {useAuto ? "Disable Auto Replace": "Enable Auto replace"}
                </label>
                <InfoModal/>
              </Buttons>
            </Col>
          </Row>
        </>
      )
  }
  
  const Buttons = styled.div`
      display: inline;
      position: relative;
      display: flex;
      justify-content: space-between;
  
      input {
          display: none;
      }
  
      .custom-example {
          height: 34px;
          background-color: #0F803C;
          color: white;
          border-radius: 10px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          margin-bottom: 1rem;
      }

      label {
          width: 100%;
          margin-right: 1rem;
      }
  `
  