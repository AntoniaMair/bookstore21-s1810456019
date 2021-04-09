import { Component, EventEmitter, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'bs-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  keyup = new EventEmitter<string>();

  ngOnInit() {
    this.keyup.pipe(debounceTime(500))
    .pipe(distinctUntilChanged())
    .subscribe(value=>{
      console.log(value);
    });
  }

}