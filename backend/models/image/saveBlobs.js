'use strict'
const fs = require('fs');
const Image = require('./image');

module.exports = async function( blobs) {
  let ret = []; // blobs.map( async (fd) => {
  for( let i=0; i<blobs.length; i++){
    const fd = blobs[i];
    const data = fs.readFileSync(fd.path);
    const image = new Image( {
      data, contentType: fd.mimetype
    });
    await image.save();
    ret.push( image._id);
  }
  return ret;
}
