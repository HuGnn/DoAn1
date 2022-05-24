import React, { useMemo } from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

export default function RPagination({ currentPage, totalPage, handleClick }) {
  const arr = useMemo(() => {
    const arrPage = [];
    for (let i = 0; i < totalPage; i++) {
      arrPage.push(i + 1);
    }
    return arrPage;
  }, [totalPage]);
  return (
    <Pagination aria-label='Page navigation example' className='text-center pb-5 fs-5'>
      <PaginationItem disabled={currentPage === 1}>
        <PaginationLink
          first
          onClick={() => {
            handleClick(1);
          }}
        />
      </PaginationItem>
      <PaginationItem disabled={currentPage === 1}>
        <PaginationLink
          previous
          onClick={() => {
            handleClick(currentPage - 1);
          }}
        />
      </PaginationItem>

      {arr.length > 0 &&
        arr.map((item, index) => (
          <PaginationItem key={index} active={item === currentPage}>
            <PaginationLink
              onClick={() => {
                handleClick(item);
              }}
            >
              {item}
            </PaginationLink>
          </PaginationItem>
        ))}

      <PaginationItem disabled={currentPage === totalPage}>
        <PaginationLink
          next
          onClick={() => {
            handleClick(currentPage + 1);
          }}
        />
      </PaginationItem>
      <PaginationItem disabled={currentPage === totalPage}>
        <PaginationLink
          last
          onClick={() => {
            handleClick(totalPage);
          }}
        />
      </PaginationItem>
    </Pagination>
  );
}
