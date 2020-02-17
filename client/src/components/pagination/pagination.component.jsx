import React from "react";
import _ from "lodash";
import uuid from "uuid/v1";

const Pagination = ({ itemsCount, limit, onPageChange, currentPage }) => {
  const pagesCount = Math.ceil(itemsCount / limit);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);
  return (
    <nav>
      <ul className="pagination">
        {pages.map(page => (
          <li
            key={uuid()}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <span className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
