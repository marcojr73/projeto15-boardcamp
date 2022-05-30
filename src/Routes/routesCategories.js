import { Router } from "express"
import { insertCategories, listCategories } from "../controllers/controllersCategories.js"
import validateCategorie from "../middlewares/validateCategorie.js"

const routesCategories = Router()

routesCategories.get("/categories", listCategories)
routesCategories.post("/categories", validateCategorie, insertCategories)

export default routesCategories