import { makeAutoObservable } from 'mobx';

class mainStore {
  userEmail: string = '';
  loggedInState: boolean = false;
  token: string = '';
  buttonDisableState: boolean = false;
  isLoading: boolean = false;


  constructor() {
    makeAutoObservable(this);
  }

  setButtonDisableState(state: boolean) {
    this.buttonDisableState = state;
  }
  setUserEmail(email: string) {
    this.userEmail = email;
  }
  setLoggedInState(state: boolean) {
    this.loggedInState = state;
  }
  setIsLoading(state:boolean){
    this.isLoading = state;
  }
  
  }

  


export default new mainStore();
