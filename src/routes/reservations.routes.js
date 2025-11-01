import {Router} from "express";
import {ensureAuth} from "../middleware/auth.js";
import * as c from "../controllers/reservations.controller.js";

const r=Router();

// Page index (liste des catways → liens réservations)
r.get("/reservations",ensureAuth,c.index);

// CRUD principal (chemins propres)
r.get("/catways/:id/reservations",ensureAuth,c.list);
r.get("/catways/:id/reservations/:idReservation",ensureAuth,c.getOne);
r.post("/catways/:id/reservations",ensureAuth,c.create);
r.put("/catways/:id/reservations/:idReservation",ensureAuth,c.update);
r.delete("/catways/:id/reservations/:idReservation",ensureAuth,c.remove);

// ✅ Alias demandés par le brief (singulier + PUT sans idReservation)
r.put("/catways/:id/reservations",ensureAuth,(req,res)=>c.update(req,res)); // idReservation attendu dans req.body._id
r.get("/catway/:id/reservations/:idReservation",ensureAuth,c.getOne);      // alias singulier
r.delete("/catway/:id/reservations/:idReservation",ensureAuth,c.remove);    // alias singulier

export default r;
