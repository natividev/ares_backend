//Rutas de toda la app de este modulo

import { Router } from "express";
import { AuthController } from "./controller";

export class AuthRoutes {
  static get routes(): Router {

    const router = Router();
    const controller = new AuthController();

    //Definicion de todas las rutas principales
    router.post('/login', controller.logiUser)

    router.post('/register', controller.registerUser)

    return router;

  }
}