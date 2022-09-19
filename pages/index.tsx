import React from 'react';
import {observer} from 'mobx-react-lite'
import Footer from '../src/components/Footer/Footer';
import Header from '../src/components/Header/Header';
import Form from '../src/components/Form/Form';
import Notification from '../src/components/Notification/Notification';
import NotificationStore from '../src/store/notificationStore';


const  Main = observer(()=>{
  return (
    <section className="section__main">
      <Header />
      <Form />
      <Footer />
      <Notification isVisible={NotificationStore.visibility} notificationMessage={NotificationStore.message} />
    </section>
  );

}) 

export default Main;
