import { Router } from "express";
import { insertCustomers, listCustomer, listCustomers, updateCustomer } from "../controllers/controllersCustomers.js";
import validateDataCustomer from "../middlewares/validateDataCustomer.js";

const routesCustomers = Router()

routesCustomers.get("/customers", listCustomers)
routesCustomers.get("/customers/:id", listCustomer)
routesCustomers.post("/customers", validateDataCustomer, insertCustomers)   
routesCustomers.put("/customers/:id", validateDataCustomer, updateCustomer)

export default routesCustomers