const { check,body } = require('express-validator')

exports.validate = (method) => {
    switch (method) {
        case 'createUser':
            return [ 
                check('user_first_name').not().isEmpty().withMessage('First Name is required'),
                check('user_last_name').not().isEmpty().withMessage('Last Name is required'),
                check('user_email', 'Email is required').isEmail(),
                check('user_password').not().isEmpty().withMessage('password is required'),
            ] 
        break; 
        case "login" :
            return [ 
                check('username').not().isEmpty().withMessage('Username is required'),
                check('password').not().isEmpty().withMessage('Password is required')
            ]
        break;
    }
}