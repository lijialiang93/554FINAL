const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/554_final_travelfrogs');
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

    async getUserById(id) {

        try {
            return await User.findOne({ '_id' : id });
        } catch (error) {
            console.log(error);
        }

    }
}

module.exports = exportedMethods;