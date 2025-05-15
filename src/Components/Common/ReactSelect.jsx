import React from "react";
import Select from 'react-select';

const ReactSelect = ({
    options,
    selectedValue,
    handleSelectChange,
    Clearable
}) => {

    const handleChange = selectedOption => {
        handleSelectChange(selectedOption)
    };

    return (
        <Select
            className="basic-single"
            classNamePrefix="select"
            isSearchable={true}
            name="color"
            isClearable={Clearable ===undefined ? true : Clearable}
            value={selectedValue}
            onChange={handleChange}
            options={options}
            menuPortalTarget={document.body}
            styles={{ menuPortal: base => ({ ...base, zIndex: 9999, }) }}
            menuPosition={'fixed'}
        // menuPlacement="bottom"
        />
    );
};

export default ReactSelect;
