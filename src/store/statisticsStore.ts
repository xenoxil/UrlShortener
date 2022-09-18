import { makeAutoObservable } from 'mobx';

class statisticStore {
  currentPage: number = 1;
  linksPerPage: number = 10;
  pages: number[] = [];
  lastLinkIndex = this.currentPage * this.linksPerPage;
  firstLinkIndex = this.lastLinkIndex - this.linksPerPage;

  constructor() {
    makeAutoObservable(this);
  }


  setCurrentPage(page:number){
    this.currentPage=page;
  }
  setLinksPerPage(linksNumber:number){
    this.linksPerPage=linksNumber;
  }
  


}

export default new statisticStore();
