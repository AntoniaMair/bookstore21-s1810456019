import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../shared/book';
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
    this.buildThumbnailsArray();
    this.bookForm = this.fb.group({
      id: this.book.id,
      title: [this.book.title, Validators.required],
      subtitle: this.book.subtitle,
      isbn: [this.book.isbn, [Validators.required, 
      Validators.minLength(10), 
      Validators.maxLength(13)]],
      description: this.book.description,
      rating: [this.book.rating, [Validators.min(0), Validators.max(10)]],
      published: this.book.published,
      images: this.images
    });
    this.bookForm.statusChanges.subscribe(() =>{
      this.updateErrorMessages();
    });
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
    this.images.push(this.fb.group({url:null, title:null}));
  }

  submitForm(){
    console.log(this.bookForm.value);
    //Filters null-values
    this.bookForm.value.images = this.bookForm.value.images.filter((thumbnail) => thumbnail.url);
    const book:Book = BookFactory.fromObject(this.bookForm.value);
    console.log(book);

  }

  buildThumbnailsArray(){
    this.images = this.fb.array([]);
    for(let img of this.book.images){
      let fg = this.fb.group({
        //Formcontrol bauen ohne Formbuilder
        id:new FormControl(img.id),
        url: new FormControl(img.url, [Validators.required]),
        title: new FormControl(img.title, [Validators.required]),
      });
      this.images.push(fg);
    }
  }




}