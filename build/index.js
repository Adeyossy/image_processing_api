"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
app.get('/', function (req, res) {
    // console.log('req => ', req.params);
    res.send('Hello Heavenly Apps');
});
app.get('/pictures', function (req, res) {
    res.sendFile(__dirname + '/images/icelandwaterfall.jpg');
});
app.listen(3000, function () {
    console.log('Now listening on port 3000');
});
