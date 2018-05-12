const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/554_final_travelfrogs');
let movieSchema = new mongoose.Schema({}, { strict: false });
let Movie = mongoose.model('Movie', movieSchema);

const exportedMethods = {
    async updateTotalRating(id, newRating) {
        try {

            var ratedMovie = await Movie.findOne({ '_id': id });

            if (ratedMovie !== undefined) {
                let totalRating = parseInt(ratedMovie.get('totalRating'));
                let totalRatedPeople = parseInt(ratedMovie.get('totalRatedPeople'));
                totalRating += parseInt(newRating);
                totalRatedPeople++;
                rating = totalRating / totalRatedPeople;
                const updateCommand = {
                    $set: {
                        'totalRating': totalRating,
                        'totalRatedPeople': totalRatedPeople,
                        'rating': rating
                    }
                };
                const query = {
                    _id: id,
                };
                let result = await Movie.updateOne(query, updateCommand);
                if (result.ok == 1) {
                    return 'success';
                }
                else {
                    return 'failed';
                }

            }


        } catch (error) {
            console.log(error);
        }

    },
    async getTopRatedMovies(number) {

        try {
            return await Movie.find({ 'state': 'published' }).sort('-rating').limit(number);
        } catch (error) {
            console.log(error);
        }

    },
    async getMovieByName(name) {

        try {
            return await Movie.find(
                {
                    'name': { $regex: new RegExp(name, "i") },
                    'state': 'published'
                });
        } catch (error) {
            console.log(error);
        }

    },

    async getMovieById(id) {
        try {
            return await Movie.findOne({ '_id': id, 'state': 'published' });
        } catch (error) {
            console.log(error);
        }

    }
}

module.exports = exportedMethods;