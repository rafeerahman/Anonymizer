import React, { useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import styled from 'styled-components';
import ParameterKeyValueItem from './ParameterKeyValueItem';

const Parameters = ({ replaceTerms, setReplaceTerms}) => {
    const [name, setName] = useState("");
    const [replacementName, setReplacementName] = useState("");
    const nameInputRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault()
        if (name !== "" && replacementName !== "") {
            setReplaceTerms({...replaceTerms, [name]: replacementName})
            setName("")
            setReplacementName("")
            nameInputRef.current.focus()
        }
    }
    return (
        <ParametersStyled>
            <h3>Parameters</h3>
            <div className="mb-4">
                <h5>Replace</h5>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter name"
                            className="mb-2"
                            ref={nameInputRef}
                        />
                        <Form.Control
                            type="text"
                            value={replacementName}
                            onChange={(e) => setReplacementName(e.target.value)}
                            placeholder="Enter replacement name"
                            className="mb-2"
                        />
                    </Form.Group>
                    <Button type="submit" className="float-end">Add</Button>
                </Form>
                <div className="mt-5">
                    {replaceTerms.length !== 0 && Object.entries(replaceTerms).map(([name, replacementName]) => {
                        return <ParameterKeyValueItem
                            key={`${name}-${replacementName}`}
                            name={name}
                            replacementName={replacementName}
                            replaceTerms={replaceTerms}
                            setReplaceTerms={setReplaceTerms}
                        />
                    })}
                </div>
            </div>
        </ParametersStyled>
    )  
}

const ParametersStyled = styled.div`
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

export default Parameters;