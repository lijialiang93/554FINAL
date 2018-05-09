const MovieData = require("./movie");
const userData = require('./user');
const reviewData = require('./review');
const rateData = require('./rate');

module.exports = {
    movie: MovieData,
    user: userData,
    review: reviewData,
    rate: rateData
};