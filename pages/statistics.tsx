import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Table from '../src/components/Table/Table';
import Footer from '../src/components/Footer/Footer';
import Header from '../src/components/Header/Header';
import Notification from '../src/components/Notification/Notification';
import Pagination from '../src/components/Pagination/Pagination';
import Preloader from '../src/components/Preloader/Preloader';
import NotificationStore from '../src/store/notificationStore';
import mainStore from '../src/store/mainStore';
import statisticsStore from '../src/store/statisticsStore';
import notificationStore from '../src/store/notificationStore';
import mainApi from '../src/utils/Api';

const Statistics = observer((data: any) => {
  
    React.useEffect(() => {                  
          mainStore.setIsLoading(true);
          mainApi
            .getStatistics(localStorage.getItem('access_token') ?? '', 1, 500)
            .then((stats) => {
              statisticsStore.setStats(stats);
              statisticsStore.setMiddleResults(stats);
              statisticsStore.setRenderedLinks(stats.slice(statisticsStore.firstLinkIndex, statisticsStore.lastLinkIndex));
              mainStore.setIsLoading(false);
              mainApi
                .getStatistics(localStorage.getItem('access_token') ?? '', 500, 5000)
                .then((res: any) => {
                    statisticsStore.setStats(stats.concat(res));
                    statisticsStore.setMiddleResults(stats.concat(res));
                })
                .catch((err) => console.log('Ошибка:', err));
            })
            .catch((err) => console.log('Ошибка:', err));        
      }, []);
  

  function handleFiltering(ID: number, link: string, countFilter: string) {
    mainStore.setButtonDisableState(true);
    let filteredStats = statisticsStore.stats;
    if (ID > 0) {
      filteredStats = statisticsStore.stats.filter((linkObject: any) => {
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
    statisticsStore.setMiddleResults(filteredStats);
    notificationStore.handlingNotification('Successful filtering');
    statisticsStore.setCurrentPage(1);
    mainStore.setButtonDisableState(false);
  }

  useEffect(() => {
    statisticsStore.setRenderedLinks(
      statisticsStore.middleResults.slice(statisticsStore.firstLinkIndex, statisticsStore.lastLinkIndex),
    );
  }, [statisticsStore.currentPage, statisticsStore.middleResults]);

  useEffect(() => {
    const pageNumbers: any[] = [];
    for (let i = 1; i <= Math.ceil(statisticsStore.middleResults.length / statisticsStore.linksPerPage); i++) {
      pageNumbers.push(i);
    }
    statisticsStore.setPages(pageNumbers);
  }, [statisticsStore.middleResults]);

  return (
    <section className="section__main">
      <Header />
      {mainStore.isLoading ? (
        <Preloader />
      ) : (
        <>
          <Table
            filtering={handleFiltering}
            renderedLinks={statisticsStore.renderedLinks}
            buttonDisableState={mainStore.buttonDisableState}
            handlingNotification={NotificationStore.handlingNotification}
          />
          <Pagination
            paginate={statisticsStore.setCurrentPage}
            linksPerPage={statisticsStore.linksPerPage}
            currentPage={statisticsStore.currentPage}
            pages={statisticsStore.pages}
          />
        </>
      )}
      <Footer />
      <Notification isVisible={NotificationStore.visibility} notificationMessage={NotificationStore.message} />
    </section>
  );
});

export default Statistics;


