/**
 * @module UsersController
 * @description CRUD pour les utilisateurs.
 */
import bcrypt from "bcryptjs";import User from "../models/User.js";
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gestion des utilisateurs
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Liste les utilisateurs
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/User' }
 *   post:
 *     summary: Crée un utilisateur
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/UserCreate' }
 *     responses:
 *       201: { description: Créé }
 *
 * /users/{email}:
 *   get:
 *     summary: Détail d'un utilisateur par email
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/User' }
 *       404: { description: Not found }
 *   put:
 *     summary: Met à jour un utilisateur (username et/ou password)
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username: { type: string }
 *               password: { type: string }
 *     responses:
 *       200: { description: OK }
 *       404: { description: Not found }
 *   delete:
 *     summary: Supprime un utilisateur
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       204: { description: Supprimé }
 *       404: { description: Not found }
 */

/** Liste les users. */export const list=async(req,res)=>{const users=await User.find().select("-passwordHash");if(req.accepts("html"))return res.render("users/list",{users});return res.json(users);};
/** Détail par email. */export const getOne=async(req,res)=>{const u=await User.findOne({email:req.params.email}).select("-passwordHash");if(!u)return res.status(404).json({message:"Not found"});if(req.accepts("html"))return res.render("users/show",{u});return res.json(u);};
/** Création. */export const create=async(req,res)=>{const {username,email,password}=req.body;const exists=await User.findOne({$or:[{email},{username}]});if(exists)return res.status(409).json({message:"User exists"});const passwordHash=await bcrypt.hash(password,10);const u=await User.create({username,email,passwordHash});return res.status(201).json({id:u._id,username,email});};
/** Update. */export const update=async(req,res)=>{const {username,password}=req.body;const updates={};if(username)updates.username=username;if(password)updates.passwordHash=await bcrypt.hash(password,10);const u=await User.findOneAndUpdate({email:req.params.email},updates,{new:true});if(!u)return res.status(404).json({message:"Not found"});return res.json({id:u._id,username:u.username,email:u.email});};
/** Delete. */export const remove=async(req,res)=>{const r=await User.findOneAndDelete({email:req.params.email});if(!r)return res.status(404).json({message:"Not found"});return res.status(204).end();};
