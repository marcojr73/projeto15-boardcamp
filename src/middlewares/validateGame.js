import connectDB from "../config/bank.js"
import joi from "joi"


export default async function validateGame(req, res, next){
    const {name, categoryId} = req.body
    const stockTotal = parseInt(req.body.stockTotal)
    const pricePerDay = parseInt(req.body.pricePerDay)

    const dataSchema = joi.object({
        name: joi.string().min(1).required(),
        stockTotal: joi.number().min(1), 
        pricePerDay: joi.number().min(1)
    })
    try {
        const validateString = await dataSchema.validateAsync({name, stockTotal, pricePerDay})
        
        const db = await connectDB()
        
        const availableCategorie = await db.query(`
        SELECT * FROM categories WHERE "id"=$1;
        `,[categoryId])
        
        if(availableCategorie.rows.length === 0){
            console.log("essa categori nn existe")
            return res.sendStatus(400)
        }

        const availableName = await db.query(`
            SELECT * FROM games WHERE name = $1;
        `,[name])
        
        if(availableName.rows.length > 0){
            return res.sendStatus(409)
        }

    } catch (error) {
        if(error.isJoi){
            console.log("joi")
            return res.sendStatus(400)
        }
        console.log(error)
    }
    next()
}