var keystone = require('keystone'),
    Movie = keystone.list('Movie');

const exportedMethods = {
        
    async getMovieByName(name) {
        return await Movie.model.findOne({'name': name });
    },

    async getMovieById(id) {
        return await Movie.model.findOne({'_id': id });
    },
}

module.exports = exportedMethods;