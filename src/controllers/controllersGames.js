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
    const {name} = req.query
    try {
        const db = await connectDB()
        if(!name){
            const games = await db.query(`
            SELECT games.*, categories.name AS "categoryName"
            from games
            JOIN categories ON games."categoryId" = categories.id;
            `)
            res.send(games.rows)
        } else {
            const games = await db.query(`
            SELECT games.*, categories.name AS "categoryName"
            from games
            JOIN categories ON games."categoryId" = categories.id
            WHERE games.name like $1;
            `,[name + "%"])
            res.send(games.rows)
        }    
        
    } catch (error) {
        console.log(error)
        res.send(error)
    }
    
}