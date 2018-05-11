const mongoose = require('mongoose');
const axios = require('axios');
mongoose.connect('mongodb://localhost/554tf');
let reviewSchema = new mongoose.Schema({}, { strict: false });
let Review = mongoose.model('Review', reviewSchema);

const exportedMethods = {

    async getReviewByMovie(movie) {

        try {
            let result = await Review.find({ 'movie' : movie });
            console.log(result);
            if (result === null) {
                return result;
            }
            for (i = 0; i < result.length; i++) {
                let res = await axios.get('http://localhost:3000/api/getUserAvatarByEmail?email=' + result[i].get('author'));
                    console.log(res);
                    if (res.data.image !== false) {
                        result[i].set('avatar', res.data.image);
                        result[i].save();
                    }
            }
            return result;
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