const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: String,
    country: String,
    age: Number,
    jumps: Array,
});


const PlayerModule = mongoose.model('player', ItemSchema);


module.exports = {
    PlayerModule
}