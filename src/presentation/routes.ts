//Rutas de toda la app de este modulo

import { Router } from "express";
import { AuthRoutes } from "./auth/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();
    //Definicion de toodas las rutas principales
    router.use('/api/auth', AuthRoutes.routes)
    return router;

  }
}