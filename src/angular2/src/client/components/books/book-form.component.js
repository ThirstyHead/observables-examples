'use strict';

import {Component} from '@angular/core';
import {NgForm} from '@angular/common';
import {Book} from './book';
import {BooksService} from './books.service';
import {WebsocketService} from '../websocket/websocket.service';


@Component({
    selector: 'my-book-form',
    templateUrl: 'components/books/book-form.component.dialog.html',
    styleUrls: ['components/books/book-form.component.css'],
    host:{
      '(iron-overlay-closed)':'dialogClose($event)'
    },
    outputs: ['listChanged']
})
export class BookFormComponent{
    constructor(booksService, websocketService){
      this.booksService = booksService;
      this.websocketService = websocketService;
      this.formats = ['Paper', 'PDF', 'EPub'];
      this.book = new Book({});
    }

    static get parameters(){
      return [[BooksService], [WebsocketService]];
    }

    dialogClose(e){
      if(e.srcElement.id === 'bookDialog'){
        this.saveBook();
      }
    }

    saveBook(){
      this.booksService.create(this.book)
                       .subscribe(
                         item => {
                           this.book = item;
                           console.dir(this.book);
                           this.websocketService.socket.emit('new-book', {'message': this.book})
                         },
                         err => console.error(err)
                       );
    }
}
