const fs = require('fs');
const path = require('path');

const imagesDir = './public/photographs/new';
const images = [];

fs.readdirSync(imagesDir).forEach((file) => {
  if (path.extname(file) === '.jpg') {
    images.push({
      src: `/photographs/${file}`,
      alt: path.basename(file, '.jpg'),
      tags: [], // You can add tags here if needed
    });
  }
});

console.log('Images: ' + images.map(JSON.stringify).join(', '));
