import { Router } from "express"
import { insertCategories, listCategories } from "../controllers/controllersCategories.js"

const routesCategories = Router()

routesCategories.get("/categories", listCategories)
routesCategories.post("/categories", insertCategories)

export default routesCategories