import React, { Component } from "react";
import Select from "react-select";
import Label from "./Label";

class SelectInput extends Component {
    render() {
        const { label, tooltip, data = [], name, value, isRequired, isMulti } = this.props;

        return (
            <div className="selectBlock">
                <Label label={label} tooltip={tooltip} isRequired={isRequired} />
                <Select
                    className="basic-single mainSelect"
                    classNamePrefix="select"
                    options={data}
                    name={name}
                    value={value}
                    onChange={this.handleChange}
                    isMulti={isMulti}
                    placeholder={"select..."}
                    isClearable
                />
            </div>
        );
    }

    handleChange = (selectedOption) => {
        this.props.onFieldChange(this.props.name, selectedOption);
    };
}

export default SelectInput;
