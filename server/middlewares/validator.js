import { body, validationResult } from "express-validator";

const registerRules = () => [
    body("firstName", "Le prénom n'est pas valide").notEmpty().isLength({ max: 20 }),
    body("lastName", "Le nom n'est pas valide").notEmpty().isLength({ max: 20 }),
    body("email", "L'email n'est pas valide").isEmail(),
    body("password", "Le mot de passe n'est pas valide").isLength({
        min: 6,
        max: 20,
    }),
];

const loginRules = () => [
    body("email", "L'email n'est pas valide").isEmail(),
    body("password", "Le mot de passe n'est pas valide").isLength({
        min: 6,
        max: 20,
    }),
];

const customErrors = (Array) => Array.map((err) => ({ msg: err.msg }));

const validator = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(customErrors(errors.array()));
    } else {
        next();
    }
};

export {
    registerRules,
    loginRules,
    validator,
};
