import "./Pagination.css";

const Pagination = ({ page, setPage, limit, pagesTab = [], data }) => {
  if (!data) return null;

  const pagesPerView = 10;

  const totalPages = pagesTab.length;

  const startIndex = Math.min(Math.max(0, page - 1), totalPages - pagesPerView);

  const visiblePages = pagesTab.slice(startIndex, startIndex + pagesPerView);

  return (
    <div className="pagination wrapper">
      <div className="btn-pagination" onClick={() => setPage(1)}>
        <p>{"<<"}</p>
      </div>

      <div
        className="btn-pagination"
        onClick={() => setPage((prev) => Math.max(1, prev - 1))}
      >
        <p>PRECEDENT</p>
      </div>

      {visiblePages.map((pageNumber) => (
        <div
          className={`page-pagination ${page === pageNumber ? "active" : ""}`}
          key={pageNumber}
          onClick={() => setPage(pageNumber)}
        >
          {pageNumber}
        </div>
      ))}

      <div
        className="btn-pagination"
        onClick={() =>
          setPage((prev) => Math.min(Math.ceil(data.count / limit), prev + 1))
        }
      >
        <p>SUIVANT</p>
      </div>

      <div
        className="btn-pagination"
        onClick={() => setPage(Math.ceil(data.count / limit))}
      >
        <p>{">>"}</p>
      </div>
    </div>
  );
};
export default Pagination;
