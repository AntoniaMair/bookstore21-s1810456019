import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { BookListComponent } from "./book-list/book-list.component";
import { BookListItemComponent } from './book-list-item/book-list-item.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookStoreService } from './shared/book-store.service';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { SearchComponent } from './search/search.component';
import { BookFormComponent } from './book-form/book-form.component';

@NgModule({
  imports: [BrowserModule, ReactiveFormsModule,AppRoutingModule, HttpClientModule],
  declarations: [AppComponent, BookListComponent, BookListItemComponent, BookDetailsComponent, HomeComponent, SearchComponent, BookFormComponent],
  bootstrap: [AppComponent],
  providers: [BookStoreService]
})
export class AppModule {}
