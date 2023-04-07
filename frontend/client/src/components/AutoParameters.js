import _ from 'lodash';
import React, { useEffect, useRef } from 'react';
import { Form } from 'react-bootstrap';
import styled from 'styled-components';
import AutoParameterItem from './AutoParameterItem';

const AutoParameters = ({ autoReplaceTerms, setAutoReplaceTerms, switchDict, setSwitchDict, replaceDict, setReplaceDict}) => {
    // the keys must be the same in switchDict, replaceDict and nameDict for the code below to work properly
    const autoReplaceTermsResetRef = useRef({});

    let nameDict = {
        "names":  "Names",
        "location": "Locations",
        "org": "Organizations",
        "phone_number": "Phone Numbers",
        "postal_code": "Postal Code",
        "credit_card": "Credit Card"
    }

    useEffect(() => {
        // update autoReplaceTerms when any fields are updated
        let newTerms = {};
        // loop through keys of switchDict and set the values of newTerms according to value with same key in ReplaceDict
        Object.keys(switchDict).forEach(key => {
            if (switchDict[key]){
                // if the switch variable for that key is true, add the replace value of that key to newTerms
                newTerms[key] = replaceDict[key];
            }
        })
        setAutoReplaceTerms(newTerms);
    }, [replaceDict, switchDict, setAutoReplaceTerms]);

    useEffect(() => {
        if (Object.keys(autoReplaceTerms).length === 0 && !_.isEqual(autoReplaceTermsResetRef.current, autoReplaceTerms)) {
            // clear button was pressed, reset all fields
            setReplaceDict({"names": "", "location": "", "org": "", "phone_number": "", "postal_code": "", "credit_card": ""})
            setSwitchDict({"names": false, "location": false, "org": false, "phone_number": false, "postal_code": false, "credit_card": false})
            autoReplaceTermsResetRef.current = {};
        } else {
            autoReplaceTermsResetRef.current = autoReplaceTerms;
        }
    }, [autoReplaceTerms, setReplaceDict, setSwitchDict]);

    return (
        <AutoParametersStyled>
            <h3>Auto-Replace Parameters</h3>
            <div className="mb-4">
                <Form>
                    {Object.keys(switchDict).map((replaceKey, i) => {
                        return(<Form.Group key={i}>  
                        {/* for each element in list, add unique key, value is the index i of key in switchDict */}
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