const { Router } = require('express');
const { check } = require('express-validator');

const { getUsers, createUser, updateUser } = require('../controllers/users');
const { isEmailExist, isUserExistById } = require('../helpers/db-validators');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();


router.get('/', getUsers);

router.post(
    '/',
    [   
        check('email', 'El email no es valido').isEmail(),
        check('email').custom( isEmailExist ),
        check('firstName', 'El nombre es requerido').not().isEmpty(),
        check('lastName', 'El apellido es requerido').not().isEmpty(),
        check('password', 'El password debe tener almenos 6 caracteres').isLength({ min: 6 }),
        validateFields,
    ],
    createUser
);

router.put(
    '/:id', 
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom( isUserExistById ),
        validateFields,
    ],
    updateUser
);


module.exports = router;