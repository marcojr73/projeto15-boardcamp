import { Router } from "express";
import { insertGames, listGames } from "../controllers/controllersGames.js";

const routesGames = Router()

routesGames.get("/games", listGames)
routesGames.post("/games", insertGames)

export default routesGames