const mongoose = require('mongoose');

const marksSchema = mongoose.Schema({
    questionmarks: {type: number, default: 0},
    codingmarks: {type: number, default: 0},
    codingfile: {type: Array}
});