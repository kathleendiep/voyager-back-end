const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voyagerSchema = new Schema({
    name: {type: String, required: true},
    location: {type: String, required: true},
    address: {type: String, required: false},
    category: {type: String, required: true},
    img:[{type: String, required: false}],
    link: {type: String, required: false},
    description: {type: String, required: false},
    // userId: {type: Schema.Types.ObjectId, ref: 'User', required: true}
}, {timestamps: true})


const Voyager = mongoose.model('Voyager', voyagerSchema);

module.exports = Voyager


