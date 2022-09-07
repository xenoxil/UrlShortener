
import Table from "../Table/Table";
import Footer from "../Footer/Footer";
import Header from "../Header/header";
import Form from "../Form/Form";
import Notification from '../Notification/Notification';




function Main(props:any) {
  
  return (
    <section className="section__main">
      <Header userEmail={props.userEmail} logOut={props.logOut}/>
      <Form shortLink={props.shortLink} squeeze={props.squeeze} />
       <Table links={props.links} filtering={props.filtering} filtered={props.filtered} isFiltered={props.isFiltered}/>
       <Footer/>
       <Notification isVisible={props.isNotificationVisible} notificationMessage={props.notificationMessage} />
    </section>
  );
}

export default Main;
