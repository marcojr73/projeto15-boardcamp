import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import routesCategories from "./Routes/routesCategories.js";
import routesCustomers from "./Routes/routesCustomers.js";
import routesGames from "./Routes/routesGames.js";
import routesRentals from "./Routes/routesRentals.js";

const app = express()
app.use(cors())
app.use(express.json())
dotenv.config()

app.use(routesCategories)
app.use(routesCustomers)
app.use(routesGames)
app.use(routesRentals)


const {PORT} = process.env

app.listen(PORT, () => {
    console.log("servidor em pé na porta ", PORT)
})
