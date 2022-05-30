import connectDB from "../config/bank.js";
import joi from "joi"

export default async function validateDataCustomer(req, res, next){

    const {name, phone, cpf, birthday} = req.body

    const dataSchema = joi.object({
        name: joi.string().min(1).required(),
        phone: joi.string().pattern(/[0-9]{10,11}/).max(11).required(),
        cpf: joi.string().pattern(/[0-9]{11}/).max(11).required(),
        birthday: joi.date().required()
    })

    try {
        const validate = await dataSchema.validateAsync(req.body)

        const db = await connectDB()
        
        const available = await db.query(`
            SELECT * FROM customers WHERE cpf=$1;
        `,[cpf])

        if(available.rows.length > 0){
            res.sendStatus(409)
        }

    } catch (error) {
        if(error.isJoi){
            return res.sendStatus(400)
        }
    }
    next()
}