var keystone = require('keystone');
var Types = keystone.Field.Types;

// Create a new Keystone list called Recipe
var Rate = new keystone.List('Rate', {
    defaultSort: '-createdAt',
});

// Finally we are gonna add the fields for our Recipe
Rate.add({
    author: {
        type: String
    },
    rate: {
        type: Number
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
Rate.defaultColumns = 'author,movie, rate, createdAt|15%,';
Rate.register();