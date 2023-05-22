import React from "react";
import styled from "styled-components";
import pre from "../images/left-arrow.png";
import next from "../images/right-arrow.png";

const PageNationButton = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  
  button {
    margin: 0 3px;
  }

  img {
    width: 7px;
    height: 7px;
    cursor: pointer;
  }
  .active {
    border: none;
    &:hover {
      background-color: white;
      color: darkgray;
    }
  }
  
  .left {
    margin-right: 10px;
  }
  .right {
    margin-left: 10px;
  }
  .active {
    background-color: lightgray;
    color: white;
  }
`;


const PageNation = ({ currentPage, totalPages, onPageChange }) => {
  const pageRange = 5; 

  let startPage = Math.max(1, currentPage - Math.floor(pageRange / 2));
  let endPage = Math.min(startPage + pageRange - 1, totalPages);

  if (endPage - startPage + 1 < pageRange) {
    startPage = Math.max(1, endPage - pageRange + 1);
  }

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }
  
  return(
    <>
    <PageNationButton>
    <img className="left" src={pre} alt="이전"
     onClick={() => currentPage !== 1 && onPageChange(currentPage - 1)} />
    {pageNumbers.map((pageNumber) => (
      <button key={pageNumber}
      onClick={() => onPageChange(pageNumber)}
      className={pageNumber === currentPage ? "active" : ""}>
        {pageNumber}
      </button>
    ))}
    <img className="right" src={next} alt="다음" 
    onClick={() => currentPage !== totalPages && onPageChange(currentPage + 1)}/>
    </PageNationButton>
    </>
  );
};

export default PageNation;