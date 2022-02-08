import React, { useState } from "react";
import { useHistory, withRouter } from "react-router-dom/cjs/react-router-dom.min";
import SelectInput from "./SelectInput";
import TextInput from "./TextInput";

function TableFilter({ actionTypes, applicationsTypes, setCurrentPage, changeRef }) {
    const [fields, setFields] = useState({
        userAgent: "",
        fromDate: "",
        toDate: "",
        actionType: null,
        applicationType: null,
        applicationId: "",
    });

    const searchSubmit = async () => {
        changeRef();
        setCurrentPage(1);

        await history.push(
            `/LoggerSearch/1/${fields.fromDate || "-1"}/${fields.toDate || "-1"}/${fields.userAgent || "-1"}/${fields.actionType?.value || "-1"}/${
                fields.applicationType?.value || "-1"
            }/${fields.applicationId || "-1"}`
        );
    };
    const history = useHistory();

    const onFieldChange = (name, value) => setFields({ ...fields, [name]: value?.includes("/") ? value?.replace("/", "$") : value });
    const onSelectFieldChange = (name, value) => setFields({ ...fields, [name]: value });

    return (
        <ul className="filters flex">
            <li>
                <TextInput
                    placeholder="eg. Admin.User"
                    name="userAgent"
                    value={fields.userAgent}
                    label={"User Agent"}
                    onFieldChange={onFieldChange}
                />
            </li>
            <li>
                <SelectInput
                    name="actionType"
                    label={"Action Type"}
                    value={fields.actionType}
                    onFieldChange={onSelectFieldChange}
                    data={actionTypes}
                />
            </li>
            <li>
                <SelectInput
                    name="applicationType"
                    label={"Applications Type"}
                    value={fields.applicationType}
                    onFieldChange={onSelectFieldChange}
                    data={applicationsTypes}
                />
            </li>
            <li>
                <TextInput
                    placeholder="Select Date"
                    name="fromDate"
                    value={fields.fromDate}
                    label={"From Date"}
                    onFieldChange={onFieldChange}
                    type="date"
                />
            </li>
            <li>
                <TextInput
                    placeholder="Select Date"
                    name="toDate"
                    value={fields.toDate}
                    label={"To Date"}
                    onFieldChange={onFieldChange}
                    type="date"
                />
            </li>
            <li>
                <TextInput
                    placeholder="eg. 219841/2021"
                    name="applicationId"
                    value={fields.applicationId}
                    label={"Application ID"}
                    onFieldChange={onFieldChange}
                />
            </li>
            <li>
                <button className="submit-button" onClick={searchSubmit}>
                    Search Logger
                </button>
            </li>
        </ul>
    );
}

export default withRouter(TableFilter);
