const { response, request } = require("express");
const bcrypt = require('bcrypt');

const User = require("../models/user");


const getUsers = async (req = request, res = response) => {
    try {
        const { limit = 5, from = 0 } = req.query;
        
        const [ total, users ] = await Promise.all([
            User.countDocuments(),
            User.find()
                .skip(Number(from))
                .limit(Number(limit))
        ]);

        res.json({
            success: true,
            data: { total, users },
            msg: ''
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            data: null,
            msg: 'Internal server error'
        })
    }
}

const createUser = async (req = request, res = response) => {
    try {
        const { password } = req.body;
        const user = new User( req.body );

        const passwordSalt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, passwordSalt );

        await user.save();

        res.json({
            success: true,
            data: user,
            message: 'Usuario creado exitosamente'
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            data: null,
            message: 'Internal server error'
        })
    }
}

const updateUser = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { password, email, ...rest } = req.body;

        if( password ) {
            const passwordSalt = bcrypt.genSaltSync();
            rest.password = bcrypt.hashSync( password, passwordSalt );
        }

        const user = await User.findByIdAndUpdate(id, rest, { new: true });

        res.json({
            success: true,
            data: user,
            message: 'Usuario actualizado exitosamente'
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            data: null,
            message: 'Internal server error'
        })
    }
}


module.exports = {
    getUsers,
    createUser,
    updateUser
}