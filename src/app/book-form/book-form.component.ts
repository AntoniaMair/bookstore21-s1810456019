import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookFactory } from '../shared/book-factory';
import { BookStoreService } from '../shared/book-store.service';
import { BookFormErrorMessages } from './book-form-error-messages';

@Component({
  selector: 'bs-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {

  bookForm: FormGroup;
  book = BookFactory.empty();
  isUpdatingBook = false;
  errors: {[key:string]:string}={};
  images: FormArray;


  constructor(private fb:FormBuilder, private bs:BookStoreService, private route:ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const isbn = this.route.snapshot.params['isbn'];
    if(isbn){
      this.isUpdatingBook = true;
      this.bs.getSingle(isbn).subscribe(book =>{
        this.book = book;
        this.initBook();
      });
    }
    this.initBook();
  }

  initBook(){
    //Wir bauen das Formular Modell
    //Links der Wert des Form controls, rechts was wir zuweisen wollen
    this.bookForm = this.fb.group({
      title: [this.book.title, Validators.required]
    });
    this.bookForm.statusChanges.subscribe(() =>{
      this.updateErrorMessages();
    }
    );
  }

  updateErrorMessages(){
    this.errors = {};
    for(const message of BookFormErrorMessages){
      const control = this.bookForm.get(message.forControl)
      if(control && control.dirty && control.invalid && control.errors[message.forValidator] && !this.errors[message.forControl]){
        this.errors[message.forControl] = message.text;
      }
    }
  }
  addThumbnailControl(){

  }

  submitForm(){

  }




}