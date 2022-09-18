import { makeAutoObservable } from 'mobx';

class NotificationStore {
  visibility: any = false;
  message: any = '';
  constructor() {
    makeAutoObservable(this);
  }

  handlingNotification(notificationMessage: string) {
    this.message = notificationMessage;
    this.visibility = true;
    setTimeout(() => {
      this.visibility = false;
    }, 5000);
  }
}

export default new NotificationStore();
