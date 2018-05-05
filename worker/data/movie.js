const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/554tf');
let movieSchema = new mongoose.Schema({}, { strict: false });
let Movie = mongoose.model('Movie', movieSchema);

const exportedMethods = {

    async getMovieByName(name) {

        try {
            return await Movie.find({ 'name':{ $regex : name }});
        } catch (error) {
            console.log(error);
        }

    },

    async getMovieById(id) {
        try {
            return await Movie.findOne({ '_id': id });
        } catch (error) {
            console.log(error);
        }

    }
}

module.exports = exportedMethods;