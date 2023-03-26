import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { Form } from 'react-bootstrap';
import AutoParameterItem from './AutoParameterItem';

const AutoParameters = ({ autoReplaceTerms, setAutoReplaceTerms }) => {
    const [replaceName, setReplaceName] = useState("");
    const [replaceLocation, setReplaceLocation] = useState("");
    const [replaceOrg, setReplaceOrg] = useState("");
    const [nameSwitch, setNameSwitch] = useState(false);
    const [locationSwitch, setLocationSwitch] = useState(false);
    const [orgSwitch, setOrgSwitch] = useState(false);
    const autoReplaceTermsResetRef = useRef({});
    
    useEffect(() => {
        // update autoReplaceTerms when any fields are updated
        let newTerms = {};
    
        if (nameSwitch) {
            newTerms["names"] = replaceName;
        }
        if (locationSwitch) {
            newTerms["locations"] = replaceLocation;
        }
        if (orgSwitch) {
            newTerms["org"] = replaceOrg;
        }
        setAutoReplaceTerms(newTerms);
    }, [replaceName, replaceLocation, replaceOrg, nameSwitch, locationSwitch, orgSwitch, setAutoReplaceTerms]);

    useEffect(() => {
        if (Object.keys(autoReplaceTerms).length === 0 && autoReplaceTermsResetRef.current !== autoReplaceTerms) {
            // clear button was pressed, reset all fields
            setReplaceName("");
            setReplaceLocation("");
            setReplaceOrg("");
            setNameSwitch(false);
            setLocationSwitch(false);
            setOrgSwitch(false);
        } else {
            autoReplaceTermsResetRef.current = autoReplaceTerms;
        }
    }, [autoReplaceTerms]);


    return (
        <AutoParametersStyled>
            <h3>Auto-Replace Parameters</h3>
            <div className="mb-4">
                <Form>
                    <Form.Group>
                        <Category>
                            <h6>Names</h6>
                            <Form.Check 
                                type="switch"
                                id="name-switch"
                                label=""
                                checked={nameSwitch}
                                onChange={() => setNameSwitch(!nameSwitch)}
                            />
                        </Category>
                        {nameSwitch ? 
                        <Form.Control
                            type="text"
                            value={replaceName}
                            onChange={(e) => setReplaceName(e.target.value)}
                            placeholder="Enter replacement name"
                            className="mb-2"
                        /> : <></>}
                    </Form.Group>
                    <Form.Group>
                        <Category>
                            <h6>Locations</h6>
                            <Form.Check 
                                type="switch"
                                id="location-switch"
                                label=""
                                checked={locationSwitch}
                                onChange={() => setLocationSwitch(!locationSwitch)}
                            />
                        </Category>

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
                        <Category>
                            <h6>Organizations</h6>
                            <Form.Check 
                                type="switch"
                                id="org-switch"
                                label=""
                                checked={orgSwitch}
                                onChange={() => setOrgSwitch(!orgSwitch)}
                            />
                        </Category>
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
                    {/* <Button type="submit" className="float-end">Add</Button> */}
                </Form>

                <div className="mt-5">
                    {autoReplaceTerms.length !== 0 && Object.entries(autoReplaceTerms).map(([name, value]) => {
                        return <AutoParameterItem
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

const Category = styled.div`
    display: flex;
    justify-content: space-between;
    `

export default AutoParameters;