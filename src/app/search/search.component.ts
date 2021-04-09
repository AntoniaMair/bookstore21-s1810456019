import { Component, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  keyup = new EventEmitter<string>();

  ngOnInit() {
    this.keyup.subscribe((value)=>{
      console.log(value);
    });
  }

}