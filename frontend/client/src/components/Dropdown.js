import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import styled from 'styled-components';

const DropdownMenu = ({ endpoints, currentEndpoint, setCurrentEndpoint, resetParams}) => {
    return (
        <>
            <Dropdown>
                <Dropdown.Toggle className='dropdown' id="dropdown-button-dark-example1" variant="secondary">
                    {currentEndpoint.displayName}
                </Dropdown.Toggle>

                <Dropdown.Menu variant="dark">
                    {endpoints.map((item) => {
                        const endpointURL = item["URL"]
                        const displayName = item["displayName"]
                        const fileType = item["fileType"]
                        return <>
                            <Dropdown.Item
                                key={endpointURL}
                                active={currentEndpoint.URL === endpointURL}
                                onClick={() => {
                                    setCurrentEndpoint(
                                        {
                                            displayName: displayName,
                                            URL: endpointURL,
                                            fileType: fileType
                                        }
                                    
                                    )
                                    resetParams()
                                }}
                            >
                                {displayName}
                            </Dropdown.Item>
                        </>
                    })}
                </Dropdown.Menu>
            </Dropdown>
        </>
    )
}

export default DropdownMenu;