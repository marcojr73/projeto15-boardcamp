import connectDB from "../config/bank.js"

export async function insertGames(req, res){
    const {name, image, stockTotal, categoryId, pricePerDay} = req.body
    const db = await connectDB()

    try {
        const game = await db.query(`
            INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") 
            VALUES ($1, $2, $3, $4, $5)`,
            [name, image, stockTotal, categoryId, pricePerDay])
    
        res.sendStatus(200)    
    } catch (e) {
        res.sendStatus(400)
    }
}

export async function listGames(req, res){

    const db = await connectDB()

    const games = await db.query('SELECT * FROM games')

    res.send(games.rows)

}