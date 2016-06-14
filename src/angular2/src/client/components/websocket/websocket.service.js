'use strict';

import {Injectable} from '@angular/core';

// WebSockets
import * as io from 'socket.io-client';

@Injectable()
export class WebsocketService{
  constructor(){
    this.socket = undefined;
    this.init();
  }

  init(){
    // TODO quit using hardcoded URLs, dammit!
    this.socket = io.connect('http://localhost:8000');
  }
}
