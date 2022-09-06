import Table from "../table/Table";
import { testLinks } from "../utils/testLinks";
import Footer from "../footer/Footer";
import Header from "../header/header";
import Form from "../Form/Form";



function Main(props:any) {
   
  
  return (
    <section className="section__main">
      <Header/>
      <Form/>
       <Table links={[]}/>
       <Footer/>
    </section>
  );
}

export default Main;
