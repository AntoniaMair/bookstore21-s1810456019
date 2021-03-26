import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from '../shared/book';

@Component({
  selector: 'bs-book-details',
  templateUrl: './book-details.component.html'
})
export class BookDetailsComponent implements OnInit {
  @Input() book:Book;
  @Output() showListEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  getRating(num:number){
    return new Array(num);
  }

  showBookList(){
    this.showListEvent.emit();
  }
}