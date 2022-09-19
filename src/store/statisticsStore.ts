import { makeAutoObservable } from 'mobx';

class statisticStore {
  currentPage: number = 1;
  linksPerPage: number = 10;
  pages: number[] = [];
  lastLinkIndex = this.currentPage * this.linksPerPage;
  firstLinkIndex = this.lastLinkIndex - this.linksPerPage;
  stats:any[]=[];
  middleResults:any[]=[];
  renderedLinks:any[]=[];

  constructor() {
    makeAutoObservable(this);
  }

  setStats(newStats:any){
    this.stats=newStats;
  }


  setCurrentPage(page:number){
    this.currentPage=page;
  }
  setPages(pages:any){
    this.pages=pages;
  }
  setLinksPerPage(linksNumber:number){
    this.linksPerPage=linksNumber;
  }
  setMiddleResults(results:any){
    this.middleResults=results;
  }
  setRenderedLinks(results:any){
    this.renderedLinks=results;
  }
}

export default new statisticStore();
