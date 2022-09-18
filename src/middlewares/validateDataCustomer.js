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
        await dataSchema.validateAsync(req.body)
    } catch (error) {
        if(error.isJoi){
            console.log(error)
            return res.sendStatus(400)
        }
    }
    next()
}