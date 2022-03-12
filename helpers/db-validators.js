const User = require('../models/user');


const isEmailExist = async ( email = '' ) => {
    const emailExist = await User.findOne({ email });
    if( emailExist ) throw new Error(`Este usuario ya esta registrado`);
}

const isUserExistById = async ( id ) => {
    const userExist = await User.findById(id);
    if( !userExist ) throw new Error('El usuario no existe');
}


module.exports = {
    isEmailExist,
    isUserExistById
}