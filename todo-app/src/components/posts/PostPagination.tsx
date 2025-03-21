import React from "react";
import Link from "next/link";
import "@/styles/post/styles.css";

interface PostPaginationProps {
  pageNumbers: number[];
  currentPageNumber: number;
}

export default function PostPagination({ pageNumbers, currentPageNumber }: PostPaginationProps) {
  console.debug(pageNumbers, currentPageNumber);
  return (
    <div>
      {pageNumbers.map((n) => {
        const pageNumber = n + 1;
        return (<div className="pagination" key={n}>
          <Link href={`/posts/pages/${pageNumber}`}>
            <div className={currentPageNumber === pageNumber ? "active" : "deactive"}>
              {pageNumber}
            </div>
          </Link>
        </div>)
      })}
    </div>
  );
}
