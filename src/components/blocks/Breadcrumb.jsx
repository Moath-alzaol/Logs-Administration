import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Breadcrumb() {
    const history = useHistory();
    return (
        <ul className="loggerSearch__breadcrumb flex">
            <li>
                <Link to="/home">Home</Link>
            </li>
            <i className="fa fa-chevron-right" />
            <li>
                <Link to="/Administration">Administration</Link>
            </li>
            <i className="fa fa-chevron-right" />
            <li>
                <Link to="/LoggerSearch/1" className={`${history.location.pathname.toLowerCase().startsWith("/loggersearch/") ? "activeLink" : ""}`}>
                    Logger search
                </Link>
            </li>
        </ul>
    );
}

export default Breadcrumb;
