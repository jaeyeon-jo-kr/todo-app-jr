import React from "react";

export default function PostPagination(
  pageNumbers,
  currentPageNumber,
  setCurrentPage
) {
  return (
    <div className="mt-4 flex justify-center gap-2">
      {pageNumbers.map((n) => (
        <button
          key={n}
          onClick={() => setCurrentPage(n + 1)}
          className={`px-3 py-1 border rounded-lg ${
            currentPageNumber === n + 1
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-700"
          } hover:link-hover-effect`}
        >
          {n + 1}
        </button>
      ))}
    </div>
  );
}
