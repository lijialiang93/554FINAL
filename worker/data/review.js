const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/554tf');
let reviewSchema = new mongoose.Schema({}, { strict: false });
let Review = mongoose.model('Review', reviewSchema);

const exportedMethods = {

    async getReviedwByMovie(movie) {

        try {
            return await Review.find({ 'movie' : movie });
        } catch (error) {
            console.log(error);
        }

    },
    async getReviedwByAuthor(author,movie) {

        try {
            return await Review.find({ 'author' : author,'movie' : movie });
        } catch (error) {
            console.log(error);
        }

    },
}

module.exports = exportedMethods;