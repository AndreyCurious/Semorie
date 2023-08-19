import ApiError from '../error/ApiError.js';
import models from '../models/models.js';


class typeController {
    async create(req, res, next) {
			const { name } = req.body;
			const type = await models.Type.create({ name });
			return res.json(type);
    }

    async getAll(req, res, next) {
			const types = await models.Type.findAll();
			return res.json(types);
    }

		async delete(req, res) {
			const { id } = req.body;
			await models.Type.destroy({
				where: {id},
			});
			const brands = await models.Type.findAll();
			return res.json(brands);
		}
}

export default new typeController();