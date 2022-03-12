const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    createdDate: {
        type: Date,
        default: new Date()
    }
})

UserSchema.methods.toJSON = function() {
    const { __v, password, ...user } = this.toObject();
    return user;
}

module.exports = model('User', UserSchema);