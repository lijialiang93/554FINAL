const uuid = require("uuid/v4");
const pathPlug = require("path");
var keystone = require('keystone');
var Types = keystone.Field.Types;

var Movie = new keystone.List('Movie', {
    autokey: { path: 'slug', from: 'name', unique: true },
    defaultSort: '-createdAt',
});

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

Movie.add({
    name: {
        type: String,
        required: true
    },
    state: {
        type: Types.Select,
        options: 'draft, published, archived',
        default: 'draft',
        required: true
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
        options: 'Action, Adventure, Animation, Comedy, Crime, Fantasy, Horror, Sci-fi',
        default: "Action",
        required: true
    },
    runningTime: {
        type: Types.Number,
        default: 0,
    },
    mpaa: {
        type: Types.Select,
        options: 'G, PG, PG-13, R, NC-17',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
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
    rating: {
        type: Number,
        default:0,
        hidden: true
    },
    totalRating: {
        type: Number,
        default:0,
        hidden: true
    },
    totalRatedPeople: {
        type: Number,
        default:0,
        hidden: true
    }
});

// Setting the default order of the columns on the admin tab
Movie.defaultColumns = 'name, state|20%, author, publishedAt|15%';
Movie.register();