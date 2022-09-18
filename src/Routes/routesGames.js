import { Router } from "express";
import { insertGames, listGames } from "../controllers/controllersGames.js";
import validateGame from "../middlewares/validateGame.js";

const routesGames = Router()

routesGames.post("/games",validateGame, insertGames)
routesGames.get("/games", listGames)

export default routesGames