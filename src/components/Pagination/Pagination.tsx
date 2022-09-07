function Pagination(props: any) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(props.totalLinksNow / props.linksPerPage); i++) {
    pageNumbers.push(i);
  } 

  return (
    <ul className="pagination">
      <li className="pagination__page">
        <button
          className={
            props.currentPage === 1 ? 'pagination__page-link pagination__page-link_active' : 'pagination__page-link'
          }
          onClick={() => props.paginate(1)}>
          1
        </button>
      </li>
      <span className={props.currentPage - 1 > 5 ? 'pagination__span' : 'pagination__span_invisible'}>. . .</span>
      {pageNumbers.map((page) => {
        if (page === 1 || page === pageNumbers.length) {
          return null;
        }
        return (
          <li
            className={
              page === pageNumbers.length ||
              (props.currentPage >= page && props.currentPage - page < 5) ||
              (page >= props.currentPage && page - props.currentPage < 5)
                ? 'pagination__page'
                : 'pagination__page pagination__page_invisible'
            }
            key={page}>
            <button
              className={
                props.currentPage === page
                  ? 'pagination__page-link pagination__page-link_active'
                  : 'pagination__page-link'
              }
              onClick={() => props.paginate(page)}>
              {page}
            </button>
          </li>
        );
      })}
      <span className={pageNumbers.length - props.currentPage > 5 ? 'pagination__span' : 'pagination__span_invisible'}>
        . . .
      </span>
      <li className="pagination__page">
        <button
          className={
            props.currentPage === pageNumbers.length ? 'pagination__page-link pagination__page-link_active' : 'pagination__page-link'
          }
          onClick={() => props.paginate(pageNumbers.length)}>
          {pageNumbers.length}
        </button>
      </li>      
    </ul>
  );
}
export default Pagination;
