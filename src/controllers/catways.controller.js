/**
 * @module CatwaysController
 * @description CRUD pour les catways.
 */
import Catway from "../models/Catway.js";
/**
 * @swagger
 * tags:
 *   name: Catways
 *   description: Gestion des catways (pontons)
 */

/**
 * @swagger
 * /catways:
 *   get:
 *     summary: Liste tous les catways
 *     tags: [Catways]
 *     responses:
 *       200:
 *         description: Liste des catways
 *   post:
 *     summary: Crée un nouveau catway
 *     tags: [Catways]
 *     responses:
 *       201:
 *         description: Catway créé
 *
 * /catways/{id}:
 *   get:
 *     summary: Récupère un catway par son numéro
 *     tags: [Catways]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Catway trouvé
 *   put:
 *     summary: Met à jour l’état d’un catway
 *     tags: [Catways]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Catway mis à jour
 *   delete:
 *     summary: Supprime un catway
 *     tags: [Catways]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Supprimé
 */

/** Liste tous les catways. */
export const list=async(req,res)=>{const items=await Catway.find().sort({catwayNumber:1});if(req.accepts("html"))return res.render("catways/list",{items});return res.json(items);};
/** Retourne un catway par id (catwayNumber). */
export const getOne=async(req,res)=>{const item=await Catway.findOne({catwayNumber:Number(req.params.id)});if(!item)return res.status(404).json({message:"Not found"});if(req.accepts("html"))return res.render("catways/show",{item});return res.json(item);};
/** Crée un catway. */
export const create=async(req,res)=>{const {catwayNumber,catwayType,catwayState}=req.body;const created=await Catway.create({catwayNumber,catwayType,catwayState});return res.status(201).json(created);};
/** Met à jour uniquement l'état. */
export const update=async(req,res)=>{const {catwayState}=req.body;const updated=await Catway.findOneAndUpdate({catwayNumber:Number(req.params.id)},{catwayState},{new:true});if(!updated)return res.status(404).json({message:"Not found"});return res.json(updated);};
/** Supprime un catway. */
export const remove=async(req,res)=>{const r=await Catway.findOneAndDelete({catwayNumber:Number(req.params.id)});if(!r)return res.status(404).json({message:"Not found"});return res.status(204).end();};
