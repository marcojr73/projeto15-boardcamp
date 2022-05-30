import connectDB from "../config/bank.js";
import joi from "joi"

export default async function validateDataCustomer(req, res, next){
    const { customerId, gameId } = req.body
    const daysRented = parseInt(req.body.daysRented)

    try {
    const db = await connectDB()

    const daySchema = joi.object({
        daysRented: joi.number().min(1).required()
    })

    const validCustomer = await db.query(`
        SELECT * FROM customers where id=$1; 
    `,[customerId])
    
    const validGame = await db.query(`
        SELECT * FROM games where id=$1; 
    `,[gameId])
    
    if(validCustomer.rows.length === 0 || validGame.rows.length ===0){
        return res.sendStatus(400)
    }

    const answer = await daySchema.validateAsync({daysRented})

    const stock = validGame.rows[0].stockTotal-1
    if(stock === 0){
        return res.sendStatus(400)
    } else{
        const update = await db.query(`
            UPDATE games SET "stockTotal" = $1 WHERE id=$2;
        `,[stock, gameId])
    }
    
    } catch (error) {
        if(error.isJoi){
            res.sendStatus(400)
        }
    }
    next()
}