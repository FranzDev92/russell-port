import {Router} from "express";
import passport from "passport";
import {login,logout} from "../controllers/auth.controller.js";
const r=Router();
r.post("/login",passport.authenticate("local",{failureRedirect:"/"}),login);
r.get("/logout",logout);
export default r;
