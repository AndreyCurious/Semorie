import modeles from '../models/models.js'

class BrandController {
    async create(req, res) {
        const {name} = req.body
        const brand = await modeles.Brand.create({name})
        return res.json(brand)
    }

    async getAll(req, res) {
        const brands = await modeles.Brand.findAll();
        return res.json(brands)
    }

	async delete(req, res) {
		const { id } = req.body;
		await modeles.Brand.destroy({
			where: {id},
		});
		const brands = await modeles.Brand.findAll();
		return res.json(brands);
	}
}

export default new BrandController();