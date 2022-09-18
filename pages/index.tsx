import React from 'react';
import Footer from '../src/components/Footer/Footer';
import Header from '../src/components/Header/Header';
import Form from '../src/components/Form/Form';
import Notification from '../src/components/Notification/Notification';


function Main(props: any) {
  return (
    <section className="section__main">
      <Header userEmail={props.userEmail} logOut={props.logOut} />
      <Form shortLink={props.shortLink} squeeze={props.squeeze} buttonDisableState={props.buttonDisableState} />      
      <Footer />
      <Notification isVisible={props.isNotificationVisible} notificationMessage={props.notificationMessage} />
    </section>
  );
}

export default Main;
