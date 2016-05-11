'use strict';

const devices = require('./devices.json');

let results = devices.rows.map( it => {
                            let out = {};
                            out.id = it.doc._id;
                            out.state_code = it.doc.QDP.device.status.design.state_code;
                            out.state_pretty = it.doc.QDP.device.status.design.state_pretty;
                            return out;
                          })
                          .filter( it => it.state_code === '0')
console.dir(results);
