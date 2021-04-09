import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../shared/book';
import { BookFactory } from '../shared/book-factory';
import { BookStoreService } from '../shared/book-store.service';

@Component({
  selector: 'bs-book-details',
  templateUrl: './book-details.component.html'
})
export class BookDetailsComponent implements OnInit {
  book:Book = BookFactory.empty();

  constructor(private bs: BookStoreService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit() {
    const params = this.route.snapshot.params;
    //übergabe an getSingle um dieses Buch zur erhalten
    this.bs.getSingle(params['isbn']).subscribe(res => this.book = res);
  }

  getRating(num:number){
    return new Array(num);
  }
  removeBook(){
    if(confirm("Wollen Sie das Buch wirklich löschen?")){
      this.bs.remove(this.book.isbn).subscribe(
        rer => {
          this.router.navigate(['../'],{relativeTo:this.route});
        }
      );
    }
  }
}