'use client';
import { useState, useEffect } from 'react';

interface PaginationProps {
  dataLength: number;
  currentPage: number;
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
}

const Pagination = ({ dataLength, currentPage, nextPage, prevPage, goToPage }: PaginationProps) => {
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    if (dataLength % 10 == 0) {
      setTotalPage(dataLength / 10);
    } else {
      setTotalPage(dataLength / 10 + 1);
    }
  }, [dataLength]);

  return (
    <>
      <div>
        <div style={{ display: 'flex' }}>
          <button className='px-2 py-1 m-1 rounded-md border border-white cursor-pointer' onClick={prevPage}>
            Previous
          </button>
          {Array.from({ length: totalPage }).map((_, i) => {
            return (
              <div onClick={() => goToPage(i + 1)} key={i}>
                <button className='px-2 py-1 m-1 rounded-md border border-white cursor-pointer' style={{ background: `${currentPage == i + 1 ? 'blue' : ''}` }}>
                  {i + 1}
                </button>
              </div>
            );
          })}
          <button className='px-2 py-1 m-1 rounded-md border border-white cursor-pointer' onClick={nextPage}>
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Pagination;
