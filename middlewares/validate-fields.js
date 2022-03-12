const { request, response } = require("express");
const { validationResult } = require("express-validator");


const validateFields = (req = request, res = response, next) => {

    const validationsErrors = validationResult(req);

    if( !validationsErrors.isEmpty() ) {

        const messages = validationsErrors.array().map(error => error.msg);

        return res.status(400).json({
            success: false,
            data: null,
            message: messages.join(', '),
        })
    }

    next();
}

module.exports = {
    validateFields,
}