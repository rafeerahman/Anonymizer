import React, {useState} from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import styled from 'styled-components';

const DropdownMenu = ({ endpoints, currentFileType, setCurrentFileType, resetParams}) => {
    const [selectedItem, setSelectedItem] = useState("")
    return (
        <>
            <Dropdown>
                <Dropdown.Toggle className='dropdown' id="dropdown-button-dark-example1" variant="secondary">
                    {currentFileType.displayName}
                </Dropdown.Toggle>

                <Dropdown.Menu variant="dark">
                    {endpoints.map((item) => {
                        const displayName = item["displayName"]
                        const fileType = item["fileType"]
                        return (<div key={fileType}>
                            <Dropdown.Item
                                active={currentFileType.fileType === fileType}
                                onClick={() => {
                                    if (selectedItem !== item || currentFileType.fileType !== selectedItem.fileType){ 
                                        //use selected item to see if dropdown selection changed or if they clicked the same option
                                        // also check if the current endpoint.filetype has changed from when selectedItem was last updated
                                        // (in the case of example being loaded)
                                        // if so, trigger this and update selectedItem
                                        setCurrentFileType(
                                            {
                                                displayName: displayName,
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
                        </div>)
                    })}
                </Dropdown.Menu>
            </Dropdown>
        </>
    )
}

export default DropdownMenu;