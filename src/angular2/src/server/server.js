'use strict';

const config = require('../../gulpfile-config');
const express = require('express');
const app = require('express')();
const httpServer = require('http').Server(app);
const io = require('socket.io')(httpServer);

const jsonserver = require('json-server');
const dbjson = require('./db.json');

//web server config
let web = {};
web.hostname = process.env.HOSTNAME || config.web.hostname || 'localhost';
web.port = process.env.PORT || config.web.port || 8000;
web.directory = `${__dirname}/../../${config.dir.build}`;

// web server
app.use(express.static(web.directory));

// mock json server
app.use(jsonserver.defaults());
app.use('/mock', jsonserver.router(dbjson));

let server = httpServer.listen(web.port, web.address, null, () => {
    let msg = `Web server running at http://${server.address().address}:${server.address().port}`;
    msg += `\nWeb directory: ${web.directory}`;
    console.log(msg);
});

io.on('connection', (socket) => {
    console.log(`New connection: ${socket.id}`);

    socket.on('client-registration', (msg) => {
      let out = {};
      out.message = `New client registration:\n  ${socket.id}`;

      console.log(out.message);
      console.dir(msg);

      socket.emit('client-registration-acknowledgement', out);
    });

    socket.on('new-book', (msg) => {
      socket.emit('new-book', msg);
    });

    socket.on('disconnect', () => {
      console.log(`Client disconnect: ${socket.id}`);
    });
});

setInterval(sendHeartbeat, 1000);

function sendHeartbeat(){
  let now = new Date();
  io.emit('heartbeat', { 'message': {'timestamp': now}});
}
