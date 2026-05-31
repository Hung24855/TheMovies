"use client";

import { useRouter } from "next-nprogress-bar";
import { useState, Suspense, useEffect } from "react";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";

const PaginationInner = ({
  initPage = 1,
  totalPage,
}: {
  totalPage: number;
  initPage: number;
}) => {
  const [pageActive, setPageActive] = useState<number>(() => initPage);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    setPageActive(initPage);
  }, [initPage]);

  const getPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `?${params.toString()}`;
  };

  const handleSelectPage = (pageNumber: number) => {
    if (pageNumber !== pageActive) {
      setPageActive(pageNumber);
    }
    router.push(getPageUrl(pageNumber));
  };

  const handlePrevPage = () => {
    if (pageActive > 1) {
      const newPageActive = pageActive - 1;
      setPageActive(newPageActive);
      router.push(getPageUrl(newPageActive));
    }
  };

  const handleNextPage = () => {
    if (pageActive < totalPage) {
      const newPageActive = pageActive + 1;
      setPageActive(newPageActive);
      router.push(getPageUrl(newPageActive));
    }
  };

  const PageItem = ({ page, isActive, onClick }: { page: number | string, isActive?: boolean, onClick?: () => void }) => {
    if (typeof page === 'string') {
      return (
        <span className="flex w-10 h-10 items-center justify-center text-white/40 tracking-widest">
          ...
        </span>
      )
    }

    return (
      <button
        onClick={onClick}
        className={clsx(
          "relative flex w-10 h-10 items-center justify-center rounded-full text-sm font-bold transition-all duration-300",
          isActive 
            ? "bg-primary text-white shadow-[0_0_20px_rgba(229,9,20,0.6)] scale-110 z-10" 
            : "bg-[#1a1a1a] border border-white/5 text-gray-400 hover:bg-[#2a2a2a] hover:text-white hover:border-white/20 hover:-translate-y-1"
        )}
      >
        {page}
      </button>
    )
  }

  const renderPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 3;
    const halfPagesToShow = Math.floor(maxPagesToShow / 2);

    pages.push(
      <PageItem 
        key={1} 
        page={1} 
        isActive={pageActive === 1} 
        onClick={() => handleSelectPage(1)} 
      />
    );

    if (pageActive > halfPagesToShow + 2) {
      pages.push(<PageItem key="ellipsis1" page="..." />);
    }

    const startPage = Math.max(2, pageActive - halfPagesToShow);
    const endPage = Math.min(totalPage - 1, pageActive + halfPagesToShow);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PageItem 
          key={i} 
          page={i} 
          isActive={pageActive === i} 
          onClick={() => handleSelectPage(i)} 
        />
      );
    }

    if (pageActive < totalPage - halfPagesToShow - 1) {
      pages.push(<PageItem key="ellipsis2" page="..." />);
    }

    if (totalPage > 1) {
      pages.push(
        <PageItem 
          key={totalPage} 
          page={totalPage} 
          isActive={pageActive === totalPage} 
          onClick={() => handleSelectPage(totalPage)} 
        />
      );
    }

    return pages;
  };

  return (
    <div className="flex items-center gap-2 p-2 bg-black/40 backdrop-blur-md rounded-full border border-white/5 shadow-2xl">
      <button
        onClick={handlePrevPage}
        disabled={pageActive <= 1}
        className={clsx(
          "flex w-10 h-10 items-center justify-center rounded-full transition-all duration-300",
          pageActive > 1 
            ? "bg-[#1a1a1a] text-white hover:bg-primary hover:shadow-[0_0_15px_rgba(229,9,20,0.5)] hover:-translate-x-1" 
            : "text-white/20 cursor-not-allowed bg-transparent"
        )}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </button>

      <div className="flex items-center gap-1.5 px-2">
        {renderPageNumbers()}
      </div>

      <button
        onClick={handleNextPage}
        disabled={pageActive >= totalPage}
        className={clsx(
          "flex w-10 h-10 items-center justify-center rounded-full transition-all duration-300",
          pageActive < totalPage 
            ? "bg-[#1a1a1a] text-white hover:bg-primary hover:shadow-[0_0_15px_rgba(229,9,20,0.5)] hover:translate-x-1" 
            : "text-white/20 cursor-not-allowed bg-transparent"
        )}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  );
};

const Pagination = (props: { totalPage: number; initPage: number }) => {
  return (
    <Suspense fallback={<div className="flex w-full h-14 bg-white/5 animate-pulse rounded-full"></div>}>
      <PaginationInner {...props} />
    </Suspense>
  );
};

export default Pagination;
