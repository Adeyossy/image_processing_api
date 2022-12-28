"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var image_processor_1 = __importDefault(require("../image_processing/image_processor"));
var fs_1 = __importDefault(require("fs"));
var router = express_1.default.Router();
var assetsDirectory = path_1.default.join(__dirname, '..', 'assets');
var fullAssetsDirectory = path_1.default.join(assetsDirectory, 'full');
var thumbDirectory = path_1.default.join(assetsDirectory, 'thumb');
if (!fs_1.default.existsSync(thumbDirectory)) {
    fs_1.default.mkdirSync(thumbDirectory);
}
router.get('/images', function (req, res) {
    var query = req.query;
    var widthExists = Object.prototype.hasOwnProperty.call(query, 'width');
    var heightExists = Object.prototype.hasOwnProperty.call(query, 'height');
    if (Object.prototype.hasOwnProperty.call(query, 'filename')) {
        var imagePath = path_1.default.join(fullAssetsDirectory, "".concat(query.filename, ".jpg"));
        if (fs_1.default.existsSync(imagePath)) {
            // If image exists, continue to check if width and/or height parameters were supplied
            if (widthExists && heightExists) {
                // Check if image has been cached
                // First create cached image path
                var cachedImagePath_1 = path_1.default.join(thumbDirectory, "".concat(query.filename, "_").concat(query.width, "x").concat(query.height, ".jpg"));
                if (!fs_1.default.existsSync(cachedImagePath_1)) {
                    var info = (0, image_processor_1.default)(imagePath, Number(query.width), Number(query.height), cachedImagePath_1);
                    info
                        .then(function (value) {
                        res.sendFile(cachedImagePath_1);
                    })
                        .catch(function (error) {
                        res.send(error.message);
                    });
                }
                else {
                    res.sendFile(cachedImagePath_1);
                }
            }
            else {
                if (widthExists) {
                    res.send('No height property supplied');
                }
                if (heightExists) {
                    res.send('<h1>No width property supplied</h1>');
                }
                res.send('Neither width nor height were set');
            }
        }
    }
    else {
        res.send('No file name supplied');
    }
    // res.sendFile(__dirname + '/images/icelandwaterfall.jpg');
});
exports.default = router;
