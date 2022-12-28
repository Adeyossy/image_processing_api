"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var routes_1 = __importDefault(require("./routes/routes"));
var app = (0, express_1.default)();
app.get('/', function (req, res) {
    // console.log('req => ', req.params);
    res.send('Hello Heavenly Apps');
});
app.use('/api', routes_1.default);
app.listen(3000, function () {
    console.log('Now listening on port 3000');
});
exports.default = app;
