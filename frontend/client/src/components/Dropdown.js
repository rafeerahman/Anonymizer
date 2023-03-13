import React, {useState} from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import styled from 'styled-components';

const DropdownMenu = ({ endpoints, currentEndpoint, setCurrentEndpoint, resetParams}) => {
    const [selectedItem, setSelectedItem] = useState("")
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
                                    if (selectedItem != item){ 
                                        //use selected item to see if dropdown selection changed
                                        // if so, trigger this
                                        setCurrentEndpoint(
                                            {
                                                displayName: displayName,
                                                URL: endpointURL,
                                                fileType: fileType
                                            }
                                        
                                        )
                                        resetParams()
                                        setSelectedItem(item)
                                    }
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