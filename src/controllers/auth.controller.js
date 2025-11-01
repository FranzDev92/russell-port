/**
 * @module AuthController
 * @description Connexion/Déconnexion.
 */
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentification par session
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Connexion (form-urlencoded)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema: { $ref: '#/components/schemas/LoginBody' }
 *     responses:
 *       302: { description: Redirige vers /dashboard si OK }
 *
 * /logout:
 *   get:
 *     summary: Déconnexion
 *     tags: [Auth]
 *     responses:
 *       302: { description: Redirige vers / }
 */

export const login=(req,res)=>{res.redirect("/dashboard");};
export const logout=(req,res)=>{req.logout(()=>{req.session.destroy(()=>res.redirect("/"));});};
