const db = require('../db');

class CarController {
    async createCar(req, res) {
        const { name, description, price, type } = req.body;
        const newCar = await db.query('INSERT INTO car (name, description, price, type) values ($1, $2, $3, $4) RETURNING *', [name, description, price, type]);
        res.json(newCar.rows[0]);
    }

    async getCars(req, res) {
        const cars = await db.query('SELECT * FROM car');
        res.json(cars.rows);
    }

    async getOneCar(req, res) {
        const id = req.params.id;
        const car = await db.query('SELECT * FROM car where id = $1', [id]);
        res.json(car.rows[0]);
    }

   

    async updateCar(req, res){
        const {id, name, description, price, type} = req.body
        
        const car = await db.query( 
        'UPDATE car SET name = $2, description = $3, price = $4, type = $5 WHERE id = $1',
        [id, name, description, price, type]);

        const AllCars = await db.query('SELECT * FROM car');

        return res.json(AllCars.rows)
        
    }

    async deleteCar(req, res) {
        const id = req.params.id;
        const car = await db.query('DELETE FROM car where id = $1', [id]);
        res.json(car.rows[0]);
    }
}

module.exports = new CarController();
