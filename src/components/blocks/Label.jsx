import React from "react";
import { withRouter } from "react-router";

const Label = ({ label, classAttr = "", isRequired }) => (
    <div className={`reusable-label ${classAttr}`}>
        <div>
            <span>{label}</span>
            {isRequired && <span className="requiredField">*</span>}
        </div>
    </div>
);

export default withRouter(Label);
