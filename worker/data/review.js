const mongoose = require('mongoose');
const axios = require('axios');
mongoose.connect('mongodb://localhost/554_final_travelfrogs');
let reviewSchema = new mongoose.Schema({}, { strict: false });
let Review = mongoose.model('Review', reviewSchema);

const exportedMethods = {

    async getReviewByMovie(movie) {

        try {
            return await Review.find({ 'movie' : movie });
        } catch (error) {
            console.log(error);
        }

    },
    async getReviewByAuthor(data) {

        try {
            return await Review.find({ 'author' : data.author,'movie' : data.movie });
        } catch (error) {
            console.log(error);
        }

    },
}

module.exports = exportedMethods;