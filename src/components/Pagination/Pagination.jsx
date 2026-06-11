import "./Pagination.css";

const Pagination = ({ setPage, limit, pagesTab, data }) => {
  return (
    <div className="pagination">
      <button
        onClick={() => {
          setPage(1);
        }}
      >
        {"<<"}
      </button>
      <button
        onClick={() => {
          setPage((prev) => prev - 1);
        }}
      >
        {"prec."}
      </button>
      {pagesTab.map((pageNumber, index) => {
        return (
          <button
            key={index}
            onClick={() => {
              setPage(pageNumber);
            }}
          >
            {pageNumber}
          </button>
        );
      })}
      <button
        onClick={() => {
          setPage((prev) => Math.max(1, prev + 1));
        }}
      >
        {"suiv."}
      </button>
      <button
        onClick={() => {
          setPage(Math.ceil(data.count / limit));
        }}
      >
        {">>"}
      </button>
    </div>
  );
};

export default Pagination;
