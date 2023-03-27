import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { Form } from 'react-bootstrap';
import AutoParameterItem from './AutoParameterItem';

const AutoParameters = ({ autoReplaceTerms, setAutoReplaceTerms }) => {
    // const [replaceName, setReplaceName] = useState(autoReplaceTerms.names ? autoReplaceTerms.names : "");
    // const [replaceLocation, setReplaceLocation] = useState(autoReplaceTerms.location ? autoReplaceTerms.location : "");
    // const [replaceOrg, setReplaceOrg] = useState(autoReplaceTerms.org ? autoReplaceTerms.org : "");
    // const [replacePhone, setReplacePhone] = useState(autoReplaceTerms.phone_number ? autoReplaceTerms.phone_number : "")
    // const [replacePostal, setReplacePostal] = useState(autoReplaceTerms.postal_code ? autoReplaceTerms.postal_code : "")
    // const [replaceCredit, setReplaceCredit] = useState(autoReplaceTerms.credit_card ? autoReplaceTerms.credit_card : "")
    // const [nameSwitch, setNameSwitch] = useState(autoReplaceTerms.names);
    // const [locationSwitch, setLocationSwitch] = useState(autoReplaceTerms.location);
    // const [orgSwitch, setOrgSwitch] = useState(autoReplaceTerms.org);
    // const [phoneSwitch, setPhoneSwitch] = useState(autoReplaceTerms.phone_number);
    // const [postalSwitch, setPostalSwitch] = useState(autoReplaceTerms.postal_code);
    // const [creditSwitch, setCreditSwitch] = useState(autoReplaceTerms.credit_card);
    const [switchDict, setSwitchDict] = useState({"names": autoReplaceTerms.names ? true : false, "location": autoReplaceTerms.location ? true : false, "org": autoReplaceTerms.org ? true : false, "phone_number": autoReplaceTerms.phone_number ? true : false, "postal_code": autoReplaceTerms.postal_code ? true : false, "credit_card": autoReplaceTerms.credit_card ? true : false})
    //, "postal_code": autoReplaceTerms.postal_code, "credit_card": autoReplaceTerms.credit_card})
    const [replaceDict, setReplaceDict] = useState({"names": autoReplaceTerms.names ? autoReplaceTerms.names : "", "location": autoReplaceTerms.location ? autoReplaceTerms.location : "", "org": autoReplaceTerms.org ? autoReplaceTerms.org : "", "phone_number": autoReplaceTerms.phone_number ? autoReplaceTerms.phone_number : "", "postal_code": autoReplaceTerms.postal_code ? autoReplaceTerms.postal_code : "", "credit_card": autoReplaceTerms.credit_card ? autoReplaceTerms.credit_card : ""})
    //, "postal_code": autoReplaceTerms.postal_code ? autoReplaceTerms.postal_code, "credit_card": autoReplaceTerms.credit_card ? autoReplaceTerms.credit_card : "")
    const autoReplaceTermsResetRef = useRef({});

    let nameDict = {"names":  "Names", "location": "Locations", "org": "Organizations", "phone_number": "Phone Numbers", "postal_code": "Postal Code", "credit_card": "Credit Card"}
    
    useEffect(() => {
        // update autoReplaceTerms when any fields are updated
        console.log("first true")
        let newTerms = {};
        // loop through keys of switchDict and set the values of newTerms according to value with same key in ReplaceDict
        Object.keys(switchDict).forEach(key => {
            if (switchDict[key]){
                newTerms[key] = replaceDict[key];
            }
        })
        setAutoReplaceTerms(newTerms);
    }, [replaceDict, switchDict, setAutoReplaceTerms]);

    // useEffect(() => {
    //     if (Object.keys(autoReplaceTerms).length === 0 && autoReplaceTermsResetRef.current !== autoReplaceTerms) {
    //         console.log("second true")
    //         // clear button was pressed, reset all fields
    //         setReplaceDict({"names": "", "location": "", "org": "", "phone_number": "", "postal_code": "", "credit_card": ""})
    //         setSwitchDict({"names": false, "location": false, "org": false, "phone_number": false, "postal_code": false, "credit_card": false})
    //     } else {
    //         autoReplaceTermsResetRef.current = autoReplaceTerms;
    //     }
    // }, [autoReplaceTerms]);

    return (
        <AutoParametersStyled>
            <h3>Auto-Replace Parameters</h3>
            <div className="mb-4">
                <Form>
                    {Object.keys(switchDict).map((replaceKey, i) => {
                        return(<Form.Group key={i}>  
                        {/* for each element in list, add unique key, value is the index of key in switchDict */}
                            <Category>
                                <h6>{nameDict[replaceKey]}</h6>
                                <Form.Check 
                                    type="switch"
                                    id="switch-1"
                                    label=""
                                    checked={switchDict[replaceKey]}
                                    onChange={() => setSwitchDict({...switchDict, [replaceKey]: !switchDict[replaceKey] })}
                                />
                            </Category>
                            {switchDict[replaceKey] ? 
                            <Form.Control
                                type="text"
                                value={replaceDict[replaceKey]}
                                onChange={(e) => setReplaceDict({...replaceDict, [replaceKey]: e.target.value })}
                                placeholder="Enter replacement"
                                className="mb-2"
                            /> : <></>}
                        </Form.Group>)
                     })
                    }
                    {/* <Form.Group>
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
                    <Form.Group>
                        <Category>
                            <h6>Phone Number</h6>
                            <Form.Check 
                                type="switch"
                                id="phone-switch"
                                label=""
                                checked={phoneSwitch}
                                onChange={() => setPhoneSwitch(!phoneSwitch)}
                            />
                        </Category>
                        {phoneSwitch ?
                            <>
                            <Form.Control
                                type="text"
                                value={replacePhone}
                                onChange={(e) => setReplacePhone(e.target.value)}
                                placeholder="Enter replacement Phone number"
                                className="mb-2"
                            />
                            </>
                        : <></>}
                    </Form.Group>
                    <Form.Group>
                        <Category>
                            <h6>Postal Code</h6>
                            <Form.Check 
                                type="switch"
                                id="postal-switch"
                                label=""
                                checked={postalSwitch}
                                onChange={() => setPostalSwitch(!postalSwitch)}
                            />
                        </Category>
                        {postalSwitch ?
                            <>
                            <Form.Control
                                type="text"
                                value={replacePostal}
                                onChange={(e) => setReplacePostal(e.target.value)}
                                placeholder="Enter replacement Postal Code"
                                className="mb-2"
                            />
                            </>
                        : <></>}
                    </Form.Group>
                    <Form.Group>
                        <Category>
                            <h6>Credit Card</h6>
                            <Form.Check 
                                type="switch"
                                id="credit-switch"
                                label=""
                                checked={creditSwitch}
                                onChange={() => setCreditSwitch(!creditSwitch)}
                            />
                        </Category>
                        {creditSwitch ?
                            <>
                            <Form.Control
                                type="text"
                                value={replaceCredit}
                                onChange={(e) => setReplaceCredit(e.target.value)}
                                placeholder="Enter replacement organization"
                                className="mb-2"
                            />
                            </>
                        : <></>}
                    </Form.Group> */}
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