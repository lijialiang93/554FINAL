var keystone = require('keystone');
var Types = keystone.Field.Types;

var Review = new keystone.List('Review', {
    defaultSort: '-createdAt',
});

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

Review.defaultColumns = 'author,movie, content, createdAt|15%,';
Review.register();