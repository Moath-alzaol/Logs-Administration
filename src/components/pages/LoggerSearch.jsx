import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SelectInput from "../blocks/SelectInput";
import TextInput from "../blocks/TextInput";
import { FaArrowUp } from "react-icons/fa";
import { logsService } from "../../services/logsService";
import { fakeData } from "../../utils/misc";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import moment from "moment";
import Breadcrumb from "../blocks/Breadcrumb";

function LoggerSearch() {
    const [fields, setFields] = useState({
        name: "",
        fromDate: "",
        toDate: "",
        action: {},
        applicationType: {},
        appId: "",
    });

    const [actionTypes] = useState([
        { label: "None", value: 0 },
        { label: "Admin", value: "Admin" },
        { label: "Submit application", value: "Submit application" },
        { label: "initate application", value: "initate application" },
    ]);

    const [applicationsTypes] = useState([
        { label: "None", value: 0 },
        { label: "Lease renewal", value: "Lease renewal" },
        { label: "Tenancy contract", value: "Tenancy contract" },
        { label: "Add POA", value: "Add POA" },
    ]);

    const params = useParams();
    const history = useHistory();
    const [logs, setLogs] = useState({});
    const [pageCount, setPageCount] = useState();
    const [noResult, setNoResult] = useState(false);
    const [searchResult, setSearchData] = useState({});

    const [currentPage, setCurrentPage] = useState(params.page ?? 1);

    const onFieldChange = (name, value) => setFields({ ...fields, [name]: value });

    useEffect(() => {
        if (Object.keys(logs).length < 1) {
            getLogs();
        } else {
            if (history.location.pathname.length > 15) {
                getSearchResult();
            }
        }
    }, [params]);

    const getSearchResult = () => {
        setNoResult(false);
        setSearchData({});

        const newData = Object.values(logs).flat();

        let newFilter = newData;

        if (+params.name !== -1) newFilter = newFilter.filter((item) => item.name.toLowerCase().includes(params.name.toLowerCase()));

        if (+params.appId !== -1) newFilter = newFilter.filter((item) => item.appId.toString().includes(params.appId));

        if (+params.applicationType !== -1) newFilter = newFilter.filter((item) => item.applicationType.includes(params.applicationType));

        if (+params.action !== -1) newFilter = newFilter.filter((item) => item.action.includes(params.action));

        if (+params.fromDate !== -1) {
            newFilter = newFilter.filter((item) => {
                let a = moment(params.fromDate);
                let b = moment(item.available_on);
                return b.diff(a, "days") >= 0;
            });
        }

        if (+params.toDate !== -1) {
            newFilter = newFilter.filter((item) => {
                let a = moment(params.toDate);
                let b = moment(item.available_on);
                return b.diff(a, "days") <= 0;
            });
        }
        if (newFilter.length > 0) {
            let pageCount = Math.ceil(newFilter.length / 10);
            let dataWithPages = {};
            for (let i = 0; i < pageCount; i++) {
                let itemsPageCount = 10 * (i + 1);
                let lastItemsCount = 10 * i;
                dataWithPages[i + 1] = [];
                for (let y = 0; y < newFilter.length; y++) {
                    dataWithPages[i + 1] = newFilter.filter((_, index) => lastItemsCount <= index && index < itemsPageCount);
                }
            }
            setPageCount(pageCount);
            setSearchData(dataWithPages);
        } else {
            setNoResult(true);
        }
    };

    const getLogs = async () => {
        const { data, success } = await logsService.getLogs();
        if (!success) return;

        let dataAfterFixedProblem = JSON.parse([...data].filter((_, index) => index !== 1509).join(""));

        let actionValues = ["Admin", "Submit application", "initate application"];
        let applicationTypes = ["Add POA", "Tenancy contract", "Lease renewal"];

        //! Add missing data to data come from Api start
        const DataAfterAddedFakeData = dataAfterFixedProblem.map((item, index) => ({
            ...item,
            id: index + 1,
            appId: 959 + index,
            action: actionValues[Math.floor(Math.random() * actionValues.length)],
            applicationType: applicationTypes[Math.floor(Math.random() * applicationTypes.length)],
            available_on: moment(item.available_on).format("MM/DD/yy"),
        }));
        //! Add missing data to data come from Api end

        //! Add missing data to fake data start
        const DataAfterAddedFakeData1 = fakeData.map((item, index) => ({
            ...item,
            id: index + 1,
            appId: 959 + index,
            action: actionValues[Math.floor(Math.random() * actionValues.length)],
            applicationType: applicationTypes[Math.floor(Math.random() * applicationTypes.length)],
            available_on: moment(item.available_on).format("MM/DD/yy"),
        }));
        //! Add missing data to fake data end

        let pageCount = Math.ceil(DataAfterAddedFakeData1.length / 10);

        let dataWithPages = {};

        for (let i = 0; i < pageCount; i++) {
            let itemsPageCount = 10 * (i + 1);
            let lastItemsCount = 10 * i;
            dataWithPages[i + 1] = [];
            for (let y = 0; y < DataAfterAddedFakeData1.length; y++) {
                dataWithPages[i + 1] = DataAfterAddedFakeData1.filter((_, index) => lastItemsCount <= index && index < itemsPageCount);
            }
        }

        setLogs(dataWithPages);
        setPageCount(pageCount);
    };

    const searchSubmit = async () => {
        setCurrentPage(1);
        await history.push(
            `/LoggerSearch/1/${fields.fromDate || "-1"}/${fields.toDate || "-1"}/${fields.name || "-1"}/${fields.action.value || "-1"}/${
                fields.applicationType.value || "-1"
            }/${fields.appId || "-1"}`
        );
    };

    const handleSort = (key) => {
        let dataSorted;
        if (key === "available_on") {
            dataSorted = logs[currentPage].sort((a, b) => {
                if (a[key] > b[key]) {
                    return moment(a[key]) - moment(b[key]);
                }
                if (a[key] < b[key]) {
                    return moment(b[key]) - moment(a[key]);
                }
            });
        } else {
            if (key === "name" || key === "applicationType" || key === "action") {
                dataSorted = logs[currentPage].sort((a, b) => {
                    if (a[key] > b[key]) {
                        return 1;
                    }
                    if (a[key] < b[key]) {
                        console.log("2");

                        return -1;
                    }
                    return 0;
                });
            } else {
                dataSorted = logs[currentPage].sort((a, b) => {
                    if (a[key] > b[key]) {
                        return b[key] - a[key];
                    }
                    if (a[key] < b[key]) {
                        return a[key] - b[key];
                    }
                });
            }
        }
        setLogs({ ...logs, [currentPage]: dataSorted });
    };
    return (
        <div className="loggerSearch">
            <div className="container">
                {/* breadcrumb start   */}
                <Breadcrumb />
                {/* breadcrumb end   */}

                {/* filter section start  */}

                <ul className="filters flex">
                    <li>
                        <TextInput
                            placeholder="eg. Admin.User"
                            name="name"
                            value={fields.name}
                            label={"Employee Name"}
                            onFieldChange={onFieldChange}
                        />
                    </li>
                    <li>
                        <SelectInput
                            name="action"
                            label={"Action Type"}
                            value={fields.action}
                            onFieldChange={(name, option) => onFieldChange(name, option)}
                            data={actionTypes}
                        />
                    </li>
                    <li>
                        <SelectInput
                            name="applicationType"
                            label={"Applications Type"}
                            value={fields.applicationType}
                            onFieldChange={(name, option) => onFieldChange(name, option)}
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
                            name="appId"
                            value={fields.appId}
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
                {/* filter section end  */}

                {/* table start  */}
                {noResult ? (
                    <div className="table-empty">
                        <p>No Result To Show</p>
                    </div>
                ) : (
                    <table>
                        {/* tabel Header start  */}
                        <thead>
                            <tr className="table-header">
                                <th>
                                    Log ID
                                    <span className="sort-icon" onClick={() => handleSort("id")}>
                                        <FaArrowUp />
                                    </span>
                                </th>
                                <th>
                                    Employee Name
                                    <span className="sort-icon" onClick={() => handleSort("name")}>
                                        <FaArrowUp />
                                    </span>
                                </th>
                                <th>
                                    Application type
                                    <span className="sort-icon" onClick={() => handleSort("applicationType")}>
                                        <FaArrowUp />
                                    </span>
                                </th>
                                <th>
                                    Application ID
                                    <span className="sort-icon" onClick={() => handleSort("appId")}>
                                        <FaArrowUp />
                                    </span>
                                </th>
                                <th>
                                    Action
                                    <span className="sort-icon" onClick={() => handleSort("action")}>
                                        <FaArrowUp />
                                    </span>
                                </th>
                                <th>
                                    Action Details
                                    <span className="sort-icon">
                                        <FaArrowUp />
                                    </span>
                                </th>
                                <th>
                                    Date: Time
                                    <span className="sort-icon" onClick={() => handleSort("available_on")}>
                                        <FaArrowUp />
                                    </span>
                                </th>
                            </tr>
                        </thead>

                        {/* tabel Header end  */}

                        {/* tabel Body end  */}
                        <tbody>
                            {Object.keys(searchResult).length > 0 ? (
                                <>
                                    {searchResult[currentPage]?.map(({ name, id, price, city, available_on, appId, applicationType, action }) => {
                                        return (
                                            <tr key={id}>
                                                <td>{id}</td>
                                                <td>{name}</td>
                                                <td>{applicationType}</td>
                                                <td>{appId}</td>
                                                <td>{action}</td>
                                                <td>-/-</td>
                                                <td>{available_on}</td>
                                            </tr>
                                        );
                                    })}
                                </>
                            ) : (
                                <>
                                    {logs[currentPage]?.map(({ name, id, price, city, available_on, appId, applicationType, action }) => {
                                        return (
                                            <tr key={id}>
                                                <td>{id}</td>
                                                <td>{name}</td>
                                                <td>{applicationType}</td>
                                                <td>{appId}</td>
                                                <td>{action}</td>
                                                <td>-/-</td>
                                                <td>{available_on}</td>
                                            </tr>
                                        );
                                    })}
                                </>
                            )}
                        </tbody>
                        {/* tabel Body end  */}
                    </table>
                )}
                {/* table end  */}

                {/* pagenation end  */}
                <ul className="pagenation flex">
                    {[...Array(pageCount).keys()].map((_, index) => {
                        return (
                            <li onClick={() => setCurrentPage(index + 1)} key={index}>
                                <Link to={`/LoggerSearch/${index + 1}`} className={`${+params.page === index + 1 && "currentPage"}`}>
                                    {index + 1}
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                {/* pagenation end  */}
            </div>
        </div>
    );
}

export default LoggerSearch;
