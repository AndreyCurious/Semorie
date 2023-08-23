import models from '../models/models.js';
import ApiError from '../error/ApiError.js';

class DeviceController {
    async create(req, res, next) {
			
    }

    async getAll(req, res) {

    }
		
    async delete(req, res) {
		const { id } = req.body;
		await models.Device.destroy({
			where: {id},
		});
		const devices = await models.Device.findAll();
		return res.json(devices);
	}
}

export default new DeviceController();