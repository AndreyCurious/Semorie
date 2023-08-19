import models from '../models/models.js';
import ApiError from '../error/ApiError.js';

class UserController {
    async registration(req, res, next) {

    }

    async login(req, res, next) {

    }

    async check(req, res, next) {
		const { id } = req.query;
	    if (!id) {
		    return next(ApiError.badRequest('sdifaifd'))
		}
		return res.json(id)
    }
}

export default new UserController();