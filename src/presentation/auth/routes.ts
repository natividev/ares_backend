//Rutas de toda la app de este modulo

import { Router } from "express";
import { AuthController } from "./controller";
import { AuthDatasourceImpl, AuthRepositoryImpl } from "../../infranstructure";

export class AuthRoutes {
  static get routes(): Router {

    const router = Router();
    const datasource = new AuthDatasourceImpl();
    const authRepositoy = new AuthRepositoryImpl(datasource);
    const controller = new AuthController(authRepositoy);

    //Definicion de todas las rutas principales
    router.post('/login', controller.logiUser)

    router.post('/register', controller.registerUser)

    return router;

  }
}