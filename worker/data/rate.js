const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/554_final_travelfrogs');
let rateSchema = new mongoose.Schema({}, { strict: false });
let Rate = mongoose.model('Rate', rateSchema);

const exportedMethods = {

    async getRateByMovie(movie) {

        try {
            return await Rate.find({ 'movie' : movie });
        } catch (error) {
            console.log(error);
        }

    },
    async getRateByAuthor(data) {
        try {
            return await Rate.find({ author : data.author,'movie' : data.movie });
        } catch (error) {
            console.log(error);
        }

    },
}

module.exports = exportedMethods;