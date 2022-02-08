import React from "react";
import { FaArrowUp } from "react-icons/fa";
import moment from "moment";

function Table({ searchResult, currentPage, logs, handleSort }) {
    return (
        <table>
            {/* tabel Header start  */}
            <thead>
                <tr className="table-header">
                    <th>
                        Log ID
                        <span className="sort-icon" onClick={() => handleSort("logId")}>
                            <FaArrowUp />
                        </span>
                    </th>
                    <th>
                        User Agent
                        <span className="sort-icon" onClick={() => handleSort("userAgent")}>
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
                        <span className="sort-icon" onClick={() => handleSort("applicationId")}>
                            <FaArrowUp />
                        </span>
                    </th>
                    <th>
                        Action
                        <span className="sort-icon" onClick={() => handleSort("actionType")}>
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
                        <span className="sort-icon" onClick={() => handleSort("creationTimestamp")}>
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
                        {searchResult[currentPage]?.map(({ userAgent, logId, creationTimestamp, applicationId, applicationType, actionType }) => {
                            return (
                                <tr key={logId}>
                                    <td>{logId ?? "-/-"}</td>
                                    <td>{userAgent ?? "-/-"}</td>
                                    <td>{applicationType ?? "-/-"}</td>
                                    <td>{applicationId ?? "-/-"}</td>
                                    <td>{actionType ?? "-/-"}</td>
                                    <td>-/-</td>
                                    <td>{creationTimestamp ?? "-/-"}</td>
                                </tr>
                            );
                        })}
                    </>
                ) : (
                    <>
                        {logs[currentPage]?.map(({ userAgent, logId, creationTimestamp, applicationId, applicationType, actionType }) => {
                            return (
                                <tr key={logId}>
                                    <td>{logId ?? "-/-"}</td>
                                    <td>{userAgent ?? "-/-"}</td>
                                    <td>{applicationType ?? "-/-"}</td>
                                    <td>{applicationId ?? "-/-"}</td>
                                    <td>{actionType ?? "-/-"}</td>
                                    <td>-/-</td>
                                    <td>{moment(creationTimestamp).format("yy-MM-DD / hh:mm:ss") ?? "-/-"}</td>
                                </tr>
                            );
                        })}
                    </>
                )}
            </tbody>
            {/* tabel Body end  */}
        </table>
    );
}

export default Table;
