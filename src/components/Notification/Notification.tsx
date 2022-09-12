function Notification(props: any) {
  return (
    <div
      className={
        props.isVisible ? 'notification__container notification__container_visible' : 'notification__container'
      }>
      <span className="notification__message">{props.notificationMessage}</span>
    </div>
  );
}

export default Notification;
