import React, { useEffect, useRef, useState } from "react";

import { logsService } from "../../services/logsService";
import { mapSelectData } from "../../utils/misc";
import { useParams } from "react-router-dom";
import moment from "moment";
import Breadcrumb from "../blocks/Breadcrumb";
import MainLoader from "../blocks/MainLoader";
import TableFilter from "../blocks/TableFilter";
import Pagenation from "../blocks/Pagenation";
import Table from "../blocks/Table";

function LoggerSearch() {
    let notFirst = useRef(false);
    let isSearch = useRef(false);
    const params = useParams();
    const [logs, setLogs] = useState({});
    const [pageCount, setPageCount] = useState();
    const [noResult, setNoResult] = useState(false);
    const [isLoader, setIsLoader] = useState(true);
    const [searchResult, setSearchData] = useState({});
    const [currentPage, setCurrentPage] = useState(params.page ?? 1);
    const [actionTypes, setActionTypes] = useState([]);
    const [applicationsTypes, setApplicationTypes] = useState([]);

    useEffect(() => {
        if (!notFirst.current) {
            getLogs();
        }

        if (notFirst.current) {
            if (isSearch.current) {
                getSearchResult();
            }
        }
    }, [params]);

    const getSearchResult = () => {
        setNoResult(false);
        setSearchData({});
        isSearch.current = false;
        const newData = Object.values(logs).flat();

        let newFilter = newData;

        if (+params.userAgent !== -1)
            newFilter = newFilter.filter((item) => item.userAgent?.toLowerCase()?.includes(params.userAgent?.replace("$", "/")?.toLowerCase()));

        if (+params.applicationId !== -1) newFilter = newFilter.filter((item) => item.applicationId?.toString()?.includes(params.applicationId));

        if (+params.applicationType !== -1) newFilter = newFilter.filter((item) => item.applicationType?.includes(params.applicationType));

        if (+params.actionType !== -1) newFilter = newFilter.filter((item) => item.actionType?.includes(params.actionType));

        if (+params.fromDate !== -1) {
            newFilter = newFilter.filter((item) => {
                let a = moment(params.fromDate);
                let b = moment(item.creationTimestamp);
                return b.diff(a, "days") >= 0;
            });
        }

        if (+params.toDate !== -1) {
            newFilter = newFilter.filter((item) => {
                let a = moment(params.toDate);
                let b = moment(item.creationTimestamp);
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
        const {
            data: { auditLog },
            success,
        } = await logsService.getLogs();

        if (!success) return;

        //>: get action types
        let actionTypes = [];
        let uniqueObject = {};

        for (let i in auditLog) {
            let objTitle = auditLog[i]["actionType"];
            uniqueObject[objTitle] = auditLog[i]["actionType"];
        }

        // Loop to push unique action Type into array
        for (let i in uniqueObject) {
            actionTypes.push(uniqueObject[i]);
        }
        //>: get action types end

        //>: get application types
        let applicationType = [];
        let uniqueObject2 = {};

        for (let i in auditLog) {
            let objTitle = auditLog[i]["applicationType"];
            uniqueObject2[objTitle] = auditLog[i]["applicationType"];
        }

        // Loop to push unique application Type into array
        for (let i in uniqueObject2) {
            applicationType.push(uniqueObject2[i]);
        }
        //>: get application types end

        //>: store action types and application types in state

        setActionTypes(mapSelectData(actionTypes));
        setApplicationTypes(mapSelectData(applicationType));

        //>: store action types and application types in state end

        let pageCount = Math.ceil(auditLog.length / 10);

        let dataWithPages = {};

        //>: convert data to objects with page number
        for (let i = 0; i < pageCount; i++) {
            let itemsPageCount = 10 * (i + 1);
            let lastItemsCount = 10 * i;
            dataWithPages[i + 1] = [];
            for (let y = 0; y < auditLog.length; y++) {
                dataWithPages[i + 1] = auditLog.filter((_, index) => lastItemsCount <= index && index < itemsPageCount);
            }
        }
        //>: convert data to objects with page number end

        setLogs(dataWithPages);
        setPageCount(pageCount);
        setIsLoader(false);
    };

    const handleSort = (key) => {
        let dataSorted;
        let copyData = [...logs[currentPage]];

        if (key === "creationTimestamp") {
            dataSorted = copyData.sort((a, b) => {
                let dateA = moment(a[key]).format("yy-MM-DD");
                let dateB = moment(b[key]).format("yy-MM-DD");

                if (dateB > dateA) {
                    return moment(a[key]) - moment(b[key]);
                }
                if (dateB < dateA) {
                    return moment(b[key]) - moment(a[key]);
                }
                return 0;
            });
        } else {
            if (key === "userAgent" || key === "applicationType" || key === "actionType") {
                dataSorted = copyData.sort(function (a, b) {
                    let textA = a[key] ? a[key].toUpperCase() : "Z";
                    let textB = b[key] ? b[key].toUpperCase() : "Z";
                    return textA < textB ? -1 : textA > textB ? 1 : 0;
                });
            } else {
                dataSorted = copyData.sort((a, b) => {
                    if (a[key] > b[key]) {
                        return b[key] - a[key];
                    }
                    if (a[key] < b[key]) {
                        return a[key] - b[key];
                    }
                    return 0;
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

                {/* Table Filter start  */}
                <TableFilter
                    actionTypes={actionTypes}
                    applicationsTypes={applicationsTypes}
                    setCurrentPage={(page) => setCurrentPage(page)}
                    changeRef={() => {
                        isSearch.current = true;
                        notFirst.current = true;
                    }}
                />
                {/* Table Filter end  */}

                {/* Table start  */}
                {noResult ? (
                    <div className="table-empty">
                        <p>No Result To Show</p>
                    </div>
                ) : isLoader ? (
                    <MainLoader />
                ) : (
                    <Table logs={logs} currentPage={currentPage} searchResult={searchResult} handleSort={(key) => handleSort(key)} />
                )}
                {/* Table end  */}

                {/* pagenation end  */}
                <Pagenation pageCount={pageCount} setCurrentPage={(page) => setCurrentPage(page)} />
                {/* pagenation end  */}
            </div>
        </div>
    );
}

export default LoggerSearch;
