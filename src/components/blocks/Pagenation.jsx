import React from "react";
import { Link } from "react-router-dom";
import { useParams, withRouter } from "react-router-dom/cjs/react-router-dom.min";

function Pagenation({ setCurrentPage, pageCount }) {
    const params = useParams();

    return (
        <ul className="pagenation flex">
            <li onClick={() => setCurrentPage(+params.page - 1)} className={`${+params.page > 1 && "showArrow"}`}>
                <Link to={`/LoggerSearch/${+params.page - 1}`}>
                    <i className="fa fa-angle-left" />
                </Link>
            </li>
            {[...Array(pageCount).keys()].map((_, index) => {
                return (
                    <li onClick={() => setCurrentPage(index + 1)} key={index}>
                        <Link to={`/LoggerSearch/${index + 1}`} className={`${+params.page === index + 1 && "currentPage"}`}>
                            {index + 1}
                        </Link>
                    </li>
                );
            })}
            <li onClick={() => setCurrentPage(+params.page + 1)} className={`${+params.page < [...Array(pageCount).keys()].length && "showArrow"}`}>
                <Link to={`/LoggerSearch/${+params.page + 1}`}>
                    <i className="fa fa-angle-right" />
                </Link>
            </li>
        </ul>
    );
}

export default withRouter(Pagenation);
