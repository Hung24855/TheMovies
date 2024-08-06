"use client";

import { getFirmByPage } from "@/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Pagination = ({
  totalPage,
}: {
  totalPage: number;
}) => {
  const [pageActive, setPageActive] = useState<number>(1);
  const router = useRouter();

  /*Xử lý chọn trang*/
  const handleSelectPage = (pageNumber: number) => {
    if (pageNumber !== pageActive) {
      setPageActive(pageNumber);
    }
    router.push(`?page=${pageNumber}`);
  };

  const handlePrevPage = () => {
    if (pageActive > 1) {
      const newPageActive = pageActive - 1;
      setPageActive(newPageActive);
    }
  };

  const handleNextPage = () => {
    if (pageActive < totalPage) {
      const newPageActive = pageActive + 1;
      setPageActive(newPageActive);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5; // Số lượng trang lân cận hiện tại hiển thị
    const halfPagesToShow = Math.floor(maxPagesToShow / 2); //Đây là một biến trung gian để tính toán khoảng cách từ trang hiện tại đến các trang lân cận.

    // Luôn hiển thị trang đầu tiên
    pages.push(
      <span
        className={`mx-1 cursor-pointer rounded border border-white px-2 py-1 w-56`}
        key={1}
        onClick={() => handleSelectPage(1)}
      >
        1
      </span>,
    );

    // Hiển thị dấu chấm lửng nếu cần
    if (pageActive > halfPagesToShow + 2) {
      pages.push(
        <span className="mx-1 px-2 py-1" key="ellipsis1">
          ...
        </span>,
      );
    }
    // Tính toán các trang lân cận cần hiển thị
    const startPage = Math.max(2, pageActive - halfPagesToShow);
    const endPage = Math.min(totalPage - 1, pageActive + halfPagesToShow);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <span
          className={`mx-1 cursor-pointer rounded border border-primary px-2 py-1 ${pageActive === i && "bg-blue-500 text-red-500"}`}
          key={i}
          onClick={() => handleSelectPage(i)}
        >
          {i}
        </span>,
      );
    }

    // Hiển thị dấu chấm lửng nếu cần
    if (pageActive < totalPage - halfPagesToShow - 1) {
      pages.push(
        <span className="mx-1 px-2 py-1" key="ellipsis2">
          ...
        </span>,
      );
    }

    // Luôn hiển thị trang cuối cùng
    if (totalPage > 1) {
      pages.push(
        <span
          className={`mx-1 cursor-pointer border border-primary px-2 py-1 ${pageActive === totalPage && "bg-primary text-white"}`}
          key={totalPage}
          onClick={() => handleSelectPage(totalPage)}
        >
          {totalPage}
        </span>,
      );
    }

    return pages;
  };

  return (
    <div>
      <span
        className={`mx-1 ${pageActive > 1 ? "cursor-pointer" : "cursor-default opacity-40"} rounded border border-primary px-2 py-1`}
        onClick={handlePrevPage}
      >
        &lt;
      </span>
      {renderPageNumbers()}
      <span
        className={`mx-1 ${pageActive !== totalPage ? "cursor-pointer" : "cursor-default opacity-40"} rounded border border-primary px-2 py-1`}
        onClick={handleNextPage}
      >
        &gt;
      </span>
    </div>
  );
};

export default Pagination;
