const uuid = require("uuid/v4");
const pathPlug = require("path");
var keystone = require('keystone');
var Types = keystone.Field.Types;

// Create a new Keystone list called Recipe
var Movie = new keystone.List('Movie', {
    autokey: { path: 'slug', from: 'name', unique: true },
    defaultSort: '-createdAt',
});

// Adding the option to add an image to our Recipe from
var movieImgStorage = new keystone.Storage({
    adapter: keystone.Storage.Adapters.FS,
    fs: {
        // required; path where the files should be stored
        path: keystone.expandPath('server/public/img/movie'),
        generateFilename: function (file, index) {
            return uuid() + pathPlug.extname(file.originalname);
        },
        whenExists: 'error',
        // path where files will be served
        publicPath: '/public/img/movie',
    },
});

// Finally we are gonna add the fields for our Recipe
Movie.add({
    name: {
        type: String,
        required: true
    },
    state: {
        type: Types.Select,
        options: 'draft, published, archived',
        default: 'draft'
    },
    author: {
        type: Types.Relationship,
        ref: 'User',
    },
    director: {
        type: Types.Html,
        wysiwyg: true,
        height: 150,
    },
    stars: {
        type: Types.Html,
        wysiwyg: true,
        height: 150,
    },
    genre: {
        type: Types.Select,
        options: 'Action, Adventure, Sci-fi',
    },
    runningTime: {
        type: Types.Number,
    },
    mpaa: {
        type: Types.Select,
        options: 'G, PG, PG-13, R, NC-17',
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    releaseDate: Date,
    image: {
        type: Types.File,
        storage: movieImgStorage,
        mimetype: '.jpeg, .jpg, .gif, .svg',
    },
    storyline: {
        type: Types.Html,
        wysiwyg: true,
        height: 500,
    },
});

// Setting the default order of the columns on the admin tab
Movie.defaultColumns = 'name, state|20%, author, publishedAt|15%';
Movie.register();