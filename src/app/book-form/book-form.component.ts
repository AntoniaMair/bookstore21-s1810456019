import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookStoreService } from '../shared/book-store.service';

@Component({
  selector: 'bs-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {

  bookForm: FormGroup;

  constructor(private fb:FormBuilder, private bs:BookStoreService, private route:ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

}