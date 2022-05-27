import connectDB from "../config/bank.js";

export async function updateCustomer(req, res){
    




}

export async function insertCustomers(req, res){
    const db = await connectDB()
    const {name, phone, cpf, birthday} = req.body
    console.log(req.body)

    try {
        const insert = await db.query(
            `INSERT INTO customers (name, phone, cpf, birthday)
            VALUES ($1, $2, $3, $4)`, [name, phone, cpf, birthday]
            )
        
        res.sendStatus(201)
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
    
}

export async function listCustomers(req, res){
    const db = await connectDB()

    try {
        const customers = await db.query('SELECT * FROM customers')
        res.send(customers.rows)
    } catch (error) {
        console.log(error)
        res.senStatus(400)
    }

}

export async function listCustomer(req, res){
    
}