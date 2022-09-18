import React from 'react';
import Table from '../src/components/Table/Table';
import Footer from '../src/components/Footer/Footer';
import Header from '../src/components/Header/Header';
import Notification from '../src/components/Notification/Notification';
import Pagination from '../src/components/Pagination/Pagination';
import Preloader from '../src/components/Preloader/Preloader';
import NotificationStore from '../src/store/notificationStore';

function Statistic(props: any) {

  return (
    <section className="section__main">
      <Header userEmail={props.userEmail} logOut={props.logOut} />      
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
