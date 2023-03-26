import React from 'react';
import { Button } from 'react-bootstrap';

const AutoParameterItem = ({ name, replacementName, replaceTerms, setReplaceTerms }) => {
    const buttonStyle = { backgroundColor: "#A1E083", border: "none", cursor: "default"}
    const buttonTextStyle = {color: "#0C611A"}


    return (
        <Button style={buttonStyle} className="m-1">
            <p className="d-inline" style={buttonTextStyle}>
                {name}: {replacementName}
            </p>
        </Button>
      )
}

export default AutoParameterItem;