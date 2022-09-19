import React from 'react';
import Table from '../src/components/Table/Table';
import Footer from '../src/components/Footer/Footer';
import Header from '../src/components/Header/Header';
import Notification from '../src/components/Notification/Notification';
import Pagination from '../src/components/Pagination/Pagination';
import Preloader from '../src/components/Preloader/Preloader';
import NotificationStore from '../src/store/notificationStore';

function Statistic(props: any) {

  /*  function handleFiltering(ID: number, link: string, countFilter: string) {
        setButtonDisableState(true);
        let filteredStats = stats;
        if (ID > 0) {
          filteredStats = stats.filter((linkObject: any) => {
            return linkObject.id.toString().includes(ID);
          });
        }
        if (link.length > 0) {
          filteredStats = filteredStats.filter((linkObject: any) => {
            return linkObject.target.includes(link);
          });
        }
        if (countFilter === 'ASC') {
          filteredStats.sort((a: any, b: any) => {
            return a.counter - b.counter;
          });
        } else if (countFilter === 'DESC') {
          filteredStats.sort((a: any, b: any) => {
            return b.counter - a.counter;
          });
        }
        setMiddleResult(filteredStats);
        handlingNotification('Successful filtering');
        setCurrentPage(1);
        setButtonDisableState(false);
      }

      useEffect(() => {
        setRenderedLinks(middleResult.slice(firstLinkIndex, lastLinkIndex));
      }, [currentPage, middleResult]);
    
      useEffect(() => {
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(middleResult.length / linksPerPage); i++) {
          pageNumbers.push(i);
        }
        setPages(pageNumbers);
      }, [middleResult]);*/

  return (
    <section className="section__main">
      <Header/>      
      {props.isLoading ? (
        <Preloader />
      ) : (
        <>
          <Table
            filtering={props.filtering}
            renderedLinks={props.renderedLinks}
            buttonDisableState={props.buttonDisableState}
            handlingNotification={NotificationStore.handlingNotification}
          />
          <Pagination
            paginate={props.paginate}
            linksPerPage={props.linksPerPage}
            currentPage={props.currentPage}
            pages={props.pages}
          />
        </>
      )}
      <Footer />
      <Notification isVisible={NotificationStore.visibility} notificationMessage={NotificationStore.message} />
    </section>
  );
}

export default Statistic;
