import { v4 } from 'uuid';
import path from 'path';
import models from '../models/models.js';
import ApiError from '../error/ApiError.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

class DeviceController {
    async create(req, res, next) {
        try {
            let {name, price, brandId, typeId, info} = req.body
            const {img} = req.files;
            let fileName = v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const device = await models.Device.create({name, price, brandId, typeId, img: fileName});

            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
					models.DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                )
            }

            return res.json(device)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res) {
        let {brandId, typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let devices;
        if (!brandId && !typeId) {
            devices = await models.Device.findAndCountAll({limit, offset})
        }
        if (brandId && !typeId) {
            devices = await models.Device.findAndCountAll({where:{brandId}, limit, offset})
        }
        if (!brandId && typeId) {
            devices = await models.Device.findAndCountAll({where:{typeId}, limit, offset})
        }
        if (brandId && typeId) {
            devices = await models.Device.findAndCountAll({where:{typeId, brandId}, limit, offset})
        }
        return res.json(devices)
    }

    async getOne(req, res) {
        const {id} = req.params;
        const device = await models.Device.findOne(
            {
                where: {id},
                include: [{model: models.DeviceInfo, as: 'info'}]
            },
        )
        return res.json(device)
    }
    async delete(req, res) {
		const { id } = req.headers;
		await models.Device.destroy({
			where: {id},
		});
		const devices = await models.Device.findAll();
		return res.json(devices);
	}

    async updateRating(req, res) {
        const {id, rating} = req.body;
        const device = await models.Device.findOne({where: {id}});
        await models.Device.update(
            {rating: (Number(rating) + device.rating) / countRating},
            {
                where: {id}
            }
        )
        return res.json(device);
    }
}

export default new DeviceController();