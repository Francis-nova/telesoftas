import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ pageCount, currentPage, onPageChange }) => {
  return (
    <>
      <span>
        Showing page {currentPage} of {pageCount} pages
      </span>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next"
        onPageChange={onPageChange}
        pageRangeDisplayed={0}
        pageCount={pageCount}
        previousLabel="previous"
      />
    </>
  );
};

export default Pagination;
