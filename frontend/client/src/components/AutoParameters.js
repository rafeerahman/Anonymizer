import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Form, Button } from 'react-bootstrap';
import ParameterKeyValueItem from './ParameterKeyValueItem';

const AutoParameters = ({ autoReplaceTerms, setAutoReplaceTerms}) => {
    const [replaceName, setReplaceName] = useState("");
    const [locationSwitch, setLocationSwitch] = useState(false);
    const [replaceLocation, setReplaceLocation] = useState("");
    const [orgSwitch, setOrgSwitch] = useState(false);
    const [replaceOrg, setReplaceOrg] = useState("");
    let newReplaceTerms = {} //initialize new JS object we can update

    const handleSubmit = (e) => {
        newReplaceTerms = autoReplaceTerms; //set JS object to previous value of autoReplaceTerms
        e.preventDefault()
        //if the text boxes/state variables have content, append or replace in the newReplaceTerms object 
        if (replaceName !== "") {
            newReplaceTerms["names"] = replaceName;
            setReplaceName("")
        }
        if (replaceLocation !== "" && locationSwitch){
            newReplaceTerms["locations"] =  replaceLocation;
            setReplaceLocation("")
        }
        if (replaceOrg !== "" && orgSwitch){
            newReplaceTerms["org"] =  replaceOrg;
            setReplaceOrg("")
        }
        console.log(newReplaceTerms);
        //set state variable autoReplaceTerms based on newReplaceTerms object
        setAutoReplaceTerms(newReplaceTerms);
    }


    return (
        <AutoParametersStyled>
            <h3>Parameters</h3>
            <div className="mb-4">
                <h5>Replace</h5>
                <p></p>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <h6>Names</h6>
                        <Form.Control
                            type="text"
                            value={replaceName}
                            onChange={(e) => setReplaceName(e.target.value)}
                            placeholder="Enter replacement name"
                            className="mb-2"
                        />
                    </Form.Group>
                    <Form.Group>
                        <h6>Locations</h6>
                        <Form.Check 
                            type="switch"
                            id="name-switch"
                            label=""
                            defaultChecked={locationSwitch}
                            onChange={(e) => setLocationSwitch(!locationSwitch)}
                        />
                        {locationSwitch ?
                        <>
                            <Form.Control
                                type="text"
                                value={replaceLocation}
                                onChange={(e) => setReplaceLocation(e.target.value)}
                                placeholder="Enter replacement location"
                                className="mb-2"
                            />
                        </>
                        : <></>}
                    </Form.Group>
                    <Form.Group>
                        <h6>Organizations</h6>
                        <Form.Check 
                            type="switch"
                            id="name-switch"
                            label=""
                            defaultChecked={orgSwitch}
                            onChange={(e) => setOrgSwitch(!orgSwitch)}
                        />
                        {orgSwitch ?
                            <>
                            <Form.Control
                                type="text"
                                value={replaceOrg}
                                onChange={(e) => setReplaceOrg(e.target.value)}
                                placeholder="Enter replacement organization"
                                className="mb-2"
                            />
                            </>
                        : <></>}
                    </Form.Group>
                    <Button type="submit" className="float-end">Add</Button>
                </Form>

                <div className="mt-5">
                    {autoReplaceTerms.length !== 0 && Object.entries(autoReplaceTerms).map(([name, value]) => {
                        return <ParameterKeyValueItem
                            key={`${name}-${value}`}
                            name={name}
                            replacementName={value}
                            replaceTerms={autoReplaceTerms}
                            setReplaceTerms={setAutoReplaceTerms}
                        />
                    })}
                </div>
            </div>
        </AutoParametersStyled>
    )
}


const AutoParametersStyled = styled.div`
    height: 100%;
    background-color: #ECECF1;
    padding: 1rem;
    border-radius: 10px;
    border: 1px solid black;
    height: 100%;

    @media (max-width: 767px) {
        margin-top: 1rem;
    }

    h3 {
        font-weight: 700;
        margin-bottom: 1rem;
    }
    `

export default AutoParameters;