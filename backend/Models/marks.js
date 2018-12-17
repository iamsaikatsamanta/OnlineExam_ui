const mongoose = require('mongoose');

const marksSchema = mongoose.Schema({
    questionmarks: {type: Number, default: 0},
    codingmarks: {type: Number, default: 0},
    codingfile: {type: Array},
    total: {type: Number, default: 0},
    user: {type: String, required: true}
});
module.exports = mongoose.model('Marks', marksSchema);
