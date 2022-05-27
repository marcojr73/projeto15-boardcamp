import connectDB from "../config/bank.js";

export async function insertCategories(req, res){
     const {name} = req.body
     const db = await connectDB()

     const answer = await db.query(`INSERT INTO categories (name) VALUES ('${name}')`)

     res.sendStatus(201)
}



export async function listCategories(req, res){
     const db = await connectDB()
    
     const categories = await db.query("SELECT * FROM categories")
     res.send(categories.rows)

}