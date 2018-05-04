var keystone = require('keystone'),
    Movie = keystone.list('Movie');

const exportedMethods = {
        
    async getMovieByName(name) {
        return await Movie.model.findOne({'name': name });
    }
}

module.exports = exportedMethods;