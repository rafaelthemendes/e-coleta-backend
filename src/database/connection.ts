import knex from "knex";
import * as Config from "../Config";

const connection = knex(Config.Knex.config);

export default connection;
