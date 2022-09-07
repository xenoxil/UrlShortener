function Pagination(props: any) {
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
      {props.pages.map((page: any) => {
        if (page === 1 || page === props.pages.length) {
          return null;
        }
        return (
          <li
            className={
              page === props.pages.length ||
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
      <span className={props.pages.length - props.currentPage > 5 ? 'pagination__span' : 'pagination__span_invisible'}>
        . . .
      </span>
      <li className={props.pages.length > 1 ? 'pagination__page' : 'pagination__page pagination__page_invisible'}>
        <button
          className={
            props.currentPage === props.pages.length
              ? 'pagination__page-link pagination__page-link_active'
              : 'pagination__page-link'
          }
          onClick={() => props.paginate(props.pages.length)}>
          {props.pages.length}
        </button>
      </li>
    </ul>
  );
}
export default Pagination;
