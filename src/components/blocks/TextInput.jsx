import React, { Component } from "react";
import Label from "./Label";

class TextInput extends Component {
    render() {
        const { label, placeholder, tooltip, maxLength, value, name, isRequired, disabled = false, max, min, type = "text" } = this.props;
        return (
            <div className="text-input-block">
                {label && <Label label={label} tooltip={tooltip} isRequired={isRequired} />}
                <input
                    name={name}
                    value={value}
                    max={max ?? null}
                    min={min ?? null}
                    placeholder={placeholder ?? label}
                    maxLength={maxLength}
                    onChange={this.onChange}
                    type={type}
                    disabled={disabled}
                />
            </div>
        );
    }

    onChange = ({ target: { name, value } }) => {
        const { onFieldChange } = this.props;
        onFieldChange(name, value.trim());
    };
}

export default TextInput;
