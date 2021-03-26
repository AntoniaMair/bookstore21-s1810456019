import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Book, Image, Author } from "../shared/book";
import { BookStoreService } from "../shared/book-store.service";

@Component({
  selector: "bs-book-list",
  templateUrl: "./book-list.component.html"
})
export class BookListComponent implements OnInit {
  books: Book[];

  @Output() showDetailsEvent = new EventEmitter<Book>();

  constructor(private bs:BookStoreService) {}

  showDetails(book:Book){
      this.showDetailsEvent.emit(book);
  }

  ngOnInit() {
    this.books = this.bs.getAll();
  }
}
