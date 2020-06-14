import { Router } from "express";
import knex from './database/connection';

const routes = Router();

routes.get("/items", async (request, response) => {
  const items = await knex('items').select('*');
  const serializedItems = items.map(({title, image}) => ({
    title,
    image: `http://localhost:3333/uploads/${image}`
  }))
  return response.json(serializedItems);
});

export default routes;
