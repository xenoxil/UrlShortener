
import Table from "../Table/Table";
import Footer from "../Footer/Footer";
import Header from "../Header/header";
import Form from "../Form/Form";




function Main(props:any) {
  
  return (
    <section className="section__main">
      <Header userEmail={props.userEmail} logOut={props.logOut}/>
      <Form shortLink={props.shortLink} squeeze={props.squeeze} />
       <Table links={props.links} filtering={props.filtering} filtered={props.filtered}/>
       <Footer/>
    </section>
  );
}

export default Main;
