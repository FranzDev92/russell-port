/**
 * @module ReservationsController
 * @description CRUD pour les réservations (sous-ressource de catway).
 */
import Catway from "../models/Catway.js";
import Reservation from "../models/Reservation.js";

/** Page index des réservations: liste des catways avec liens. */
export const index=async(req,res)=>{const items=await Catway.find().sort({catwayNumber:1}).lean();return res.render("reservations/index",{items});};

/**
 * @swagger
 * tags:
 *   name: Reservations
 *   description: Réservations d'un catway
 */

/**
 * @swagger
 * /catways/{id}/reservations:
 *   get:
 *     summary: Liste les réservations pour un catway
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: { type: integer }
 *         required: true
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Reservation' }
 *   post:
 *     summary: Crée une réservation pour un catway
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: { type: integer }
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/Reservation' }
 *     responses:
 *       201: { description: Créé }
 *   put:
 *     summary: Met à jour une réservation (id dans le body)
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: { type: integer }
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/Reservation' }
 *     responses:
 *       200: { description: OK }
 *       400: { description: Missing _id }
 *       404: { description: Not found }
 *
 * /catways/{id}/reservations/{idReservation}:
 *   get:
 *     summary: Détail d'une réservation
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: { type: integer }
 *         required: true
 *       - in: path
 *         name: idReservation
 *         schema: { type: string }
 *         required: true
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Reservation' }
 *       404: { description: Not found }
 *   put:
 *     summary: Met à jour une réservation (id dans l'URL)
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: { type: integer }
 *         required: true
 *       - in: path
 *         name: idReservation
 *         schema: { type: string }
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/Reservation' }
 *     responses:
 *       200: { description: OK }
 *       404: { description: Not found }
 *   delete:
 *     summary: Supprime une réservation
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: { type: integer }
 *         required: true
 *       - in: path
 *         name: idReservation
 *         schema: { type: string }
 *         required: true
 *     responses:
 *       204: { description: Supprimée }
 *       404: { description: Not found }
 *
 * /catway/{id}/reservations/{idReservation}:
 *   get:
 *     summary: Alias (singulier) détail d'une réservation
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: { type: integer }
 *         required: true
 *       - in: path
 *         name: idReservation
 *         schema: { type: string }
 *         required: true
 *     responses:
 *       200: { description: OK }
 *       404: { description: Not found }
 *   delete:
 *     summary: Alias (singulier) suppression d'une réservation
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: { type: integer }
 *         required: true
 *       - in: path
 *         name: idReservation
 *         schema: { type: string }
 *         required: true
 *     responses:
 *       204: { description: Supprimée }
 *       404: { description: Not found }
 */

/** Liste les réservations d'un catway. */
export const list=async(req,res)=>{const id=parseInt(req.params.id,10);const items=await Reservation.find({catwayNumber:id}).sort({startDate:1}).lean();if(req.accepts("html"))return res.render("reservations/list",{items,catway:id});return res.json(items);};

/** Détail d'une réservation. */
export const getOne=async(req,res)=>{const item=await Reservation.findById(req.params.idReservation).lean();if(!item)return res.status(404).json({message:"Not found"});if(req.accepts("html"))return res.render("reservations/show",{item});return res.json(item);};

/** Crée une réservation. */
export const create=async(req,res)=>{const id=parseInt(req.params.id,10);const {clientName,boatName,startDate,endDate}=req.body;const created=await Reservation.create({catwayNumber:id,clientName,boatName,startDate,endDate});return res.status(201).json(created);};

/** Met à jour une réservation (URL ou body._id). */
export const update=async(req,res)=>{const idReservation=req.params.idReservation||req.body._id;if(!idReservation)return res.status(400).json({message:"Missing _id"});const updated=await Reservation.findByIdAndUpdate(idReservation,req.body,{new:true}).lean();if(!updated)return res.status(404).json({message:"Not found"});return res.json(updated);};

/** Supprime une réservation. */
export const remove=async(req,res)=>{const r=await Reservation.findByIdAndDelete(req.params.idReservation);if(!r)return res.status(404).json({message:"Not found"});return res.status(204).end();};
