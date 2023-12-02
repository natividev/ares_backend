import "dotenv/config";
import { get } from "env-var";

//Patron adaptador
export const envs = {
  PORT: get('PORT').required().asPortNumber(),
  MONGO_URL: get('MONGO_URL').required().asString(),
  MONGO_DB: get('MONGO_DB').required().asString(),
}

