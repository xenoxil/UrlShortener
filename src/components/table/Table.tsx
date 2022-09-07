import React, { useEffect, useRef, useState } from 'react';

function Table(props: any) {
  const idFilter = useRef<any>();
  const linkFilter = useRef<any>();
  const [countSort, setSort] = useState<string>('NSRT');

  function filterClick(e: any) {
    e.preventDefault();
    props.filtering(idFilter.current.value, linkFilter.current.value, countSort);
  }

  return (
    <table className="table" border={1}>
      <caption className="table__header">Links and transition stats</caption>
      <tbody>
        <tr className="table__subHeader">
          <th className="table__linkIdColumn">ID</th>
          <th className="table__linkColumn">Link</th>
          <th className="table__shortLinkColumn">ShortLink</th>
          <th className="table__amountColumn">TransitionAmount</th>
        </tr>
        <tr>
          <th className="table__filter">
            <input className="table__filterId" type="number" ref={idFilter} />
          </th>
          <th>
            <input className="table__filterLink" type="text" ref={linkFilter} />
          </th>
          <th>
            <button type="button" className="table__filterBtn" onClick={filterClick}>
              Filter
            </button>
          </th>
          <th>
            <select
              className="table__filterCount"
              name="CountSort"
              id="Count"
              onChange={(e) => setSort(e.target.value)}>
              <option value="NSRT">Not sorted</option>
              <option value="ASC">Ascending</option>
              <option value="DESC">Descending</option>
            </select>
          </th>
        </tr>
        {props.filtered.length > 0 ? (
          props.filtered.map((linkObject: any) => {
            return (
              <tr className="table__row" key={linkObject.id}>
                <td className="table__linkIdCell">{linkObject.id}</td>
                <td className="table__linkCell">
                  <p className="table__linkCell">{linkObject.target}</p>
                </td>
                <td className="table__shortLinkCell">
                  <p
                    className="table__shortLinkCell"
                    onClick={() => {
                      navigator.clipboard.writeText(`http://79.143.31.216/s/${linkObject.short}`);
                    }}>{`http://79.143.31.216/s/${linkObject.short}`}</p>
                </td>
                <td className="table__amountCell">{linkObject.counter}</td>
              </tr>
            );
          })
        ) : props.links.length > 0 ? (
          props.links.map((linkObject: any) => {
            return (
              <tr className="table__row" key={linkObject.id}>
                <td className="table__linkIdCell">{linkObject.id}</td>
                <td className="table__linkCell">
                  <p className="table__linkCell">{linkObject.target}</p>
                </td>
                <td className="table__shortLinkCell">
                  <p
                    className="table__shortLinkCell"
                    onClick={() => {
                      navigator.clipboard.writeText(`http://79.143.31.216/s/${linkObject.short}`);
                    }}>
                    {`http://79.143.31.216/s/${linkObject.short}`}
                  </p>
                </td>
                <td className="table__amountCell">{linkObject.counter}</td>
              </tr>
            );
          })
        ) : (
          <tr className="table__row">
            <td className="table__linkIdCell">Nothing</td>
            <td className="table__linkCell">
              <p className="table__linkCell">found</p>
            </td>
            <td className="table__shortLinkCell">
              <p className="table__shortLinkCell">‿︵‿ヽ(°□° )ノ︵‿︵</p>
            </td>
            <td className="table__amountCell"></td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default Table;
