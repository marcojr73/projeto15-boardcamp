import connectDB from "../config/bank.js"
import joi from "joi"


export default async function validateCategorie(req, res, next){
    const {name} = req.body
    const nameSchema = joi.object({
        name: joi.string().min(1).required()
    })

    try {
        const validateString = await nameSchema.validateAsync(req.body)

        const db = await connectDB()
        
        const unavailable = await db.query(`
            SELECT * FROM categories WHERE name=$1;
        `,[name])

        if(unavailable){
            res.sendStatus(409)
        }
    } catch (error) {
        if(error.isJoi){
            return res.sendStatus(400)
        }
    }
    next()
}