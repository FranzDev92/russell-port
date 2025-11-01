import "dotenv/config";
import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import {Strategy as LocalStrategy} from "passport-local";
import bcrypt from "bcryptjs";
import path from "path";
import {fileURLToPath} from "url";
import {connectDb} from "./db.js";
import User from "./models/User.js";
import Reservation from "./models/Reservation.js";
import catwaysRoutes from "./routes/catways.routes.js";
import reservationsRoutes from "./routes/reservations.routes.js";
import usersRoutes from "./routes/users.routes.js";
import docsRoutes from "./routes/docs.routes.js";
import authRoutes from "./routes/auth.routes.js";
import {ensureAuth} from "./middleware/auth.js";

const __filename=fileURLToPath(import.meta.url);const __dirname=path.dirname(__filename);
const app=express();
await connectDb();
app.use(express.urlencoded({extended:true}));app.use(express.json());
app.use(session({secret:process.env.SESSION_SECRET,resave:false,saveUninitialized:false,store:MongoStore.create({mongoUrl:process.env.MONGODB_URI})}));
passport.use(new LocalStrategy({usernameField:"email"},async(email,password,done)=>{try{const u=await User.findOne({email});if(!u)return done(null,false);const ok=await bcrypt.compare(password,u.passwordHash);return ok?done(null,u):done(null,false);}catch(e){return done(e);}}));
passport.serializeUser((u,done)=>done(null,u.id));passport.deserializeUser(async(id,done)=>{const u=await User.findById(id);done(null,u);});
app.use(passport.initialize());app.use(passport.session());
app.set("view engine","ejs");app.set("views",path.join(__dirname,"views"));app.use(express.static(path.join(__dirname,"public")));

app.get("/",(req,res)=>res.render("home"));
app.get("/dashboard",ensureAuth,async(req,res)=>{const today=new Date();today.setHours(0,0,0,0);const tomorrow=new Date(today);tomorrow.setDate(tomorrow.getDate()+1);const rows=await Reservation.find({startDate:{$lte:tomorrow},endDate:{$gte:today}}).sort({catwayNumber:1,startDate:1}).lean();res.render("dashboard",{user:req.user,today,rows});});
app.use(authRoutes);
app.use(catwaysRoutes);
app.use(reservationsRoutes);
app.use(usersRoutes);
app.use(docsRoutes);

const port=process.env.PORT||3000;
app.listen(port,()=>console.log("Server on "+port));
