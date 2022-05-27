import { Router } from "express";
import { insertCustomers, listCustomer, listCustomers, updateCustomer } from "../controllers/controllersCustomers.js";

const routesCustomers = Router()

routesCustomers.get("/customers", listCustomers)
routesCustomers.get("/customers/:id", listCustomer)
routesCustomers.post("/customers", insertCustomers)   
routesCustomers.put("/customers:id", updateCustomer)

export default routesCustomers