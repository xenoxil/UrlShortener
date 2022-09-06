import React,{useEffect,useState} from "react";
import Table from "../Table/Table";
import Footer from "../Footer/Footer";
import Header from "../Header/header";
import Form from "../Form/Form";
import mainApi from "../utils/Api";



function Main(props:any) {
 /* const [array,setArray]=useState([])
  useEffect(()=>{
      mainApi.getStatistics(localStorage.getItem('access_token') ?? '')
      .then((res)=>{
         setArray(res);
      })
      .catch((err)=>{
console.log(err);
      })
  },[])*/
   
  
  return (
    <section className="section__main">
      <Header userEmail={props.userEmail} logOut={props.logOut}/>
      <Form shortLink={props.shortLink} squeeze={props.squeeze}/>
       <Table links={props.links}/>
       <Footer/>
    </section>
  );
}

export default Main;
