import Table from '../Table/Table';
import Footer from '../Footer/Footer';
import Header from '../Header/header';
import Form from '../Form/Form';
import Notification from '../Notification/Notification';
import Pagination from '../Pagination/Pagination';
import Preloader from '../Preloader/Preloader';

function Main(props: any) {
  return (
    <section className="section__main">
      <Header userEmail={props.userEmail} logOut={props.logOut} />
      <Form shortLink={props.shortLink} squeeze={props.squeeze} buttonDisableState={props.buttonDisableState} />
      {props.isLoading ? 
      <Preloader/>     
      
      :(<div>
        <Table      
      filtering={props.filtering}
      renderedLinks={props.renderedLinks}      
      buttonDisableState={props.buttonDisableState}
      handlingNotification={props.handlingNotification}
    />
    <Pagination 
    paginate={props.paginate}
    linksPerPage={props.linksPerPage}
    currentPage={props.currentPage}
    pages={props.pages}    
    />
      </div>
      )}
      <Footer />
      <Notification isVisible={props.isNotificationVisible} notificationMessage={props.notificationMessage} />
    </section>
  );
}

export default Main;
