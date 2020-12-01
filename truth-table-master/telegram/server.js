const htmlConvert = require('html-convert');
const fs = require('fs');

if (fs.existsSync("out.png")){
    fs.unlinkSync("out.png");
}

var convert = htmlConvert({
    format      : 'png',
    crop: false,
    quality     : 200,         // The default image quality. Defaults to 100. Only relevant for jpeg format.
    width       : 2000,        // Changes the width size. Defaults to 1280
    height      : 2000,         // Changes the height size. Defaults to 960
});


// convert a website url

fs.createReadStream('Truth table.html')
    .pipe(convert())
    .pipe(fs.createWriteStream('out.png'))
    .on('finish',function(){console.log(fs.existsSync("out.png"))})

let html = "<h1>Hello</h1>";

