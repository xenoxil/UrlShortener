import { makeAutoObservable } from 'mobx';

class mainStore {
  userEmail: string = '';  
  loggedInState:boolean = false;    
  token:string = '';
  buttonDisableState:boolean =false;
  isLoading:boolean=false;
  
  /*const [currentPage, setCurrentPage] = useState(1);
  const [linksPerPage] = useState(10);
  const [pages, setPages] = useState<number[]>([]);

  const lastLinkIndex = currentPage * linksPerPage;
  const firstLinkIndex = lastLinkIndex - linksPerPage;*/


  constructor() {
    makeAutoObservable(this);
  }

  
  }


export default new mainStore();
