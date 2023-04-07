import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button } from 'react-bootstrap';

const ParameterKeyValueItem = ({ name, replacementName, replaceTerms, setReplaceTerms }) => {
    const buttonStyle = { backgroundColor: "#A1E083", border: "none", cursor: "default"}
    const pointerCursorStyle = {cursor: "pointer"}
    const buttonTextStyle = {color: "#0C611A"}

    const handleDeleteItem = () => {
        const updated = { ...replaceTerms };
        delete updated[name];
        setReplaceTerms(updated);
    }

    return (
        <Button style={buttonStyle} className="m-1">
            <p className="d-inline" style={buttonTextStyle}>
                {name}: {replacementName}
            </p>
            {' '}
            <span onClick={handleDeleteItem} className="text-dark ms-1">
            <FontAwesomeIcon
                icon={faTimes}
                style={pointerCursorStyle}
                className="text-black"
            />
            </span>
        </Button>
      )
}

export default ParameterKeyValueItem;