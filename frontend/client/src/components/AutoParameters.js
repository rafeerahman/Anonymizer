import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Form } from 'react-bootstrap';
import ParameterKeyValueItem from './ParameterKeyValueItem';

const AutoParameters = ({ autoReplaceTerms, setAutoReplaceTerms }) => {
    const [replaceName, setReplaceName] = useState("");
    const [replaceLocation, setReplaceLocation] = useState("");
    const [replaceOrg, setReplaceOrg] = useState("");
    const [nameSwitch, setNameSwitch] = useState(false);
    const [locationSwitch, setLocationSwitch] = useState(false);
    const [orgSwitch, setOrgSwitch] = useState(false);

    useEffect(() => {
        let newTerms = {}
        
        if (nameSwitch) {
            newTerms["names"] = replaceName
        }
        if (locationSwitch) {
            newTerms["locations"] = replaceLocation
        }
        if (orgSwitch) {
            newTerms["org"] = replaceOrg
        }
        
        setAutoReplaceTerms(newTerms)
    }, [replaceName, replaceLocation, replaceOrg, nameSwitch, locationSwitch, orgSwitch])


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
                                defaultChecked={nameSwitch}
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
                                defaultChecked={locationSwitch}
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
                                defaultChecked={orgSwitch}
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

const Category = styled.div`
    display: flex;
    justify-content: space-between;
    `

export default AutoParameters;