const fs = require('fs');
const path = require('path');
const express = require('express');
const { dir } = require('console');
const app = express();

const req_dir = function(_path, callback, parent_dir=false){
    fs.readdir(_path, (err, files) => {
        if (err) { console.error(err); }
        else {
            let directory = {};
            /*if(parent_dir) {
                directory['Up'] = {
                    link: '..',
                    isDirectory: true
                }
            }*/
            for (const file of files){            
                directory[file] = {};
                if (fs.lstatSync(path.join(_path, file)).isDirectory()){
                    // Is directory
                    directory[file].isDirectory = true;
                } else {
                    directory[file].isDirectory = false;
                }
            }
           
            callback(JSON.stringify(directory));
        }
    });
};

app.get('/*',(req, res, next) => {
    if(req.query.f == 1) {
        let c = req.url.split('/');
        let url = c.slice(1, c.length - 1).join('/');
        req_dir(path.join(__dirname,'public/',url), (files) => {
            res.send(files);
        }, url);
    } else {
        next();
    }
});

app.use(express.static(path.join(__dirname,'public')));

app.listen(80);