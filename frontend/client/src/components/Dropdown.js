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
                                    if (selectedItem != item || currentEndpoint.fileType != selectedItem.fileType){ 
                                        //use selected item to see if dropdown selection changed or if they clicked the same option
                                        // also check if the current endpoint.filetype has changed from when selectedItem was last updated
                                        // (in the case of example being loaded)
                                        // if so, trigger this and update selectedItem
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