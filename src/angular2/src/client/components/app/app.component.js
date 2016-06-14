'use strict';

import {Component, OnInit} from '@angular/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated';

// For using #location
import {provide} from '@angular/core';
import {LocationStrategy, Location, HashLocationStrategy } from '@angular/common';

// Services (e.g. Providers)
import {HTTP_PROVIDERS} from '@angular/http';
import {AuthorsService} from '../authors/authors.service';
import {BooksService} from '../books/books.service';

// Components
import {SidebarComponent} from '../sidebar/sidebar.component';
import {BooksComponent} from '../books/books.component';
import {AuthorsComponent} from '../authors/authors.component';

// WebSockets
import * as io from 'socket.io-client';

@Component({
  selector: 'my-app',
  directives: [ROUTER_DIRECTIVES, SidebarComponent],
  providers: [AuthorsService, BooksService, HTTP_PROVIDERS, ROUTER_PROVIDERS, provide(LocationStrategy, { useClass: HashLocationStrategy })],
  templateUrl: 'components/app/app.component.html',
  styleUrls: ['components/app/app.component.css']
})
@RouteConfig([
  {
    path: '/books',
    name: 'Books',
    component: BooksComponent,
    useAsDefault: true
  },
  {
    path: '/authors',
    name: 'Authors',
    component: AuthorsComponent
  }
])
export class AppComponent{
  constructor(router){
    this.title = "My First Angular 2 App";
    this.router = router;
    this.socket = undefined;
  }

  // Angular 2 Dependency Injection for ECMAScript 6
  // If you're using TypeScript, you can use @Inject on
  // constructor parameters. Sadly, this is not valid
  // ES6 or ES7 syntax.
  // NOTE: 1st in call order
  static get parameters() {
    return [[Router]];
  }

  ngOnInit() {
    // TODO quit using hardcoded URLs, dammit!
    this.socket = io.connect('http://localhost:8000');
    this.handleClientRegistration();
    this.handleHeartbeat();
  }

  handleClientRegistration(){
    // send message
    this.socket.emit('client-registration', {'message':'Hello from the browser (in Angular2)'});

    // receive message
    this.socket.on('client-registration-acknowledgement', (msg) => {
      console.log('Websocket: client-registration-acknowledgement');
      console.dir(msg);
    });
  }

  handleHeartbeat(){
    this.socket.on('heartbeat', (msg) => {
      console.dir(msg.message.timestamp);
    });

  }


}
