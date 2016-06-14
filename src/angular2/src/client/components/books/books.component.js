'use strict';

import {Component, EventEmitter} from '@angular/core';
import {BooksService} from './books.service';
import {BookFormComponent} from './book-form.component';
import {WebsocketService} from '../websocket/websocket.service';

@Component({
  selector: 'my-books',
  templateUrl: 'components/books/books.component.html',
  styleUrls: ['components/books/books.component.css'],
  directives: [BookFormComponent],
  outputs: ['listChanged']
})
export class BooksComponent{
  constructor(booksService, websocketService){
    this.title = "Books";
    this.booksService = booksService;
    this.websocketService = websocketService;
    this.books = [];
    this.heartbeat = undefined;



    // EventEmitter for this component
    this.listChanged = new EventEmitter();
    this.listChanged.subscribe( (listChanged) => {
      console.log("listChanged event caught");
      this.getBooks();
    });


  }

  static get parameters(){
    return [[BooksService], [WebsocketService]];
  }

  ngOnInit(){
    this.getBooks();
    this.handleHeartbeat();

  }

  getBooks(){
    this.booksService.getList()
                     .subscribe(
                       books => this.books = books,
                       error => this.errorMessage = error
                     )
  }

  delete(book){
    this.booksService.delete(book)
                     .subscribe(
                       result => {
                         console.log(result);
                         //  this.getBooks();
                         this.listChanged.next();
                       },
                       error => this.errorMessage = error
                     )

  }

  handleHeartbeat(){
    this.websocketService.socket.on('heartbeat', (msg) => {
      // console.dir(msg.message.timestamp);
      // this.heartbeat = msg.message.timestamp;
      this.heartbeat = new Date(msg.message.timestamp).getTime();
    });
  }
}
