import connectDB from "../config/bank.js";

export default async function validateRental(req, res, next){
    const {id} = req.params
    try {
        const db = await connectDB()
        const rental = await db.query(`
            SELECT * FROM rentals WHERE id=$1;
        `,[id])

        if(rental.rows.length === 0){
            return res.sendStatus(404)
        }
    } catch (error) {
        console.log(error);
    }
    next()
}