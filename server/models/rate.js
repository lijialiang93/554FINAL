var keystone = require('keystone');
var Types = keystone.Field.Types;

var Rate = new keystone.List('Rate', {
    defaultSort: '-createdAt',
});

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

Rate.defaultColumns = 'author,movie, rate, createdAt|15%,';
Rate.register();