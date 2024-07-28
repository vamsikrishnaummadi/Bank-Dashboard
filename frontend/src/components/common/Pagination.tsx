interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  setCurrentPage: (arg0: number) => void;
}

function Pagination({
  itemsPerPage,
  totalItems,
  currentPage,
  setCurrentPage,
}: PaginationProps) {
  const pageCount = Math.ceil(totalItems / itemsPerPage);
  const maxVisibleButtons = 4;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.max(
      1,
      currentPage - Math.floor(maxVisibleButtons / 2)
    );
    const endPage = Math.min(pageCount, startPage + maxVisibleButtons - 1);

    if (startPage > 2) {
      pageNumbers.push(1);
      pageNumbers.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (endPage < pageCount - 1) {
      pageNumbers.push("...");
      pageNumbers.push(pageCount);
    }

    console.log({ pageNumbers });
    return pageNumbers;
  };

  return (
    <nav aria-label="Page navigation" className="mt-3 text-end">
      <ul className="inline-flex items-center -space-x-px">
        <li className="relative">
          <button
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
        </li>
        {getPageNumbers().map((number) => (
          <li key={number}>
            {typeof number === "string" ? (
              <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                ...
              </span>
            ) : (
              <button
                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                  currentPage === number
                    ? "bg-[#1814F3] text-white"
                    : "bg-white text-[#1814F3]"
                }`}
                onClick={() => handlePageChange(number)}
              >
                {number}
              </button>
            )}
          </li>
        ))}
        <li className="relative">
          <button
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
            disabled={currentPage === pageCount}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
