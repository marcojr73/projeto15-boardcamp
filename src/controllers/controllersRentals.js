import connectDB from "../config/bank.js"
import dayjs from "dayjs"
import { parse } from "pg-protocol"

export async function deleteRental(req, res) {

    const {id} = req.params
    
    try {
        const db = await connectDB()
        const remove = await db.query(`
            DELETE FROM rentals WHERE id=$1;
            `, [id])

        res.sendStatus(200)
        
    } catch (error) {
        res.send(error)
        console.log(error)
    }
}

export async function insertRental(req, res) {
    const returnDate = dayjs().$d
    // const returnDate = new Date("2022-06-02")
    let delayFee = null
    const {id} = req.params

    try {
        const db = await connectDB()
        const rental = await db.query(`
            SELECT * FROM rentals WHERE id=$1;
        `,[id])
        const pricePerDay = rental.rows[0].originalPrice/rental.rows[0].daysRented
        const {rentDate} = rental.rows[0]
        

        const timeDiff = Math.abs(returnDate.getTime() - rentDate.getTime());
        const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        const delay = diffDays - rental.rows[0].daysRented


        if(delay > 0){
            delayFee = delay * pricePerDay 
            const update = db.query(`
                UPDATE rentals SET "delayFee" = $1, "returnDate" = $2  WHERE id =  $3;
            `, [delayFee, returnDate, id])
        }
        res.sendStatus(200)

    } catch (error) {
        console.log(error)
    }
}

export async function insertRentals(req, res) {
    const { customerId, gameId, daysRented } = req.body
    const rentDate = dayjs().format("DD/MM/YY")
    const db = await connectDB()

    try {
        const game = await db.query(`
            Select * FROM games WHERE id=$1;
        `, [gameId])

        const originalPrice = game.rows[0].pricePerDay * daysRented

        const update = await db.query(`
            INSERT INTO rentals ("customerId", "gameId", "daysRented", "rentDate", "originalPrice")
            VALUES($1, $2, $3, $4, $5)
        `, [customerId, gameId, daysRented, rentDate, originalPrice])

        res.send(201)

    } catch (error) {
        console.log(error)
    }
}

export async function listRentals(req, res) {

    try {
        const db = await connectDB()

        const answer = await db.query(`
            select 
            rentals.*, customers.name, games.name as "titleGame", 
            games."categoryId", categories.name as "categoryName"   
            from rentals
            join customers
            on rentals."customerId" = customers.id
            join games
            on rentals."gameId" = games.id
            join categories
            on games."categoryId" = categories.id;
        `)

        const objRentals = answer.rows.map(ans => {
            return(
                {
                    id: ans.id,
                    customerId: ans.customerId,
                    gameId: ans.gameId,
                    rentDate: ans.rentDate,
                    daysRented: ans.daysRented,
                    returnDate: ans.returnDate,
                    originalPrice: ans.originalPrice,
                    delayFee: ans.delayFee,
                    customer: {
                     id: ans.customerId,
                     name: ans.name
                    },
                    game: {
                      id: ans.gameId,
                      name: ans.titleGame,
                      categoryId: ans.categoryId,
                      categoryName: ans.categoryName
                    }
                  }
            )
        })
        res.send(objRentals)

    } catch (error) {
        res.send(error)
    }

}