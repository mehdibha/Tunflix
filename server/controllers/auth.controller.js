import User from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config";

const signUp = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, msg: "L'email est déjà utilisé" });
        }
        user = new User({ firstName, lastName, email, password });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        delete user['password'];

        const payload = {
            userId: user.id,
        };
        
        const token = jwt.sign(payload, config.jwtSecret, { expiresIn: "7d" });

        res.status(201).json({
            token: `Bearer ${token}`,
            user
        });
    } catch (err) {
        res.status(500).json([{ msg: err.message }]);
    }
};

const signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json([{ msg: "Email ou mot de passe incorrect" }]);
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json([{ msg: "Email ou mot de passe incorrect" }]);
        }

        const payload = {
            userId: user.id,
        };
        const token = jwt.sign(payload, config.jwtSecret, { expiresIn: "7d" });
        res.status(201).json({
            token: `Bearer ${token}`,
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            },
        });
    } catch (error) {
        res.json([{ msg: error }]);
    }
};

const googleSignIn = (req, res) => {
    try {
        const payload = {
            userId: req.user.id,
        };
        const token = jwt.sign(payload, config.jwtSecret, { expiresIn: "7d" });
        res.cookie('auth-cookie',`Bearer ${token}`)
        res.redirect('http://localhost:3000/browse')
    } catch (error) {
        res.send([{ msg: err.message }])
    }
};

const forgotPassword = async (req, res) => {
    try {
        res.send("forgotPWD is ok");
    } catch (error) {
        res.send(error);
    }
};

const resetPassword = async (req, res) => {
    try {
        res.send("resetPWD is ok");
    } catch (error) {
        res.send(error);
    }
};

const getAuthUser = (req, res) => {
    try {
        res.send({ user: req.user });
    } catch (error) {
        res.status(401).send([{msg:'Unauthorized'}])
    }
};

export { signUp, signIn, forgotPassword, resetPassword, getAuthUser, googleSignIn };
