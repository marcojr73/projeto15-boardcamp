import { Router } from "express";
import { insertGames, listGames } from "../controllers/controllersGames.js";
import validateGame from "../middlewares/validateGame.js";

const routesGames = Router()

routesGames.get("/games", listGames)
routesGames.post("/games",validateGame, insertGames)

export default routesGames