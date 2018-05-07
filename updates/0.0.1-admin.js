var keystone = require('keystone');
var User = keystone.list('User');
var Movie = keystone.list('Movie');
exports = module.exports = function (done) {
    new User.model({
        name: 'admin',
        email: 'admin@keystonejs.com',
        password: 'admin',
        canAccessKeystone: true,
    }).save();

    new User.model({
        name: 'testuser',
        email: 'user@keystonejs.com',
        password: 'user',
        canAccessKeystone: false,
    }).save();

    new Movie.model({
        name: 'Black Panther',
        state: 'published',
        director: 'Ryan Coogler',
        genre: 'Action',
        image: {
            filename: 'a7b92708-32dd-43fd-9047-452dd506ee08.jpg',
            size: 242421,
            mimetype: 'image/jpeg'
        },
        mpaa: 'PG-13',
        runningTime: 134,
        stars: 'Chadwick Boseman, Michael B. Jordan, Lupita Nyongo',
        storyline: 'After the events of Captain America: Civil War, King TChalla returns home to the reclusive, technologically advanced African nation of Wakanda to serve as his countrys new leader. However, TChalla soon finds that he is challenged for the throne from factions within his own country. When two foes conspire to destroy Wakanda, the hero known as Black Panther must team up with C.I.A. agent Everett K. Ross and members of the Dora Milaje, Wakandan special forces, to prevent Wakanda from being dragged into a world war. Written by Editor',
        popularity: 8
    }).save();

    new Movie.model({
        name: 'Avengers: Infinity War',
        state: 'published',
        director: 'Anthony Russo, Joe Russo',
        genre: 'Action',
        image: {
            filename: '35733991-102a-4a4e-b2cf-0bd196fe25e2.jpg',
            size: 233352,
            mimetype: 'image/jpeg'
        },
        mpaa: 'PG-13',
        runningTime: 149,
        stars: 'Robert Downey Jr., Chris Hemsworth, Mark Ruffalo',
        storyline: 'As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos. A despot of intergalactic infamy, his goal is to collect all six Infinity Stones, artifacts of unimaginable power, and use them to inflict his twisted will on all of reality. Everything the Avengers have fought for has led up to this moment - the fate of Earth and existence itself has never been more uncertain. Written by Marvel Studios',
        popularity: 10
    }).save();

    new Movie.model({
        name: 'Ready Player One',
        state: 'published',
        director: 'Steven Spielberg',
        genre: 'Action',
        image: {
            filename: '671513e1-415c-4bf9-8387-b716cf1f855a.jpg',
            size: 227195,
            mimetype: 'image/jpeg'
        },
        mpaa: 'PG-13',
        runningTime: 140,
        stars: 'Tye Sheridan, Olivia Cooke, Ben Mendelsohn',
        storyline: 'In the year 2045, the real world is a harsh place. The only time Wade Watts (Tye Sheridan) truly feels alive is when he escapes to the OASIS, an immersive virtual universe where most of humanity spends their days. In the OASIS, you can go anywhere, do anything, be anyone-the only limits are your own imagination. The OASIS was created by the brilliant and eccentric James Halliday (Mark Rylance), who left his immense fortune and total control of the Oasis to the winner of a three-part contest he designed to find a worthy heir. When Wade conquers the first challenge of the reality-bending treasure hunt, he and his friends-aka the High Five-are hurled into a fantastical universe of discovery and danger to save the OASIS. Written by Warner Bros.',
        popularity: 9
    }).save(done);
};
