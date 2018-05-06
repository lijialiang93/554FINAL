const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/554tf');
let userSchema = new mongoose.Schema({}, { strict: false });
let User = mongoose.model('Users', userSchema);

const exportedMethods = {

    async getUserByEmail(email) {

        try {
            return await User.find({ 'email' : email });
        } catch (error) {
            console.log(error);
        }

    },
}

module.exports = exportedMethods;