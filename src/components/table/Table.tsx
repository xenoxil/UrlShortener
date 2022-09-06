function Table(props: any) {
  return (
    <table className="table" border={1}>
      <caption className="table__header">Your links and transition stats</caption>
      <tbody>
      <tr className="table__subHeader">
        <th className="table__linkIdColumn">ID</th>
        <th className="table__linkColumn">Link</th>
        <th className="table__shortLinkColumn">ShortLink</th>
        <th className="table__amountColumn">TransitionAmount</th>
      </tr>
      {props.links.length > 0 ? (
        props.links.map((linkObject: any) => {
          return (            
              <tr className="table__row" key={linkObject.id} >
                <td className="table__linkIdCell">{linkObject.id}</td>
                <td className="table__linkCell"><p className="table__linkCell">{linkObject.target}</p></td>
                <td className="table__shortLinkCell"><p className="table__shortLinkCell">{`http://79.143.31.216/s/${linkObject.short}`}</p></td>
                <td className="table__amountCell">{linkObject.counter}</td>
              </tr>            
          );
        })
      ) : (
        <tr className="table__row"  >
                <td className="table__linkIdCell">Nothing</td>
                <td className="table__linkCell"><p className="table__linkCell">found</p></td>
                <td className="table__shortLinkCell"><p className="table__shortLinkCell">‿︵‿ヽ(°□° )ノ︵‿︵</p></td>
                <td className="table__amountCell"></td>
              </tr>       
      )}
      </tbody>
    </table>
  );
}

export default Table;
