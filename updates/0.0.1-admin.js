var keystone = require('keystone');
var User = keystone.list('User');
var Movie = keystone.list('Movie');
exports = module.exports = function (done) {
    new User.model({
        name: { first: 'admin', last: 'user' },
        email: 'admin@keystonejs.com',
        password: 'admin',
        canAccessKeystone: true,
    }).save();

    new User.model({
        name: { first: 'test', last: 'user' },
        email: 'user@keystonejs.com',
        password: 'user',
        canAccessKeystone: false,
    }).save();

    new Movie.model({
        name: 'RPO',
        state: 'published',
        director: '<p>11</p>',
        genre: 'Action',
        image: {
            filename: '671513e1-415c-4bf9-8387-b716cf1f855a.jpg',
            size: 227195,
            mimetype: 'image/jpeg'
        },
        mpaa: 'PG-13',
        runningTime: 140,
        stars: '<p>22</p>',
        storyline: '<p>3333</p>'
    }).save();

    new Movie.model({
        name: 'RPO2',
        state: 'published',
        director: '<p>11</p>',
        genre: 'Action',
        image: {
            filename: '671513e1-415c-4bf9-8387-b716cf1f855a.jpg',
            size: 227195,
            mimetype: 'image/jpeg'
        },
        mpaa: 'PG-13',
        runningTime: 140,
        stars: '<p>22</p>',
        storyline: '<p>3333</p>'
    }).save(done);
};
