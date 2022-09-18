import { Router } from "express"
import { deleteRental, insertRental, insertRentals, listRentals } from "../controllers/controllersRentals.js"
import validateDataCustomer from "../middlewares/validateCustomerId.js"
import validateRental from "../middlewares/validateRental.js"

const routesRentals = Router()

routesRentals.post("/rentals", validateDataCustomer, insertRentals)
routesRentals.post("/rentals/:id/return",validateRental, insertRental)
routesRentals.get("/rentals",listRentals)
routesRentals.delete("/rentals/:id",validateRental, deleteRental)


export default routesRentals