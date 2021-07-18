import express from "express"
import {signIn,signUp, googleSignIn, forgotPassword,resetPassword, getAuthUser} from "../controllers/auth.controller";
import {loginRules,registerRules,validator} from "../middlewares/validator"
import {auth,authGoogle,authGoogleCallback} from '../middlewares/auth'

const router = express.Router();

router.route("/signup").post(registerRules(),validator,signUp);

router.route("/signin").post(loginRules(),validator,signIn);

router.route('/google').get(authGoogle)

router.route('/google/callback').get(authGoogleCallback,googleSignIn)

router.route("/current").get(auth, getAuthUser);

router.route("/forgotpassword").post(forgotPassword);

router.route("/resetpassword/:resetToken").post(resetPassword);

export default router;