import { Request, Response } from "express";
import knex from "../database/connection";

export default class ItemsController {
  async index(request: Request, response: Response) {
    const items = await knex("items").select("*");
    const serializedItems = items.map(({image, ...rest}) => ({
      ...rest,
      image_url: `http://localhost:3333/uploads/${image}`,
    }));
    return response.json(serializedItems);
  }
}
