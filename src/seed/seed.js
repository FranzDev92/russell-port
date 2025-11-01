// src/seed/seed.js
import "dotenv/config";
import fs from "fs";
import bcrypt from "bcryptjs";
import {connectDb} from "../db.js";
import User from "../models/User.js";
import Catway from "../models/Catway.js";
import Reservation from "../models/Reservation.js";
const load=jsonPath=>JSON.parse(fs.readFileSync(jsonPath,"utf-8"));
await connectDb();
await User.deleteMany({});await Catway.deleteMany({});await Reservation.deleteMany({});
const admin=await User.create({username:process.env.ADMIN_USERNAME,email:process.env.ADMIN_EMAIL,passwordHash:await bcrypt.hash(process.env.ADMIN_PASSWORD,10)});
const catways=load("./catways.json");const reservations=load("./reservations.json");
await Catway.insertMany(catways);await Reservation.insertMany(reservations);
console.log("Seed done:",admin.email);process.exit(0);
