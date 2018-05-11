var keystone = require('keystone');
var User = keystone.list('User');
var Movie = keystone.list('Movie');
var Review = keystone.list('Review');
var Rate = keystone.list('Rate');
exports = module.exports = function (done) {
    new User.model({
        name: 'admin',
        email: 'admin@keystonejs.com',
        password: 'admin',
        image: {
            filename: 'aeb66425-4ab7-44ae-bdd4-276b26ec9da3.png',
            size: 41487,
            mimetype: 'image/png'
        },
        canAccessKeystone: true,
    }).save();

    new User.model({
        name: 'testuser',
        email: 'user@keystonejs.com',
        password: 'user',
        image: {
            filename: 'aeb66425-4ab7-44ae-bdd4-276b26ec9de2.png',
            size: 41487,
            mimetype: 'image/png'
        },
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
        rating: 0,
        totalRating: 0,
        totalRatedPeople: 0
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
        rating: 0,
        totalRating: 0,
        totalRatedPeople: 0
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
        rating: 0,
        totalRating: 0,
        totalRatedPeople: 0
    }).save();

    new Movie.model({
        name: 'Inception',
        state: 'published',
        director: 'Christopher Nolan',
        genre: 'Sci-fi',
        image: {
            filename: 'd0a55d08-936c-4139-91b9-066d731ad9ba.jpg',
            size: 198173,
            mimetype: 'image/jpeg'
        },
        mpaa: 'PG-13',
        runningTime: 148,
        stars: 'Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page',
        storyline: 'Dom Cobb is a skilled thief, the absolute best in the dangerous art of extraction, stealing valuable secrets from deep within the subconscious during the dream state, when the mind is at its most vulnerable. Cobb\'s rare ability has made him a coveted player in this treacherous new world of corporate espionage, but it has also made him an international fugitive and cost him everything he has ever loved. Now Cobb is being offered a chance at redemption. One last job could give him his life back but only if he can accomplish the impossible - inception. Instead of the perfect heist, Cobb and his team of specialists have to pull off the reverse: their task is not to steal an idea but to plant one. If they succeed, it could be the perfect crime. But no amount of careful planning or expertise can prepare the team for the dangerous enemy that seems to predict their every move. An enemy that only Cobb could have seen coming. Written by Warner Bros. Pictures',
        rating: 0,
        totalRating: 0,
        totalRatedPeople: 0
    }).save();
    
    new Movie.model({
        name: 'My Neighbor Totoro',
        state: 'published',
        director: 'Hayao Miyazaki',
        genre: 'Animation',
        image: {
            filename: '021704c7-8925-4d66-93db-eec403f695aa.jpg',
            size: 327040,
            mimetype: 'image/jpeg'
        },
        mpaa: 'G',
        runningTime: 86,
        stars: 'Hitoshi Takagi, Noriko Hidaka, Chika Sakamoto',
        storyline: 'Two young girls, 10-year-old Satsuki and her 4-year-old sister Mei, move into a house in the country with their father to be closer to their hospitalized mother. Satsuki and Mei discover that the nearby forest is inhabited by magical creatures called Totoros (pronounced toe-toe-ro). They soon befriend these Totoros, and have several magical adventures. Written by Christopher E. Meadows',
        rating: 0,
        totalRating: 0,
        totalRatedPeople: 0
    }).save();

    new Movie.model({
        name: 'Pacific Rim',
        state: 'published',
        director: 'Guillermo del Toro',
        genre: 'Adventure',
        image: {
            filename: 'cb6a70dc-c716-41c4-bae2-b4230b37dcef.jpg',
            size: 205687,
            mimetype: 'image/jpeg'
        },
        mpaa: 'PG-13',
        runningTime: 131,
        stars: 'Idris Elba, Charlie Hunnam, Rinko Kikuchi',
        storyline: 'When monstrous creatures, known as Kaiju, started rising from the sea, a war began that would take millions of lives and consume humanity\'s resources for years on end. To combat the giant Kaiju, a special type of weapon was devised: massive robots, called Jaegers, which are controlled simultaneously by two pilots whose minds are locked in a neural bridge. But even the Jaegers are proving nearly defenseless in the face of the relentless Kaiju. On the verge of defeat, the forces defending mankind have no choice but to turn to two unlikely heroes - a washed up former pilot (Charlie Hunnam) and an untested trainee (Rinko Kikuchi) - who are teamed to drive a legendary but seemingly obsolete Jaeger from the past. Together, they stand as mankind\'s last hope against the mounting apocalypse. Written by Del Torro',
        rating: 0,
        totalRating: 0,
        totalRatedPeople: 0
    }).save();

    new Movie.model({
        name: 'Back to the Future',
        state: 'published',
        director: 'Robert Zemeckis',
        genre: 'Adventure',
        image: {
            filename: '12bbf089-3922-4131-976d-5bda5a00649c.jpg',
            size: 199211,
            mimetype: 'image/jpeg'
        },
        mpaa: 'PG',
        runningTime: 116,
        stars: 'Michael J. Fox, Christopher Lloyd, Lea Thompson',
        storyline: 'Marty McFly, a typical American teenager of the Eighties, is accidentally sent back to 1955 in a plutonium-powered DeLorean "time machine" invented by a slightly mad scientist. During his often hysterical, always amazing trip back in time, Marty must make certain his teenage parents-to-be meet and fall in love - so he can get back to the future. Written by Robert Lynch',
        rating: 0,
        totalRating: 0,
        totalRatedPeople: 0
    }).save();

    new Movie.model({
        name: 'Your Name',
        state: 'published',
        director: 'Makoto Shinkai',
        genre: 'Fantasy',
        image: {
            filename: '8aef8935-192a-4923-a744-a342540affa8.jpg',
            size: 175938,
            mimetype: 'image/jpeg'
        },
        mpaa: 'PG',
        runningTime: 106,
        stars: 'Ryunosuke Kamiki, Mone Kamishiraishi, Ryo Narita',
        storyline: 'Mitsuha is the daughter of the mayor of a small mountain town. She\'s a straightforward high school girl who lives with her sister and her grandmother and has no qualms about letting it be known that she\'s uninterested in Shinto rituals or helping her father\'s electoral campaign. Instead she dreams of leaving the boring town and trying her luck in Tokyo. Taki is a high school boy in Tokyo who works part-time in an Italian restaurant and aspires to become an architect or an artist. Every night he has a strange dream where he becomes...a high school girl in a small mountain town. Written by Happy_Evil_Dude',
        rating: 0,
        totalRating: 0,
        totalRatedPeople: 0
    }).save();

    new Movie.model({
        name: 'Train to Busan',
        state: 'published',
        director: 'Sang-ho Yeon',
        genre: 'Horror',
        image: {
            filename: 'c6e4e37c-d21e-4b2d-93e1-389dcd27cc57.jpg',
            size: 95386,
            mimetype: 'image/jpeg'
        },
        mpaa: 'PG-13',
        runningTime: 118,
        stars: 'Yoo Gong, Yu-mi Jung, Dong-seok Ma',
        storyline: 'Sok-woo, a father with not much time for his daughter, Soo-ahn, are boarding the KTX, a fast train that shall bring them from Seoul to Busan. But during their journey, the apocalypse begins, and most of the earth\'s population become flesh craving zombies. While the KTX is shooting towards Busan, the passenger\'s fight for their families and lives against the zombies - and each other.',
        rating: 0,
        totalRating: 0,
        totalRatedPeople: 0
    }).save();

    new Movie.model({
        name: 'The Shawshank Redemption',
        state: 'published',
        director: 'Frank Darabont',
        genre: 'Crime',
        image: {
            filename: 'fea2ebf2-f147-4f17-b4c0-56e5271b3ee4.jpg',
            size: 1007234,
            mimetype: 'image/jpeg'
        },
        mpaa: 'R',
        runningTime: 142,
        stars: 'Tim Robbins, Morgan Freeman, Bob Gunton',
        storyline: 'Chronicles the experiences of a formerly successful banker as a prisoner in the gloomy jailhouse of Shawshank after being found guilty of a crime he did not commit. The film portrays the man\'s unique way of dealing with his new, torturous life; along the way he befriends a number of fellow prisoners, most notably a wise long-term inmate named Red. Written by J-S-Golden',
        rating: 0,
        totalRating: 0,
        totalRatedPeople: 0
    }).save();

    new Movie.model({
        name: 'Spirited Away',
        state: 'published',
        director: 'Hayao Miyazaki, Kirk Wise',
        genre: 'Animation',
        image: {
            filename: 'a85c15d6-d691-4c89-993f-2c23fe7385df.jpg',
            size: 103651,
            mimetype: 'image/jpeg'
        },
        mpaa: 'PG',
        runningTime: 125,
        stars: 'Daveigh Chase, Suzanne Pleshette, Miyu Irino',
        storyline: 'During her family\'s move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.',
        rating: 0,
        totalRating: 0,
        totalRatedPeople: 0
    }).save();

    new Movie.model({
        name: 'The Godfather',
        state: 'published',
        director: 'Francis Ford Coppola',
        genre: 'Crime',
        image: {
            filename: '1cce3c01-ac3e-4abd-92e3-f8cb7929b1ba.jpg',
            size: 111386,
            mimetype: 'image/jpeg'
        },
        mpaa: 'R',
        runningTime: 175,
        stars: 'Marlon Brando, Al Pacino, James Caan',
        storyline: 'When the aging head of a famous crime family decides to transfer his position to one of his subalterns, a series of unfortunate events start happening to the family, and a war begins between all the well-known families leading to insolence, deportation, murder and revenge, and ends with the favorable successor being finally chosen. Written by J. S. Golden',
        rating: 0,
        totalRating: 0,
        totalRatedPeople: 0
    }).save(done);
};
