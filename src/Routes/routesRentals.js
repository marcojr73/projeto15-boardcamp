import { Router } from "express"
import { deleteRental, insertRental, insertRentals, listRentals } from "../controllers/controllersRentals.js"

const routesRentals = Router()

routesRentals.get("/rentals",listRentals )
routesRentals.post("/rentals", insertRentals)
routesRentals.post("/rentals/:id/return", insertRental)
routesRentals.delete("/rentals/:id", deleteRental)


export default routesRentals