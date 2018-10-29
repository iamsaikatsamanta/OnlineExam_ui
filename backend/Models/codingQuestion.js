const mongoose = require('mongoose');

var codingQuestionSchema = mongoose.Schema({
    question: {type: String, required: true},
    inputtc1: {type: String, required: true},
    outputtc1: {type: String, required: true},
    inputtc2: {type: String, required: true},
    outputtc2: {type: String, required: true},
});

module.exports = mongoose.model("CodingQuestion",codingQuestionSchema);