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

    const cpf = req.query.cpf
    console.log(cpf)
    try {
        const db = await connectDB()
        if(!cpf){
            const customers = await db.query('SELECT * FROM customers')
            res.send(customers.rows)
        } else {
            const customers = await db.query(`
                    SELECT * FROM customers
                    WHERE customers.cpf LIKE $1
                `, [cpf + "%"])
            res.send(customers.rows)
        }
    } catch (error) {
        console.log(error)
        res.senStatus(400)
    }

}

export async function listCustomer(req, res){
    const {id} = req.params
    try {
        const db = await connectDB()
        const user = await db.query(`
        SELECT * FROM customers
        WHERE id=$1;
        `, [id])

        if(user.rows.length === 0){
            return res.senStatus(404)
        }
        
        res.send(user.rows)
    } catch (error) {
        res.sendStatus(404)
    }
}