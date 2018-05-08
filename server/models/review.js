var keystone = require('keystone');
var Types = keystone.Field.Types;

// Create a new Keystone list called Recipe
var Review = new keystone.List('Review', {
    defaultSort: '-createdAt',
});

// Finally we are gonna add the fields for our Recipe
Review.add({
    author: {
        type: String
    },
    content: {
        type: String
    },
    movie: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Setting the default order of the columns on the admin tab
Review.defaultColumns = 'author,movie, content, createdAt|15%,';
Review.register();