import { envs } from "./config";
import { MongoDatabase } from "./data/mongodb";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

//funcion anonomima autoinvoca
(()=>{
  main()
})();

async function main() {
  // todo: await base de datos
  await MongoDatabase.connect({
    dbName: envs.MONGO_DB,
    mongoUrl: envs.MONGO_URL,
  })

  // todo: inicio de nuestro server

  new Server({
    port: envs.PORT,
    routes: AppRoutes.routes
  })
    .start();
}