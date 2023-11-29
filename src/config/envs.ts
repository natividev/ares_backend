import "dotenv/config";
import { get } from "env-var";

//Patron adaptador
export const envs = {
  PORT: get('PORT').required().asPortNumber(),
}

