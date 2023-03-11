const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Can't be black"]
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "Can't be blank"]
    },
    password: {
        type: String,
        required: [true, "Can't be blank"]
    },
    picture: {
        type: String,
    },
    newMessages: {
        type: Object,
        default: {}
    },
    status: {
        type: String,
        default: 'online'
    },
    contacts: {
        type: Array,
        default: []
    }
}, { minimize: false });

// it deletes the password on convertion to json
UserSchema.set('toJSON', {
    transform: function (_, ret, _) {
        delete ret['password']
        return ret
    }
})

const User = mongoose.model("User", UserSchema);

module.exports = User;