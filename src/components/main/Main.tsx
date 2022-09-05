import DataGrid from 'react-data-grid';


function Main() {
    const columns = [
        { key: 'Link', name: 'Link' },
        { key: 'ShortLink', name: 'ShortLink' },
        { key: 'TrasitionCount', name: 'TrasitionCount' }
      ];
      
      const rows = [
        { id: 0, title: 'Example' },
        { id: 1, title: 'Demo' }
      ];
  
  return (
    <section className="section__main">
       <DataGrid columns={columns} rows={rows} />
    </section>
  );
}

export default Main;
