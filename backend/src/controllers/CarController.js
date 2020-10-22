const connection = require('../database/connection');

module.exports = {
    async index (req, res){
        const cars = await connection('cars').select('*');
    
        return res.json(cars)
    },

    async create(req, res) {
        const {placa, marca, modelo, ano, cor} = req.body;

        const car = await connection('cars').where({placa}).select('*');

        if(car.length > 0){
            return res.status(409).json({error: 'Placa já está presente no banco de dados!'});
        }

        const [id] = await connection('cars').insert({
            placa, 
            marca, 
            modelo, 
            ano, 
            cor
        });

        return res.json({"id" : id});
    },

    async get(req, res) {
        const { id } = req.params;

        const car = await connection('cars').where({id}).select('*');

        return res.json(car);
    },

    async update (req, res) {
        const { id } = req.params;
        const {placa, marca, modelo, ano, cor} = req.body;

        const car = await connection('cars')
            .where({id})
            .update({
                placa, 
                marca, 
                modelo, 
                ano, 
                cor
            });

        return res.json(id);
    },

    async delete (req, res){
        const { id } = req.params;

        await connection('cars')
            .where('id', id)
            .delete()
    
        return res.status(204).send();
    },

}