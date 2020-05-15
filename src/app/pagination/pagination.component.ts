import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  page: number;
  itensPerPage: number;
  limit: number = 5;
  public pages = [];

  @Input() currentPage: number;
  @Output() changePage = new EventEmitter();

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    for(let i = 1; i <= this.limit; i++){
      this.pages.push(i);
    }
  }

  previousPage() {
    if(this.currentPage != 1) {
      this.currentPage -= 1;
      this.changePage.emit(this.currentPage);
    }
  }

  goToPage(event) {
    this.currentPage = parseFloat(event.target.innerHTML);
    this.changePage.emit(event.target.innerHTML);
  }
  
  nextPage() {
    if(this.currentPage != 5) {
      this.currentPage += 1;
      this.changePage.emit(this.currentPage);
    }
  }
}
