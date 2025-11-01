import {Router} from "express";
import swaggerUi from "swagger-ui-express";
import {swaggerSpec} from "../docs/swagger.js";
const r=Router();
r.use("/docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec));
export default r;
