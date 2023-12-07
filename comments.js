// Create web server
// npm install express --save
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var data = fs.readFileSync('data.json');
var comments = JSON.parse(data);
var path = require('path');
var publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 3000);
app.get('/comment', function (req, res) {
    console.log('GET comment route');
    res.send(comments);
});
app.post('/comment', function (req, res) {
    console.log('POST comment route');
    console.log(req.body);
    comments.unshift(req.body);
    fs.writeFile('data.json', JSON.stringify(comments), function (err) {
        console.log(err);
    });
    res.send(comments);
});
app.delete('/comment', function (req, res) {
    console.log('DELETE comment route');
    console.log(req.body);
    comments.splice(req.body.index, 1);
    fs.writeFile('data.json', JSON.stringify(comments), function (err) {
        console.log(err);
    });
    res.send(comments);
});
app.listen(app.get('port'), function () {
    console.log('Server started: http://localhost:' + app.get('port') + '/');
});